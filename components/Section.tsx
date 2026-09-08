export function Section({
  children,
  tint = false,
  id,
  className = '',
}: {
  children: React.ReactNode
  tint?: boolean
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`section ${tint ? 'bg-tint' : ''} ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}

export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="container pt-section-sm md:pt-section">
      <h1 className="max-w-3xl text-3xl md:text-4xl">{title}</h1>
      {children ? <div className="prose-block mt-5 text-lg text-muted">{children}</div> : null}
    </div>
  )
}
