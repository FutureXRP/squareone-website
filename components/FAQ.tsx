export interface FaqItem {
  q: string
  a: string
}

/** Accessible accordion built on native details/summary. No JS, no motion beyond open/close. */
export function FAQ({ items, title = 'Questions' }: { items: FaqItem[]; title?: string }) {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-6 max-w-prose divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span aria-hidden="true" className="mt-1 shrink-0 text-accent-ink group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
