'use client'
// Candid (GuideStar) Seal of Transparency. Renders Candid's official seal
// widget for our organization id, which shows the current level and year
// and updates itself when Candid renews it, linked to our Candid profile.
// If the widget image cannot load, a plain text link takes its place so
// the page never shows a broken image.
import { useState } from 'react'
import { ORG } from '@/lib/site'

const WIDGET = `https://widgets.guidestar.org/prod/v1/pdp/transparency-seal?organizationId=${ORG.candidOrgId}`
const WIDGET_LEGACY = `https://widgets.guidestar.org/gximage2?o=${ORG.candidOrgId}&l=v4`
const SIZES = { sm: 'w-24', md: 'w-36', lg: 'w-44' } as const

export function CandidSeal({ size = 'md', className = '' }: { size?: keyof typeof SIZES; className?: string }) {
  const [src, setSrc] = useState(WIDGET)
  const [failed, setFailed] = useState(false)
  const px = size === 'sm' ? 96 : size === 'md' ? 144 : 176

  return (
    <a
      href={ORG.candidUrl}
      rel="noopener"
      target="_blank"
      className={`inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      aria-label="SquareOne Compassion's Gold Seal of Transparency profile on Candid (opens in a new tab)"
    >
      {failed ? (
        <span className="link text-base">Gold Seal of Transparency on Candid</span>
      ) : (
        // Candid serves the seal from its own widget URL, so next/image cannot optimize it.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Candid Gold Seal of Transparency"
          width={px}
          height={px}
          loading="lazy"
          decoding="async"
          className={`${SIZES[size]} h-auto`}
          onError={() => {
            if (src === WIDGET) setSrc(WIDGET_LEGACY)
            else setFailed(true)
          }}
        />
      )}
    </a>
  )
}
