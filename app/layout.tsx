import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Self-hosted copies of Google Fonts, so production builds do not depend on a font CDN.
const manrope = localFont({ src: '../public/fonts/manrope-latin-variable.woff2', weight: '200 800', variable: '--font-manrope', display: 'swap' })
const dmMono = localFont({ src: [
  { path: '../public/fonts/dm-mono-latin-400.woff2', weight: '400' },
  { path: '../public/fonts/dm-mono-latin-500.woff2', weight: '500' },
], variable: '--font-dm-mono', display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Developer Day 2026 | GDG Community Event Template',
  description: 'A sample Google Developer Groups community event page. Explore the agenda and register for Developer Day 2026 at Info Institute of Engineering, Coimbatore.',
  openGraph: {
    title: 'Developer Day 2026',
    description: 'Build what’s next, together. A community event template for developers.',
    images: ['/images/hero-conference.jpg'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
