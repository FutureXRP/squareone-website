import 'server-only'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Photos are optional until Matt supplies them. Pages call photo('name') at
// build time; it returns the public path if public/photos/<name>.{webp,jpg,jpeg,png}
// exists and null otherwise, so a missing file never renders a broken image.
// Drop a file in with the expected name and redeploy. Expected names are
// listed in CONFIRM.md.
const EXT = ['webp', 'jpg', 'jpeg', 'png']

export function photo(name: string): string | null {
  for (const ext of EXT) {
    if (existsSync(path.join(process.cwd(), 'public', 'photos', `${name}.${ext}`))) return `/photos/${name}.${ext}`
  }
  return null
}

export interface GalleryPhoto {
  src: string
  width: number
  height: number
  alt: string
}

/**
 * Every image in public/photos/<dir>, sorted by filename, with its pixel size
 * for next/image. The alt text comes from the filename, so name each file for
 * what it shows: `painting-at-the-art-table.webp` reads as
 * "Painting at the art table". A leading number is dropped, so `03-...` sorts
 * without showing up in the alt.
 */
export async function galleryPhotos(dir: string): Promise<GalleryPhoto[]> {
  const abs = path.join(process.cwd(), 'public', 'photos', dir)
  if (!existsSync(abs)) return []
  const files = readdirSync(abs)
    .filter((f) => EXT.includes(f.split('.').pop()?.toLowerCase() ?? ''))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  const out: GalleryPhoto[] = []
  for (const f of files) {
    const meta = await sharp(path.join(abs, f)).metadata()
    if (!meta.width || !meta.height) continue
    const stem = f.replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '')
    const words = stem.replace(/[-_]+/g, ' ').trim()
    out.push({ src: `/photos/${dir}/${f}`, width: meta.width, height: meta.height, alt: words ? words[0].toUpperCase() + words.slice(1) : 'SquareOne Early Learning Center' })
  }
  return out
}
