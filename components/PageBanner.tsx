import Image from 'next/image'

/**
 * Full-bleed photo band at the top of a division page, below the header. No text overlay; the page headline follows it.
 * `full` keeps the image's own frame (from `width`/`height`) at every viewport width, for artwork with baked-in text
 * that must not be cropped. Otherwise the band is taller on phones and wider on desktop and the photo is cropped to fit.
 */
export function PageBanner({
  src,
  alt,
  priority = false,
  full = false,
  width = 1600,
  height = 900,
}: {
  src: string
  alt: string
  priority?: boolean
  full?: boolean
  width?: number
  height?: number
}) {
  if (full) {
    return (
      <div className="w-full">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="100vw" className="h-auto w-full" />
      </div>
    )
  }
  return (
    <div className="relative w-full aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]">
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </div>
  )
}
