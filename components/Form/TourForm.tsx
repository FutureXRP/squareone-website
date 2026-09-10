'use client'

import { Honeypot } from './Honeypot'
import { ElcFamilyFields } from './ElcFamilyFields'
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
      <ElcFamilyFields prefix="t" />
      <div>
        <label className="label" htmlFor="t-when">
          Preferred tour date and time
        </label>
        <input className="field" id="t-when" name="tourDateTime" type="text" required placeholder="For example, Tuesday morning next week" />
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
