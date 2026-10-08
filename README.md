# Developer Day glass event template

A responsive Next.js event landing page with Tailwind CSS, Google Fonts, and `liquid-glass-react`. The date, city, schedule, and event title are **sample content**, not a published event. This is not an official Google event page.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Also available: `npm run build`, `npm run start`, `npm run typecheck`, `npm run lint`.

## Registration and Firebase

The form submits to `POST /api/register` and the form component needs no changes when Firebase is connected. Client and server both validate full name, email, interest, and consent. With credentials configured, submissions are saved in Cloud Firestore, and a repeat submission from the same email for this event returns a clear duplicate-registration message.

This site targets the Firebase project **`gdg-event-ced32`**. The web config you get from Firebase (the `apiKey`, `authDomain`, `appId` values) is public by design and ships to every browser, so it cannot authenticate server writes. The server needs a service account instead.

### 1. Enable Cloud Firestore

In the Firebase console for `gdg-event-ced32`, open **Build → Firestore Database** and create a database in production mode.

### 2. Create a service account key

1. Open **Project settings → Service accounts**.
2. Click **Generate new private key** and download the JSON file.
3. Copy these three values into `.env.local` (copy `.env.example` as a starting point):

```bash
FIREBASE_PROJECT_ID=gdg-event-ced32
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxxx@gdg-event-ced32.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

`FIREBASE_PRIVATE_KEY` is the `private_key` field from the JSON, wrapped in quotes with literal `\n` escapes. The route normalises those escapes for you, and logs a specific reason if the key looks malformed or the email does not match the project.

Set these as **server-side secrets** in `.env.local` or your host's environment. Never use a `NEXT_PUBLIC_` prefix on them, and never commit the downloaded JSON.

### 3. Restart and verify

```bash
npm run dev
```

Submit the form. A success notice means the write reached Firestore; check **Firestore → `eventRegistrations`** for the document.

Set `NEXT_PUBLIC_SITE_URL` to your public URL for correct social sharing metadata (on Vercel, `VERCEL_URL` is also supported).

### Preview mode and failure behaviour

- **No credentials set:** the endpoint returns an explicit preview-mode response. The browser saves the form to its own local storage and the confirmation states clearly that it is **not a real RSVP**. This keeps the template runnable without ever fabricating a server-side registration.
- **Partial or invalid credentials:** users get a temporary-unavailable error, never a false confirmation. The specific reason is logged server-side.
- **Duplicate email:** returns 409 with a clear "already registered" message.

### Before you run a public event

The endpoint includes a honeypot field and a per-instance rate limit, which are enough for testing. For a public registration page, also add edge rate limiting, review Firestore access rules, replace the sample event copy and `eventId` in `app/api/register/route.ts`, and publish a privacy/retention policy for the data you collect.

## Deploy to Vercel

The app builds for Vercel as-is. `package.json` pins Node 22, which `firebase-admin` requires.

1. Push this folder to a Git repository and import it at [vercel.com/new](https://vercel.com/new). The default settings work; framework detection handles the rest.
2. Add the environment variables under **Project → Settings → Environment Variables** for **Production**, **Preview**, and **Development**:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` — paste the same quoted value with `\n` escapes you used in `.env.local`
   - `NEXT_PUBLIC_SITE_URL` — your production domain. This one **is** public-prefixed on purpose, so redeploy after changing it.
3. Deploy, then submit the form once and confirm a document appears in Firestore.

`.env.local` is ignored by git, so the key never leaves your machine through the repo. `.gitignore` covers `.env*` and keeps `.env.example` as the committed template.

The registration endpoint runs as a Node.js serverless function and only works on Node runtimes, so do not switch it to the Edge runtime. `NEXT_PUBLIC_SITE_URL` is optional because the code also falls back to Vercel's automatic `VERCEL_URL`.

For a high-traffic public event, add Vercel Firewall or WAF rate-limit rules on `/api/register`. The in-process limiter resets whenever a function instance is recycled and is not shared between instances.

## Design notes

The photographic assets are served locally through `next/image`. Liquid refraction is applied sparingly to the hero date panel, primary actions, and registration panel; CSS glass remains as a fallback during loading and on browsers without SVG displacement support. Motion and transparency preference fallbacks are included.

Photography from Unsplash: [conference audience](https://unsplash.com/photos/photo-1540575467063-178a50c2df87) and [stage microphone](https://unsplash.com/photos/photo-1475721027785-f74eccf877e2).
