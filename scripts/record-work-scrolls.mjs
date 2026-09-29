/**
 * Record homepage scroll previews for Work cards.
 * Usage: node scripts/record-work-scrolls.mjs [speedy|choco|cpa|mayer]
 *
 * Flow: load fully → hold top of site → slow scroll.
 * Post: trim lead-in so output starts on a rich loaded frame, then hold, then scroll.
 */
import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'work');
const tmpDir = path.join(outDir, '_scroll-tmp');

const SITES = [
  { id: 'speedy', url: 'https://speedy-move.com/', waitMs: 6000 },
  { id: 'choco', url: 'https://www.chocoave.com/', waitMs: 5000 },
  { id: 'mayer', url: 'https://mayerautogate.com/', waitMs: 10000, waitSelector: 'h1' },
  { id: 'cpa', url: 'https://meridian-cpa.bolt.host/', waitMs: 6000 },
];

const VIEWPORT = { width: 1280, height: 720 };
/** Seconds to sit on the fully-loaded top of the page before scrolling. */
const HOLD_MS = 2500;
/** Native scroll duration (already slow — avoid heavy setpts stretch). */
const SCROLL_MS = 22000;
/** Keep this much hold in the final cut before motion starts. */
const KEEP_HOLD_SEC = 0.5;

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function hideChrome(page) {
  await page.evaluate(() => {
    const kill = (sel) =>
      document.querySelectorAll(sel).forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });
    kill(
      '[class*="whatsapp" i],[id*="whatsapp" i],.joinchat,.ht-ctc,[href*="wa.me"],[href*="api.whatsapp"],[class*="cookie" i],[id*="cookie" i],[class*="consent" i]',
    );
    [...document.querySelectorAll('*')].forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed' && s.position !== 'sticky') return;
      const r = el.getBoundingClientRect();
      if (r.width < 120 && r.right > window.innerWidth - 140 && r.bottom > window.innerHeight - 140) {
        el.style.setProperty('display', 'none', 'important');
      }
      const t = (el.textContent || '').trim();
      if (/Made in Bolt|bolt\.new/i.test(t) && el.children.length < 6) {
        el.style.setProperty('display', 'none', 'important');
      }
    });
  });
}

/** Wait until hero looks painted (img or large CSS background). */
async function waitForVisualReady(page) {
  await page
    .waitForFunction(
      () => {
        const body = document.body;
        if (!body) return false;
        const text = (body.innerText || '').trim();
        if (text.length < 40) return false;
        if (document.documentElement.scrollHeight < 900) return false;

        const bigImg = [...document.images].some(
          (img) => img.complete && img.naturalWidth > 400 && img.getBoundingClientRect().height > 120,
        );
        if (bigImg) return true;

        // CSS background heroes (Speedy / CPA)
        for (const el of document.querySelectorAll('section, div, header, main, [class*="hero" i]')) {
          const bg = getComputedStyle(el).backgroundImage;
          if (!bg || bg === 'none') continue;
          const r = el.getBoundingClientRect();
          if (r.width > 400 && r.height > 280) return true;
        }
        return false;
      },
      { timeout: 60000 },
    )
    .catch(() => {});

  // Extra settle for lazy/bg images finishing decode
  await page.waitForTimeout(2000);

  // Screenshot size heuristic: blank/white heroes compress tiny
  for (let i = 0; i < 8; i++) {
    const buf = await page.screenshot({ type: 'jpeg', quality: 50 });
    if (buf.length > 45000) break;
    await page.waitForTimeout(800);
  }
}

async function smoothScroll(page) {
  await page.evaluate(async (duration) => {
    const start = performance.now();
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (maxY < 40) return;
    await new Promise((resolve) => {
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        window.scrollTo(0, maxY * eased);
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
  }, SCROLL_MS);
}

async function recordOne(browser, site) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    recordVideo: { dir: tmpDir, size: VIEWPORT },
  });
  // Video clock ≈ wall clock from context creation
  const t0 = Date.now();
  const page = await context.newPage();
  console.log(`Recording ${site.id}…`);
  await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(site.waitMs ?? 5000);
  if (site.waitSelector) {
    await page.waitForSelector(site.waitSelector, { timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(1500);
  }
  await hideChrome(page);
  await waitForVisualReady(page);
  await page.evaluate(() => window.scrollTo(0, 0));

  // Intentionally hold so the viewer sees the full top of the site
  const holdStartSec = (Date.now() - t0) / 1000;
  await page.waitForTimeout(HOLD_MS);
  const scrollStartSec = (Date.now() - t0) / 1000;

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`  scrollHeight=${height}`);
  console.log(`  holdStart=${holdStartSec.toFixed(2)}s scrollStart=${scrollStartSec.toFixed(2)}s`);
  await smoothScroll(page);
  await page.waitForTimeout(800);

  const videoPath = await page.video().path();
  await context.close();

  const webmOut = path.join(outDir, `${site.id}-scroll.webm`);
  const rawMp4 = path.join(outDir, `${site.id}-scroll-raw.mp4`);
  const mp4Out = path.join(outDir, `${site.id}-scroll.mp4`);
  await fs.rename(videoPath, webmOut);

  await run('ffmpeg', [
    '-y',
    '-i',
    webmOut,
    '-an',
    '-vf',
    'scale=960:-2',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '26',
    '-preset',
    'fast',
    '-movflags',
    '+faststart',
    rawMp4,
  ]);
  await fs.unlink(webmOut).catch(() => {});

  // Cut from ~KEEP_HOLD_SEC before scroll starts (timed), not motion heuristics
  let cutStart = Math.max(0, scrollStartSec - KEEP_HOLD_SEC);
  const probe = spawnSync(
    'ffprobe',
    ['-v', 'quiet', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', rawMp4],
    { shell: true, encoding: 'utf8' },
  );
  const duration = Number.parseFloat(String(probe.stdout).trim()) || 0;
  const minTail = SCROLL_MS / 1000 + KEEP_HOLD_SEC + 0.5;
  if (duration > 0 && duration - cutStart < minTail) {
    cutStart = Math.max(0, duration - minTail);
  }
  console.log(`  cutStart=${cutStart.toFixed(2)}s (hold ~${KEEP_HOLD_SEC}s then scroll)`);

  // Mild 1.15x slowdown only — most of the pace comes from SCROLL_MS
  await run('ffmpeg', [
    '-y',
    '-i',
    rawMp4,
    '-an',
    '-vf',
    `trim=start=${cutStart.toFixed(2)},setpts=1.15*(PTS-STARTPTS)`,
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '26',
    '-preset',
    'fast',
    '-movflags',
    '+faststart',
    mp4Out,
  ]);
  await fs.unlink(rawMp4).catch(() => {});
  console.log(`Wrote ${mp4Out}`);
}

async function main() {
  await fs.mkdir(tmpDir, { recursive: true });
  const only = process.argv[2];
  const list = only ? SITES.filter((s) => s.id === only) : SITES;
  if (list.length === 0) throw new Error(`Unknown site id: ${only}`);
  const browser = await chromium.launch({ headless: true });
  try {
    for (const site of list) {
      await recordOne(browser, site);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
