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

// How tuition will be paid. Shown as radios on both ELC forms.
export const PAYMENT_OPTIONS = ['DHS', 'Tribal', 'Private pay'] as const

// Shared fields for the two ELC forms, per the ELC director:
// parent or guardian name, email, phone, child's birth date, desired start date,
// DHS / Tribal / private pay, questions or comments.
const elcFamilyFields = {
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
  ...elcFamilyFields,
})

// Tour request: the enrollment fields plus a preferred tour date and time.
export const elcTourSchema = z.object({
  kind: z.literal('elc-tour'),
  ...elcFamilyFields,
  tourDateTime: z.string().trim().min(1).max(300),
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

/** Plain-text rendering of a submission for the notification email. */
export function describeSubmission(payload: Record<string, unknown>): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) continue
    if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
      lines.push(`${key}: ${(value as string[]).join(', ')}`)
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        lines.push(`${key} ${i + 1}:`)
        for (const [k, v] of Object.entries(item as Record<string, unknown>)) if (v !== undefined && v !== '') lines.push(`  ${k}: ${v}`)
      })
    } else {
      lines.push(`${key}: ${value}`)
    }
  }
  return lines.join('\n')
}
