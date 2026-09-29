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

const ZH_SEO_STATIC = `<!--seo-static-start-->
      <div data-seo-static lang="zh-Hant">
        <h1>HKAAA｜香港網頁設計與 AI 自動化機構</h1>
        <p>
          HKAAA 是香港的網頁設計與 AI 自動化機構。我們建立客戶信得過的網站、幫你被找到，並在你準備好時加入自動化。團隊在香港。
        </p>
        <p>
          服務包括：網頁設計、SEO、內容、聊天機械人、工作流程自動化與潛在客戶開發。
        </p>
        <p>預約通話，或電郵 info@hkaiautomation.com。</p>
      </div>
      <!--seo-static-end-->`;

function replaceOnce(html, from, to, label) {
  if (!html.includes(from)) {
    console.warn(`write-zh-html: missing ${label}`);
    return html;
  }
  return html.replace(from, to);
}

function replaceSeoStatic(html, nextBlock) {
  const re = /<!--seo-static-start-->[\s\S]*?<!--seo-static-end-->/;
  if (!re.test(html)) {
    console.warn('write-zh-html: missing seo-static block');
    return html;
  }
  return html.replace(re, nextBlock);
}

function patchZhWebsiteJsonLd(html) {
  let next = html.replace(
    '"@id": "https://hkaiautomation.com/#website"',
    '"@id": "https://hkaiautomation.com/zh#website"',
  );
  next = next.replace(
    '"url": "https://hkaiautomation.com/",\n          "name": "HKAAA | Hong Kong Web Design & AI Automation",\n          "inLanguage": "en"',
    `"url": "https://hkaiautomation.com/zh",\n          "name": "${ZH_TITLE}",\n          "description": "${ZH_DESC}",\n          "inLanguage": "zh-Hant"`,
  );
  next = next.replace(
    '"url": "https://hkaiautomation.com/",\n          "name": "HKAAA | Hong Kong Web Design &amp; AI Automation",\n          "inLanguage": "en"',
    `"url": "https://hkaiautomation.com/zh",\n          "name": "${ZH_TITLE}",\n          "description": "${ZH_DESC}",\n          "inLanguage": "zh-Hant"`,
  );
  return next;
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

html = replaceSeoStatic(html, ZH_SEO_STATIC);
html = patchZhWebsiteJsonLd(html);

await mkdir(dirname(dest), { recursive: true });
await writeFile(dest, html);
console.log('wrote', dest);
