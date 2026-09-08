import { z } from 'zod'

const phone = z.string().trim().max(40)
const email = z.string().trim().email().max(200)

export const contactSchema = z.object({
  kind: z.literal('contact'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  name: z.string().trim().min(1).max(120),
  email,
  phone: phone.optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
})

export const elcEnrollmentSchema = z.object({
  kind: z.literal('elc-enrollment'),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
  parentName: z.string().trim().min(1).max(120),
  email,
  phone: phone.min(7),
  childName: z.string().trim().min(1).max(120),
  childDob: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  desiredStart: z.string().trim().min(1).max(60),
  questions: z.string().trim().max(5000).optional().or(z.literal('')),
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
