import { z } from 'zod'

const phone = z.string().trim().max(40)
const email = z.string().trim().email().max(200)
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''))

export const contactSchema = z.object({
  kind: z.literal('contact'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  name: z.string().trim().min(1).max(120),
  email,
  phone: phone.optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
})

export const ASSISTANCE_OPTIONS = ['No', 'DHS', 'Tribal'] as const
export const GENDER_OPTIONS = ['Male', 'Female'] as const
export const DAY_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const
export const MAX_CHILDREN = 4

export const childSchema = z.object({
  name: z.string().trim().min(1).max(120),
  dob: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  gender: z.enum(GENDER_OPTIONS).optional().or(z.literal('')),
})

// Matches the enrollment wait list form on the old site.
export const elcEnrollmentSchema = z.object({
  kind: z.literal('elc-enrollment'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  parentFirst: z.string().trim().min(1).max(80),
  parentLast: z.string().trim().min(1).max(80),
  email,
  phone: phone.min(7),
  street: optionalText(200),
  city: optionalText(100),
  zip: optionalText(20),
  assistance: z.array(z.enum(ASSISTANCE_OPTIONS)).max(3).default([]),
  children: z.array(childSchema).min(1).max(MAX_CHILDREN),
  desiredStart: z.string().trim().min(1).max(60),
  days: z.array(z.enum(DAY_OPTIONS)).max(5).default([]),
  comments: optionalText(5000),
})

export const formSchema = z.discriminatedUnion('kind', [contactSchema, elcEnrollmentSchema])
export type FormPayload = z.infer<typeof formSchema>
export type FormKind = FormPayload['kind']

export const FORM_ROUTING: Record<FormKind, string> = {
  contact: 'connect@squareonecompassion.com',
  'elc-enrollment': 'connect@squareoneelc.com',
}

export const FORM_SUCCESS: Record<FormKind, string> = {
  contact: "Message sent. We'll reply within one business day.",
  'elc-enrollment': "Thanks. We'll reach out within two business days to schedule a tour.",
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
