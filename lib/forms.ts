import { z } from 'zod'

const phone = z.string().trim().max(40)
const email = z.string().trim().email().max(200)
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''))
const isoDate = z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')

export const contactSchema = z.object({
  kind: z.literal('contact'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  name: z.string().trim().min(1).max(120),
  email,
  phone: phone.optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
})

// How tuition will be paid. Shown as radios on the enrollment form.
export const PAYMENT_OPTIONS = ['DHS', 'Tribal', 'Private pay'] as const

// Enrollment interest fields, per the ELC director:
// parent or guardian name, email, phone, child's birth date, desired start date,
// DHS / Tribal / private pay, questions or comments.
const elcEnrollmentFields = {
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  parentName: z.string().trim().min(1).max(120),
  email,
  phone: phone.min(7),
  childDob: isoDate,
  desiredStart: z.string().trim().min(1).max(60),
  payment: z.enum(PAYMENT_OPTIONS),
  comments: optionalText(5000),
}

export const elcEnrollmentSchema = z.object({
  kind: z.literal('elc-enrollment'),
  ...elcEnrollmentFields,
})

// Tour request, from the Request a tour button on the ELC page.
export const elcTourSchema = z.object({
  kind: z.literal('elc-tour'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  parentName: z.string().trim().min(1).max(120),
  email,
  phone: phone.min(7),
  childAge: optionalText(60),
  preferredTimes: z.string().trim().min(1).max(300),
  comments: optionalText(5000),
})

export const formSchema = z.discriminatedUnion('kind', [contactSchema, elcEnrollmentSchema, elcTourSchema])
export type FormPayload = z.infer<typeof formSchema>
export type FormKind = FormPayload['kind']

export const FORM_ROUTING: Record<FormKind, string> = {
  contact: 'connect@squareonecompassion.com',
  'elc-enrollment': 'connect@squareoneelc.com',
  'elc-tour': 'connect@squareoneelc.com',
}

export const FORM_SUCCESS: Record<FormKind, string> = {
  contact: "Message sent. We'll reply within one business day.",
  'elc-enrollment': "Thanks. We'll reach out within two business days about enrollment.",
  'elc-tour':
    'Thank you for requesting a tour of SquareOne Early Learning Center! We look forward to meeting your family, learning about your child, and showing you what makes our School Family so special. We will contact you shortly to schedule your tour time.',
}

/** Human titles for the notification email subject line. */
export const FORM_TITLES: Record<FormKind, string> = {
  contact: 'Contact Form',
  'elc-enrollment': 'ELC Enrollment Form',
  'elc-tour': 'ELC Tour Request Form',
}

/** Field order and labels for the notification email, per form. */
const FIELD_LABELS: Record<FormKind, [string, string][]> = {
  contact: [
    ['name', 'Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['message', 'Message'],
  ],
  'elc-enrollment': [
    ['parentName', 'Parent/Guardian Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['childDob', "Child's Birth Date"],
    ['desiredStart', 'Desired Start Date'],
    ['payment', 'DHS, Tribal, or Private Pay'],
    ['comments', 'Questions or Comments'],
  ],
  'elc-tour': [
    ['parentName', 'Parent/Guardian Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['childAge', "Child's Age"],
    ['preferredTimes', 'Preferred Days and Times'],
    ['comments', 'Questions or Comments'],
  ],
}

/** 2026-05-20 becomes 05/20/2026. Anything else is returned as typed. */
function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(formatValue).join(', ')
  const s = String(value ?? '').trim()
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  return m ? `${m[2]}/${m[3]}/${m[1]}` : s
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

/** Label and value pairs in display order, skipping empty answers. */
export function submissionRows(kind: FormKind, payload: Record<string, unknown>): [string, string][] {
  const rows: [string, string][] = []
  const seen = new Set<string>()
  for (const [key, label] of FIELD_LABELS[kind]) {
    seen.add(key)
    const v = formatValue(payload[key])
    if (v) rows.push([label, v])
  }
  // Anything not in the label list still gets through, so nothing a visitor typed is lost.
  for (const [key, value] of Object.entries(payload)) {
    if (seen.has(key)) continue
    const v = formatValue(value)
    if (v) rows.push([key, v])
  }
  return rows
}

const SITE = 'https://squareonecompassion.com'

/** Plain-text body: each label on its own line, the answer indented beneath it. */
export function renderSubmissionText(kind: FormKind, payload: Record<string, unknown>): string {
  const lines = [`New submission from ${FORM_TITLES[kind]}`, '']
  for (const [label, value] of submissionRows(kind, payload)) {
    lines.push(label)
    for (const line of value.split(/\r?\n/)) lines.push(`    ${line}`)
    lines.push('')
  }
  lines.push('--', SITE)
  return lines.join('\n')
}

/** HTML body in the style of the old site's notifications: a shaded label bar above each answer. */
export function renderSubmissionHtml(kind: FormKind, payload: Record<string, unknown>): string {
  const rows = submissionRows(kind, payload)
    .map(([label, value]) => {
      const v = escapeHtml(value).replace(/\r?\n/g, '<br>')
      const cell = /^[^@\s]+@[^@\s]+$/.test(value) ? `<a href="mailto:${escapeHtml(value)}" style="color:#05528f">${v}</a>` : v
      return `<tr><td style="background:#e9edf2;padding:8px 12px;font-weight:700;font-size:14px;color:#1a1a1a">${escapeHtml(label)}</td></tr>
<tr><td style="padding:10px 12px 16px 28px;font-size:15px;color:#1a1a1a;line-height:1.45">${cell}</td></tr>`
    })
    .join('\n')
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px">
<p style="font-size:16px;font-weight:700;margin:0 0 14px">New submission from ${escapeHtml(FORM_TITLES[kind])}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
${rows}
</table>
<p style="margin:18px 0 0;font-size:12px;color:#667"><a href="${SITE}" style="color:#667">${SITE.replace('https://', '')}</a></p>
</div>`
}
