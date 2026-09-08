import 'server-only'
import { existsSync } from 'node:fs'
import path from 'node:path'

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
