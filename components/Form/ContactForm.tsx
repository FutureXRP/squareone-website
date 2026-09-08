'use client'

import { Honeypot } from './Honeypot'
import { formToObject, useFormSubmit } from './useFormSubmit'
import { FORM_SUCCESS } from '@/lib/forms'

export function ContactForm() {
  const { state, submit } = useFormSubmit()

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-md bg-accent-soft p-5 text-lg font-semibold text-accent-ink">
        {FORM_SUCCESS.contact}
      </p>
    )
  }

  return (
    <form
      className="relative max-w-prose space-y-5"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault()
        void submit({ kind: 'contact', ...formToObject(e.currentTarget) })
      }}
    >
      <Honeypot />
      <div>
        <label className="label" htmlFor="c-name">
          Name
        </label>
        <input className="field" id="c-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="c-email">
          Email
        </label>
        <input className="field" id="c-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="c-phone">
          Phone (optional)
        </label>
        <input className="field" id="c-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div>
        <label className="label" htmlFor="c-message">
          Message
        </label>
        <textarea className="field" id="c-message" name="message" rows={6} required />
      </div>
      {state.status === 'error' ? (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn-primary" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending' : 'Send message'}
      </button>
    </form>
  )
}
