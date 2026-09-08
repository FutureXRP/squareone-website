// Redirects live in vercel.json (source of truth for hosting). This file
// mirrors them so they are type-checked and testable, and so a future move
// off Vercel can feed them into next.config.ts instead.
export const REDIRECTS = [
  ['/elc', '/early-learning'],
  ['/elc-enrollment', '/early-learning#enroll'],
  ['/virtual-learning-after-school', '/early-learning'],
  ['/interactive', '/interactive'],
  ['/medical', '/medical'],
  ['/donate', '/give'],
  ['/event-request', '/events'],
  ['/contact-us', '/contact'],
] as const
