import Link from 'next/link'

export function DivisionCard({ title, body, linkLabel, href }: { title: string; body: string; linkLabel: string; href: string }) {
  return (
    <div className="flex flex-col border-t-4 border-accent pt-5">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-3 text-muted">{body}</p>
      <p className="mt-4">
        <Link href={href} className="link">
          {linkLabel}
        </Link>
      </p>
    </div>
  )
}
