import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'dist', 'index.html');
const dest = join(root, 'dist', 'zh', 'index.html');

const ZH_TITLE = 'HKAAA｜香港網頁設計與 AI 自動化機構';
const ZH_DESC =
  '香港網頁設計與 AI 自動化。建立專業可信的網站、提升自然流量，並在你準備好時加入 AI。由香港團隊執行。';
const ZH_ALT = 'HKAAA 繁體主視覺：打造更好的網站、搜尋排名與工作流程';

function replaceOnce(html, from, to, label) {
  if (!html.includes(from)) {
    console.warn(`write-zh-html: missing ${label}`);
    return html;
  }
  return html.replace(from, to);
}

let html = await readFile(src, 'utf8');

html = replaceOnce(html, '<html lang="en">', '<html lang="zh-Hant">', 'html lang');
html = replaceOnce(
  html,
  '<meta property="og:url" content="https://hkaiautomation.com/">',
  '<meta property="og:url" content="https://hkaiautomation.com/zh">',
  'og:url',
);
html = replaceOnce(
  html,
  'https://hkaiautomation.com/og.jpg',
  'https://hkaiautomation.com/og-zh.jpg',
  'og.jpg (first)',
);
html = html.replaceAll(
  'https://hkaiautomation.com/og.jpg',
  'https://hkaiautomation.com/og-zh.jpg',
);
html = replaceOnce(
  html,
  'content="HKAAA hero: Elevate with better websites, SEO, and automation"',
  `content="${ZH_ALT}"`,
  'og:image:alt (first)',
);
html = html.replaceAll(
  'content="HKAAA hero: Elevate with better websites, SEO, and automation"',
  `content="${ZH_ALT}"`,
);

const enDesc =
  'Hong Kong web design and AI automation for a trustworthy first impression. SEO and AI when you are ready. Delivered by our Hong Kong team.';
html = html.replaceAll(`content="${enDesc}"`, `content="${ZH_DESC}"`);

const enTitle = 'HKAAA | Hong Kong Web Design & AI Automation';
const enTitleAmp = 'HKAAA | Hong Kong Web Design &amp; AI Automation';
html = html.replaceAll(`content="${enTitle}"`, `content="${ZH_TITLE}"`);
html = html.replaceAll(`content="${enTitleAmp}"`, `content="${ZH_TITLE}"`);
html = html.replaceAll(`<title>${enTitle}</title>`, `<title>${ZH_TITLE}</title>`);
html = html.replaceAll(`<title>${enTitleAmp}</title>`, `<title>${ZH_TITLE}</title>`);

html = replaceOnce(
  html,
  '<link rel="canonical" href="https://hkaiautomation.com/" />',
  '<link rel="canonical" href="https://hkaiautomation.com/zh" />',
  'canonical',
);

await mkdir(dirname(dest), { recursive: true });
await writeFile(dest, html);
console.log('wrote', dest);
