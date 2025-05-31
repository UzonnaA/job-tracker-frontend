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
        <nav className="bg-white shadow px-6 py-4 mb-6">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">Job Tracker</Link>
            <div className="flex gap-4">
              <Link href="/add" className="text-blue-600 hover:underline">Add</Link>
              <Link href="/search" className="text-blue-600 hover:underline">Search</Link>
            </div>
          </div>
        </nav>
        <main className="px-6">{children}</main>
      </body>
    </html>
  )
}
