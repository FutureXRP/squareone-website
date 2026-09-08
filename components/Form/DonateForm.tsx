'use client'

import { useState } from 'react'
import { DONATION_PRESETS_CENTS, DONATION_PURPOSES, formatCents } from '@/lib/donations'

export function DonateForm() {
  const [preset, setPreset] = useState<number | 'other'>(5000)
  const [other, setOther] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [purpose, setPurpose] = useState<(typeof DONATION_PURPOSES)[number]>('General')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Integer cents only. "Other" is parsed from whole dollars and optional cents, never a float multiply.
  function amountCents(): number {
    if (preset !== 'other') return preset
    const m = other.trim().replace(/[$,]/g, '').match(/^(\d+)(?:\.(\d{1,2}))?$/)
    if (!m) return 0
    return parseInt(m[1], 10) * 100 + (m[2] ? parseInt(m[2].padEnd(2, '0'), 10) : 0)
  }

  async function go(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const cents = amountCents()
    if (cents < 100) {
      setError('Enter an amount of at least $1.')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents, frequency, purpose }),
      })
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string }
      if (data.ok && data.url) {
        window.location.assign(data.url)
        return
      }
      setError(data.error || 'We could not start checkout. Please try again.')
    } catch {
      setError('We could not start checkout. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={go} className="max-w-prose space-y-7">
      <fieldset>
        <legend className="label">Frequency</legend>
        <div className="inline-flex rounded-md border border-line p-1" role="group">
          {(['once', 'monthly'] as const).map((f) => (
            <label key={f} className={`cursor-pointer rounded px-4 py-2 font-semibold ${frequency === f ? 'bg-accent text-white' : 'text-ink'}`}>
              <input type="radio" name="frequency" value={f} className="sr-only" checked={frequency === f} onChange={() => setFrequency(f)} />
              {f === 'once' ? 'One time' : 'Monthly'}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Amount</legend>
        <div className="grid grid-cols-3 gap-3">
          {DONATION_PRESETS_CENTS.map((c) => (
            <label key={c} className={`cursor-pointer rounded-md border-2 px-3 py-3 text-center text-lg font-semibold ${preset === c ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line'}`}>
              <input type="radio" name="amount" value={c} className="sr-only" checked={preset === c} onChange={() => setPreset(c)} />
              {formatCents(c)}
            </label>
          ))}
          <label className={`cursor-pointer rounded-md border-2 px-3 py-3 text-center text-lg font-semibold ${preset === 'other' ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line'}`}>
            <input type="radio" name="amount" value="other" className="sr-only" checked={preset === 'other'} onChange={() => setPreset('other')} />
            Other
          </label>
        </div>
        {preset === 'other' ? (
          <div className="mt-3">
            <label className="label" htmlFor="d-other">
              Other amount (USD)
            </label>
            <input className="field" id="d-other" inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} placeholder="75" />
          </div>
        ) : null}
      </fieldset>

      <div>
        <label className="label" htmlFor="d-purpose">
          Purpose (optional)
        </label>
        <select className="field" id="d-purpose" value={purpose} onChange={(e) => setPurpose(e.target.value as (typeof DONATION_PURPOSES)[number])}>
          {DONATION_PURPOSES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn-primary" disabled={busy}>
        {busy ? 'Opening checkout' : 'Give now'}
      </button>
    </form>
  )
}
