import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageIntro, Section } from '@/components/Section'
import { galleryPhotos } from '@/lib/photos'
import { ELC_GALLERY } from '@/content/elc'

export const metadata: Metadata = { title: 'Life at SquareOne Early Learning Center', description: ELC_GALLERY.body }

export default async function ElcGalleryPage() {
  const photos = await galleryPhotos('elc/gallery')
  return (
    <>
      <PageIntro title={ELC_GALLERY.title}>
        <p className="text-ink">{ELC_GALLERY.body}</p>
        <p className="mt-4">
          <Link href="/early-learning" className="link">
            Back to the Early Learning Center
          </Link>
        </p>
      </PageIntro>

      <Section>
        {photos.length ? (
          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
            {photos.map((p) => (
              <li key={p.src}>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="prose-block text-muted">Photos are on their way.</p>
        )}
      </Section>
    </>
  )
}
