import Link from 'next/link'

/**
 * One-sentence disclosure of how store revenue supports the nonprofit,
 * shown wherever the site hands off to memberships, rentals, packages, or
 * the shop. Google Ad Grants requires it next to any commercial activity.
 */
export function NonprofitNote({ className = '' }: { className?: string }) {
  return (
    <p className={`prose-block text-base text-muted ${className}`}>
      SquareOne Interactive is owned and operated by SquareOne Compassion, a 501(c)(3) nonprofit. Memberships, room rentals, party packages, and shop purchases are priced to cover the cost of running the campus, and any surplus supports the Early Learning Center, the Medical Center, and our work in west Tulsa.{' '}
      <Link href="/about" className="link">
        Read about our mission
      </Link>
      .
    </p>
  )
}
