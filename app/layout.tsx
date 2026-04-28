import type { Metadata, Viewport } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Serenova Resort — Bentota, Sri Lanka',
  description: "A luxury beach resort on Sri Lanka's Bentota coast.",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
