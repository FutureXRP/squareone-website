'use client'

import { Honeypot } from './Honeypot'
import { formToObject, useFormSubmit } from './useFormSubmit'
import { FORM_SUCCESS } from '@/lib/forms'

export function TourForm() {
  const { state, submit } = useFormSubmit()

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-md bg-accent-soft p-5 text-lg font-semibold text-accent-ink">
        {FORM_SUCCESS['elc-tour']}
      </p>
    )
  }

  return (
    <form
      className="relative max-w-prose space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
        void submit({ kind: 'elc-tour', ...formToObject(e.currentTarget) })
      }}
    >
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="t-parent">
            Parent or guardian name
          </label>
          <input className="field" id="t-parent" name="parentName" type="text" required autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="t-email">
            Email
          </label>
          <input className="field" id="t-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="t-phone">
            Phone
          </label>
          <input className="field" id="t-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="t-age">
            Child&apos;s age
          </label>
          <input className="field" id="t-age" name="childAge" type="text" placeholder="For example, 18 months" />
        </div>
        <div>
          <label className="label" htmlFor="t-times">
            Preferred days and times
          </label>
          <input className="field" id="t-times" name="preferredTimes" type="text" required placeholder="For example, weekday mornings" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="t-comments">
          Questions or comments
        </label>
        <textarea className="field" id="t-comments" name="comments" rows={4} />
      </div>
      {state.status === 'error' ? (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn-primary" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending' : 'Request a tour'}
      </button>
    </form>
  )
}
