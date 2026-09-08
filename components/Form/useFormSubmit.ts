'use client'

import { useState } from 'react'

export type FormState = { status: 'idle' | 'submitting' | 'success' | 'error'; error?: string }

export function useFormSubmit(endpoint = '/api/forms') {
  const [state, setState] = useState<FormState>({ status: 'idle' })

  async function submit(payload: Record<string, unknown>) {
    setState({ status: 'submitting' })
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) {
        setState({ status: 'success' })
      } else {
        setState({ status: 'error', error: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setState({ status: 'error', error: 'Something went wrong. Please try again.' })
    }
  }

  return { state, submit }
}

export function formToObject(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {}
  new FormData(form).forEach((v, k) => {
    out[k] = typeof v === 'string' ? v : ''
  })
  return out
}
