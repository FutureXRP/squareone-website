// Screenshots every page at 390px and 1280px into screenshots/.
// Usage: start the app (npm run build && npm run start), then `npm run screenshots`.
// PLAYWRIGHT_PATH lets a globally installed playwright be used without adding it to the project.
const { chromium } = await import(process.env.PLAYWRIGHT_PATH || 'playwright')
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const PAGES = ['/', '/about', '/early-learning', '/medical', '/interactive', '/events', '/give', '/give/thank-you', '/contact', '/privacy', '/terms']
const WIDTHS = [390, 1280]

mkdirSync('screenshots', { recursive: true })
const browser = await chromium.launch()
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  for (const path of PAGES) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })
    const name = (path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')) + `-${width}.png`
    await page.screenshot({ path: `screenshots/${name}`, fullPage: true })
    console.log('saved', name)
  }
  await page.close()
}
await browser.close()
