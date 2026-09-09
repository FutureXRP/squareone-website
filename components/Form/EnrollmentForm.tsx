'use client'

import { Honeypot } from './Honeypot'
import { formToObject, useFormSubmit } from './useFormSubmit'
import { FORM_SUCCESS, PAYMENT_OPTIONS } from '@/lib/forms'

export function EnrollmentForm() {
  const { state, submit } = useFormSubmit()

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-md bg-accent-soft p-5 text-lg font-semibold text-accent-ink">
        {FORM_SUCCESS['elc-enrollment']}
      </p>
    )
  }

  return (
    <form
      className="relative max-w-prose space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        void submit({ kind: 'elc-enrollment', ...formToObject(e.currentTarget) })
      }}
    >
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="e-parent">
            Parent or guardian name
          </label>
          <input className="field" id="e-parent" name="parentName" type="text" required autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="e-email">
            Email
          </label>
          <input className="field" id="e-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="e-phone">
            Phone
          </label>
          <input className="field" id="e-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="e-dob">
            Child&apos;s birth date
          </label>
          <input className="field" id="e-dob" name="childDob" type="date" required />
        </div>
        <div>
          <label className="label" htmlFor="e-start">
            Desired start date
          </label>
          <input className="field" id="e-start" name="desiredStart" type="text" required placeholder="For example, August 2026" />
        </div>
      </div>
      <fieldset>
        <legend className="label">How will you pay?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {PAYMENT_OPTIONS.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2">
              <input type="radio" name="payment" value={opt} required className="h-4 w-4 accent-[var(--accent)]" />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="label" htmlFor="e-comments">
          Questions or comments
        </label>
        <textarea className="field" id="e-comments" name="comments" rows={5} />
      </div>
      {state.status === 'error' ? (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn-primary" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending' : 'Ask about enrollment'}
      </button>
    </form>
  )
}
