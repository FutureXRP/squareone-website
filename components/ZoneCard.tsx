import Image from 'next/image'

export function ZoneCard({
  name,
  photo,
  photoAlt,
  body,
  pricing,
  livePrice,
  comingSoon,
  reserveHref,
  reserveLabel,
  flip = false,
}: {
  name: string
  photo: string | null
  photoAlt: string
  body: string[]
  pricing: string[]
  livePrice?: string
  comingSoon?: boolean
  reserveHref: string
  reserveLabel: string
  flip?: boolean
}) {
  return (
    <article className="grid gap-8 md:grid-cols-2 md:gap-12">
      <div className={`${flip ? 'md:order-2' : ''}`}>
        {photo ? (
          <Image src={photo} alt={photoAlt} width={1600} height={1000} sizes="(min-width: 768px) 540px, 100vw" className="aspect-[3/2] w-full object-cover" />
        ) : (
          <div className="aspect-[3/2] w-full bg-accent-soft" aria-hidden="true" /> // CONFIRM: photo missing
        )}
      </div>
      <div className={`${flip ? 'md:order-1' : ''}`}>
        <h3 className="text-xl">
          {name}
          {comingSoon ? <span className="ml-3 align-middle text-base font-medium text-accent-ink">Coming soon</span> : null}
        </h3>
        <div className="mt-4 space-y-3 text-muted">
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <ul className="mt-5 space-y-1 font-semibold text-ink">
          {livePrice ? <li>{livePrice}</li> : null}
          {pricing.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {comingSoon ? null : (
          <p className="mt-6">
            <a href={reserveHref} className="btn-secondary">
              {reserveLabel}
            </a>
          </p>
        )}
      </div>
    </article>
  )
}
