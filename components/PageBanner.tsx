import Image from 'next/image'

/** Full-bleed photo band at the top of a division page, below the header. No text overlay; the page headline follows it. */
export function PageBanner({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[3/2] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </div>
  )
}
