/**
 * Fallback: full-page screenshot → vertical pan video (for Cloudflare-blocked sites).
 * Matches live-scroll clips: short top hold, then slow pan.
 * Usage: node scripts/record-work-scroll-pan.mjs mayer https://mayerautogate.com/
 */
import { chromium } from 'playwright';
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'work');

const id = process.argv[2] || 'mayer';
const url = process.argv[3] || 'https://mayerautogate.com/';

const FPS = 30;
const HOLD_SEC = 0.5;
const SCROLL_SEC = 26;
const TOTAL_SEC = HOLD_SEC + SCROLL_SEC;
const HOLD_FRAMES = Math.round(HOLD_SEC * FPS);
const SCROLL_FRAMES = Math.round(SCROLL_SEC * FPS);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${code}`))));
  });
}

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-blink-features=AutomationControlled'],
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
});
await page.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});
await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 }).catch(() =>
  page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 }),
);
await page.waitForTimeout(12000);
await page.waitForSelector('text=自動閘門', { timeout: 60000 }).catch(() => {});
await page.waitForTimeout(2000);
await page.evaluate(() => {
  document.querySelectorAll('a[href*="wa.me"],[class*="whatsapp" i]').forEach((el) => {
    (el.closest('div') || el).style.setProperty('display', 'none', 'important');
  });
});
const png = path.join(outDir, `${id}-full.png`);
await page.screenshot({ path: png, fullPage: true });
await browser.close();

const mp4 = path.join(outDir, `${id}-scroll.mp4`);
// Hold at top HOLD_FRAMES, then pan remaining height over SCROLL_FRAMES
const cropY = `if(lt(n\\,${HOLD_FRAMES})\\,0\\,min((n-${HOLD_FRAMES})*(ih-540)/${SCROLL_FRAMES}\\,ih-540))`;
await run('ffmpeg', [
  '-y',
  '-loop',
  '1',
  '-i',
  png,
  '-vf',
  `scale=960:-1,crop=960:540:0:'${cropY}'`,
  '-t',
  String(TOTAL_SEC),
  '-r',
  String(FPS),
  '-an',
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
  mp4,
]);
await unlink(png).catch(() => {});
console.log(`Wrote ${mp4} (hold ${HOLD_SEC}s + scroll ${SCROLL_SEC}s)`);
