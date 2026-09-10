'use client'

import { Honeypot } from './Honeypot'
import { ElcEnrollmentFields } from './ElcEnrollmentFields'
import { formToObject, useFormSubmit } from './useFormSubmit'
import { FORM_SUCCESS } from '@/lib/forms'

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
      <ElcEnrollmentFields prefix="e" />
      <div>
        <label className="label" htmlFor="e-comments">
          Questions or comments
        </label>
        <textarea className="field" id="e-comments" name="comments" rows={4} />
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
