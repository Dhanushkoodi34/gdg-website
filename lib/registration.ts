export const interests = ['AI & Machine Learning', 'Web Development', 'Cloud & DevOps', 'Android & Flutter', 'Just exploring'] as const
export type Interest = (typeof interests)[number]

export type Registration = {
  name: string
  email: string
  interest: Interest
  consent: true
}

export type RegistrationErrors = Partial<Record<keyof Registration, string>>

export function validateRegistration(input: unknown): { data?: Registration; errors: RegistrationErrors } {
  const raw = input && typeof input === 'object' && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {}

  const name = typeof raw.name === 'string' ? raw.name.trim().replace(/\s+/g, ' ') : ''
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : ''
  const interest = raw.interest
  const errors: RegistrationErrors = {}

  if (name.length < 2 || name.length > 80) errors.name = 'Enter your name (2–80 characters).'
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (!interests.includes(interest as Interest)) errors.interest = 'Choose a topic you are interested in.'
  if (raw.consent !== true) errors.consent = 'Please agree before continuing.'

  if (Object.keys(errors).length > 0) return { errors }
  return { errors, data: { name, email, interest: interest as Interest, consent: true } }
}
