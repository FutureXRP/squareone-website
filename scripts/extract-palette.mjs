// Prints the 5 dominant non-white, non-black colors per logo.
// Usage: node scripts/extract-palette.mjs public/logos/*.png
// Copy the results into tailwind.config.ts (brand.sq1, brand.elc, brand.med)
// and app/globals.css. Do not use it for brand.int; that one is fixed to the
// Interactive app's navy #182740.
import sharp from 'sharp'

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('usage: node scripts/extract-palette.mjs public/logos/*.png')
  process.exit(1)
}

const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')

for (const file of files) {
  const { data, info } = await sharp(file).ensureAlpha().resize(160, 160, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true })
  const bins = new Map() // quantized key -> { count, r, g, b }
  const step = 24 // simple uniform quantizer
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
    if (a < 128) continue
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max === 0 ? 0 : (max - min) / max
    if (max > 235 && sat < 0.08) continue // near white
    if (max < 40) continue // near black
    const key = [r, g, b].map((v) => Math.round(v / step)).join(',')
    const bin = bins.get(key) || { count: 0, r: 0, g: 0, b: 0 }
    bin.count++
    bin.r += r
    bin.g += g
    bin.b += b
    bins.set(key, bin)
  }
  const top = [...bins.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((bin) => `${hex(Math.round(bin.r / bin.count), Math.round(bin.g / bin.count), Math.round(bin.b / bin.count))} (${bin.count})`)
  console.log(`${file}\n  ${top.join('\n  ')}`)
}
