import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Tracker Pro - AI-Powered Financial Management",
  description:
    "Track expenses with AI assistance, 3D visualization, and comprehensive analytics. Export to Excel and get personalized financial insights.",
  keywords: ["expense tracker", "budget management", "financial analytics", "AI assistant", "personal finance"],
  authors: [{ name: "Expense Tracker Team" }],
  openGraph: {
    title: "Expense Tracker Pro",
    description: "AI-powered expense tracking with 3D visualization and smart analytics",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expense Tracker Pro",
    description: "AI-powered expense tracking with 3D visualization",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense>
          {children}
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  )
}
