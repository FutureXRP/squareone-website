import Image from 'next/image'

/**
 * Full-bleed photo band at the top of a division page, below the header. No text overlay; the page headline follows it.
 * `full` keeps the image's 16:9 frame at every width (for artwork with baked-in text that must not be cropped);
 * otherwise the band is taller on phones and wider on desktop and the photo is cropped to fit.
 */
export function PageBanner({ src, alt, priority = false, full = false }: { src: string; alt: string; priority?: boolean; full?: boolean }) {
  const aspect = full ? 'aspect-video' : 'aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]'
  return (
    <div className={`relative w-full ${aspect}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </div>
  )
}
