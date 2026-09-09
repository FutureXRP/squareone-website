'use client'

import { useState } from 'react'
import { Honeypot } from './Honeypot'
import { useFormSubmit } from './useFormSubmit'
import { FORM_SUCCESS, ASSISTANCE_OPTIONS, GENDER_OPTIONS, DAY_OPTIONS, MAX_CHILDREN } from '@/lib/forms'

type Child = { name: string; dob: string; gender: string }
const emptyChild = (): Child => ({ name: '', dob: '', gender: '' })

export function EnrollmentForm() {
  const { state, submit } = useFormSubmit()
  const [children, setChildren] = useState<Child[]>([emptyChild()])
  const [assistance, setAssistance] = useState<string[]>([])
  const [days, setDays] = useState<string[]>([])

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-md bg-accent-soft p-5 text-lg font-semibold text-accent-ink">
        {FORM_SUCCESS['elc-enrollment']}
      </p>
    )
  }

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  const setCount = (n: number) => setChildren((prev) => (n > prev.length ? [...prev, ...Array.from({ length: n - prev.length }, emptyChild)] : prev.slice(0, n)))
  const updateChild = (i: number, patch: Partial<Child>) => setChildren((prev) => prev.map((c, j) => (j === i ? { ...c, ...patch } : c)))

  return (
    <form
      className="relative max-w-prose space-y-8"
      onSubmit={(e) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        const text = (k: string) => String(f.get(k) ?? '')
        void submit({
          kind: 'elc-enrollment',
          website: text('website'),
          parentFirst: text('parentFirst'),
          parentLast: text('parentLast'),
          email: text('email'),
          phone: text('phone'),
          street: text('street'),
          city: text('city'),
          zip: text('zip'),
          assistance,
          children,
          desiredStart: text('desiredStart'),
          days,
          comments: text('comments'),
        })
      }}
    >
      <Honeypot />

      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold">Parent or guardian</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="e-first">
              First name
            </label>
            <input className="field" id="e-first" name="parentFirst" type="text" required autoComplete="given-name" />
          </div>
          <div>
            <label className="label" htmlFor="e-last">
              Last name
            </label>
            <input className="field" id="e-last" name="parentLast" type="text" required autoComplete="family-name" />
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
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="e-street">
              Street address
            </label>
            <input className="field" id="e-street" name="street" type="text" autoComplete="street-address" />
          </div>
          <div>
            <label className="label" htmlFor="e-city">
              City
            </label>
            <input className="field" id="e-city" name="city" type="text" autoComplete="address-level2" />
          </div>
          <div>
            <label className="label" htmlFor="e-zip">
              ZIP code
            </label>
            <input className="field" id="e-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Will you be needing any assistance?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {ASSISTANCE_OPTIONS.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={assistance.includes(opt)} onChange={() => toggle(assistance, setAssistance, opt)} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="label" htmlFor="e-count">
          Number of children to enroll
        </label>
        <select className="field sm:max-w-32" id="e-count" value={children.length} onChange={(e) => setCount(Number(e.target.value))}>
          {Array.from({ length: MAX_CHILDREN }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {children.map((c, i) => (
        <fieldset key={i} className="space-y-5 border-t border-line pt-6">
          <legend className="text-lg font-semibold">{children.length > 1 ? `Child ${i + 1}` : 'Child'}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor={`e-child-${i}`}>
                Child&apos;s name
              </label>
              <input className="field" id={`e-child-${i}`} type="text" required value={c.name} onChange={(e) => updateChild(i, { name: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor={`e-dob-${i}`}>
                Child&apos;s date of birth
              </label>
              <input className="field" id={`e-dob-${i}`} type="date" required value={c.dob} onChange={(e) => updateChild(i, { dob: e.target.value })} />
            </div>
          </div>
          <fieldset>
            <legend className="label">Gender</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {GENDER_OPTIONS.map((g) => (
                <label key={g} className="inline-flex items-center gap-2">
                  <input type="radio" name={`gender-${i}`} className="h-4 w-4 accent-[var(--accent)]" checked={c.gender === g} onChange={() => updateChild(i, { gender: g })} />
                  {g}
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>
      ))}

      <div className="border-t border-line pt-6">
        <label className="label" htmlFor="e-start">
          Desired enrollment date
        </label>
        <input className="field" id="e-start" name="desiredStart" type="text" required placeholder="For example, August 2026" />
      </div>

      <fieldset>
        <legend className="label">Days of interest</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {DAY_OPTIONS.map((d) => (
            <label key={d} className="inline-flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={days.includes(d)} onChange={() => toggle(days, setDays, d)} />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="label" htmlFor="e-comments">
          Additional comments
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
