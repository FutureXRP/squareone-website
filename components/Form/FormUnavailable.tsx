import { telHref } from '@/lib/site'

/** Shown in place of a form when no delivery backend is configured. Server component. */
export function FormUnavailable({ email, phone, what = 'Our online form' }: { email: string; phone: string; what?: string }) {
  return (
    <p className="rounded-md bg-accent-soft p-5 text-lg text-ink">
      {what} is not available right now. Email{' '}
      <a href={`mailto:${email}`} className="link">
        {email}
      </a>{' '}
      or call{' '}
      <a href={telHref(phone)} className="link">
        {phone}
      </a>
      .
    </p>
  )
}
