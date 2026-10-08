'use client'

import { useRef, useState, type FormEvent } from 'react'
import { interests, validateRegistration, type RegistrationErrors } from '@/lib/registration'
import { GlassAction, GlassBackdrop } from './liquid-surface'

type Fields = { name: string; email: string; interest: string; consent: boolean; company: string }
type Notice = { kind: 'success' | 'preview' | 'error'; text: string } | null

const initialFields: Fields = { name: '', email: '', interest: '', consent: false, company: '' }

export function RegistrationForm() {
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [notice, setNotice] = useState<Notice>(null)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // The honeypot has no validation rule of its own, so it is excluded here.
  function errorFor(field: keyof Fields) {
    return field === 'company' ? undefined : errors[field]
  }

  function update<K extends keyof Fields>(field: K, value: Fields[K]) {
    const next = { ...fields, [field]: value }
    setFields(next)
    if (errorFor(field)) setErrors(validateRegistration(next).errors)
    if (notice) setNotice(null)
  }

  function focusFirstError() {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    const result = validateRegistration(fields)
    setErrors(result.errors)
    setNotice(null)
    if (!result.data) {
      focusFirstError()
      return
    }

    setSubmitting(true)
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The honeypot value is included so the server can screen simple bots.
        body: JSON.stringify({ ...result.data, company: fields.company }),
        cache: 'no-store',
        signal: controller.signal,
      })
      const payload: { code?: string; message?: string; errors?: RegistrationErrors } = await response.json()

      if (response.ok) {
        setFields(initialFields)
        setErrors({})
        setNotice({ kind: 'success', text: payload.message || 'Your spot is reserved. See you there!' })
      } else if (response.status === 503 && payload.code === 'PREVIEW_MODE') {
        // Preview-only fallback. Never imply that a local browser save is a real RSVP.
        const key = 'gdg-developer-day-preview-rsvps'
        const saved: unknown = JSON.parse(window.localStorage.getItem(key) || '[]')
        const list = Array.isArray(saved) ? saved : []
        const withoutDuplicate = list.filter((item: { email?: string }) => item?.email !== result.data?.email)
        window.localStorage.setItem(key, JSON.stringify([...withoutDuplicate, { ...result.data, savedAt: new Date().toISOString() }]))
        setFields(initialFields)
        setErrors({})
        setNotice({ kind: 'preview', text: 'Saved on this device for preview only. This is not a real RSVP. Connect Firebase to accept registrations.' })
      } else {
        if (payload.errors) {
          setErrors(payload.errors)
          focusFirstError()
        }
        setNotice({ kind: 'error', text: payload.message || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setNotice({
        kind: 'error',
        text: error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please try again.'
          : 'We could not save your details. Check your connection and try again.',
      })
    } finally {
      window.clearTimeout(timeout)
      setSubmitting(false)
    }
  }

  return (
    <div className="registration-panel relative isolate overflow-hidden rounded-[24px] border border-white/[0.16] bg-white/[0.10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] sm:p-8 lg:p-10">
      <GlassBackdrop className="rounded-[24px]" displacementScale={90} blurAmount={0.1} saturation={160} cornerRadius={24} />
      <form ref={formRef} noValidate onSubmit={submit} className="relative z-[1]" aria-label="Event registration">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#a7d3ff]">Registration</p>
            <h3 className="mt-3 text-[27px] font-extrabold tracking-[-0.04em] text-white sm:text-[32px]">Save your seat.</h3>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.09] text-lg font-medium text-white" aria-hidden="true">↗</span>
        </div>

        <div className="space-y-5">
          <div className="field-group">
            <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
            <input id="name" name="name" type="text" autoComplete="name" maxLength={80} placeholder="Your full name" value={fields.name} onChange={(event) => update('name', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} disabled={submitting} />
            {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
          </div>
          <div className="field-group">
            <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={254} inputMode="email" placeholder="you@example.com" value={fields.email} onChange={(event) => update('email', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} disabled={submitting} />
            {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
          </div>
          <div className="field-group">
            <label htmlFor="interest">What are you into? <span aria-hidden="true">*</span></label>
            <div className="relative">
              <select id="interest" name="interest" value={fields.interest} onChange={(event) => update('interest', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.interest)} aria-describedby={errors.interest ? 'interest-error' : undefined} disabled={submitting} className={!fields.interest ? 'is-placeholder' : ''}>
                <option value="" disabled>Choose your area of interest</option>
                {interests.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
              </select>
              <span className="select-chevron pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/75" aria-hidden="true">⌄</span>
            </div>
            {errors.interest && <p id="interest-error" className="field-error">{errors.interest}</p>}
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={fields.company} onChange={(event) => update('company', event.target.value)} />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-start gap-3 text-[13px] font-medium leading-[1.65] text-white/85" htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" checked={fields.consent} onChange={(event) => update('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} disabled={submitting} className="mt-1 size-4 shrink-0 accent-[#8ab4f8]" />
            <span>I agree to have my details used to manage this event registration.</span>
          </label>
          {errors.consent && <p id="consent-error" className="field-error mt-2">{errors.consent}</p>}
        </div>

        <div className="mt-8">
          <GlassAction type="submit" disabled={submitting} className="w-full sm:w-auto">
            <span>{submitting ? 'Submitting...' : 'Register now'}</span>
            <span aria-hidden="true" className={submitting ? 'loading-marks' : 'text-[20px] leading-none'}>{submitting ? '•••' : '↗'}</span>
          </GlassAction>
        </div>

        <div aria-live="polite" aria-atomic="true" className="mt-5 min-h-5">
          {notice && <p role={notice.kind === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-[13px] font-semibold leading-relaxed ${notice.kind === 'error' ? 'border-[#f28b82]/40 bg-[#361d20]/95 text-[#ffd0cc]' : notice.kind === 'preview' ? 'border-[#fdd663]/40 bg-[#332b17]/95 text-[#ffe8aa]' : 'border-[#81c995]/40 bg-[#142b20]/95 text-[#c7f5d2]'}`}>{notice.text}</p>}
        </div>
      </form>
    </div>
  )
}
