// Renders cv/cv.html to public/MarcelaRezkova_CV_EN.pdf (A4). Run: npm run cv:pdf
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve(here, 'cv.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: resolve(here, '..', 'public', 'MarcelaRezkova_CV_EN.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
