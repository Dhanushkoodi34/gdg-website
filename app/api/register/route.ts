import { createHash } from 'node:crypto'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { NextRequest, NextResponse } from 'next/server'
import { validateRegistration } from '@/lib/registration'

export const runtime = 'nodejs'

const eventId = 'developer-day-bengaluru-2026'
const WINDOW_MS = 60 * 60 * 1000
const MAX_SUBMISSIONS_PER_WINDOW = 5

// Best-effort abuse guard. Each server instance keeps its own counters, so pair this
// with edge rate limiting before running a public event page.
const recentSubmissions = new Map<string, number[]>()

type ServiceAccount = { state: 'missing' } | { state: 'incomplete' } | { state: 'invalid'; detail: string } | { state: 'ready'; projectId: string; clientEmail: string; privateKey: string }

function readServiceAccount(): ServiceAccount {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim()
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim()
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim()

  if (!projectId && !clientEmail && !privateKey) return { state: 'missing' }
  if (!projectId || !clientEmail || !privateKey) {
    return { state: 'incomplete' }
  }
  // The env value keeps literal \n escapes from the service account JSON.
  const normalizedKey = privateKey.replace(/\\n/g, '\n').trim()
  if (!normalizedKey.includes('-----BEGIN PRIVATE KEY-----') || !normalizedKey.includes('-----END PRIVATE KEY-----')) {
    return { state: 'invalid', detail: 'FIREBASE_PRIVATE_KEY is not a PEM private key.' }
  }
  // Firebase Admin SDK accounts look like firebase-adminsdk-xxxxx@<projectId>.iam.gserviceaccount.com,
  // so the local part is never the project ID. Match on the domain instead.
  if (!clientEmail.endsWith(`@${projectId}.iam.gserviceaccount.com`)) {
    return { state: 'invalid', detail: 'FIREBASE_CLIENT_EMAIL does not belong to FIREBASE_PROJECT_ID.' }
  }
  return { state: 'ready', projectId, clientEmail, privateKey: normalizedKey }
}

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (recentSubmissions.get(key) || []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  recentSubmissions.set(key, recent)
  if (recentSubmissions.size > 5000) {
    for (const [entry, times] of recentSubmissions) {
      if (!times.some((time) => now - time < WINDOW_MS)) recentSubmissions.delete(entry)
    }
  }
  return recent.length > MAX_SUBMISSIONS_PER_WINDOW
}

function response(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: NextRequest) {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return response({ message: 'Send the form as JSON.' }, 415)
  }

  let input: unknown
  try {
    const text = await request.text()
    if (text.length > 4096) return response({ message: 'Form submission is too large.' }, 413)
    input = JSON.parse(text)
  } catch {
    return response({ message: 'We could not read your form. Please try again.' }, 400)
  }

  const { data, errors } = validateRegistration(input)
  if (!data) return response({ message: 'Please check the highlighted fields.', errors }, 400)

  // Honeypot: a hidden field real visitors never fill in.
  const honeypot = (input as Record<string, unknown>).company
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return response({ message: 'Your spot is reserved. See you there!' }, 201)
  }

  const account = readServiceAccount()
  if (account.state === 'missing') {
    return response({ code: 'PREVIEW_MODE', message: 'Firebase is not connected. A real RSVP cannot be accepted yet.' }, 503)
  }
  if (account.state === 'incomplete') {
    console.error('Firebase credentials are incomplete. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.')
    return response({ message: 'Registration is temporarily unavailable. Please try again later.' }, 503)
  }
  if (account.state === 'invalid') {
    console.error(`Firebase credentials are invalid: ${account.detail}`)
    return response({ message: 'Registration is temporarily unavailable. Please try again later.' }, 503)
  }

  const clientKey = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  if (isRateLimited(clientKey)) {
    return response({ message: 'Too many attempts from this device. Please try again later.' }, 429)
  }

  try {
    const app = getApps()[0] ?? initializeApp({
      credential: cert({
        projectId: account.projectId,
        clientEmail: account.clientEmail,
        privateKey: account.privateKey,
      }),
    })
    const db = getFirestore(app)
    // Deterministic ID prevents the same email from registering twice for this event.
    const id = createHash('sha256').update(`${eventId}:${data.email}`).digest('hex')
    await db.collection(process.env.FIREBASE_COLLECTION || 'eventRegistrations').doc(id).create({
      eventId,
      name: data.name,
      email: data.email,
      interest: data.interest,
      consent: data.consent,
      registeredAt: FieldValue.serverTimestamp(),
    })
    return response({ message: 'Your spot is reserved. See you there!' }, 201)
  } catch (error) {
    const code = (error as { code?: number | string }).code
    if (code === 6 || code === 'already-exists') {
      return response({ message: 'This email is already registered for the event.' }, 409)
    }
    console.error('Registration failed:', error)
    return response({ message: 'We could not complete your registration. Please try again shortly.' }, 500)
  }
}