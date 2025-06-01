import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Tracker',
  description: 'Track your job applications',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 min-h-screen">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight hover:opacity-90 transition">
              Job Tracker
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link
                href="/add"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Add
              </Link>
              <Link
                href="/search"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Search
              </Link>
            </div>
          </div>
        </nav>
        <main className="px-6">{children}</main>
      </body>
    </html>
  )
}
