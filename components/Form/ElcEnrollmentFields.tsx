'use client'

import { PAYMENT_OPTIONS } from '@/lib/forms'

/**
 * The ELC enrollment interest fields, per the ELC director:
 * parent or guardian name, email, phone, child's birth date, desired start date,
 * and how tuition will be paid. The form adds the comments box.
 */
export function ElcEnrollmentFields({ prefix }: { prefix: string }) {
  const id = (s: string) => `${prefix}-${s}`
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="label" htmlFor={id('parent')}>
          Parent or guardian name
        </label>
        <input className="field" id={id('parent')} name="parentName" type="text" required autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor={id('email')}>
          Email
        </label>
        <input className="field" id={id('email')} name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor={id('phone')}>
          Phone
        </label>
        <input className="field" id={id('phone')} name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div>
        <label className="label" htmlFor={id('dob')}>
          Child&apos;s birth date
        </label>
        <input className="field" id={id('dob')} name="childDob" type="date" required />
      </div>
      <div>
        <label className="label" htmlFor={id('start')}>
          Desired start date
        </label>
        <input className="field" id={id('start')} name="desiredStart" type="text" required placeholder="For example, August 2026" />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="label">How will tuition be paid?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {PAYMENT_OPTIONS.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2">
              <input type="radio" name="payment" value={opt} required className="h-4 w-4 accent-[var(--accent)]" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
