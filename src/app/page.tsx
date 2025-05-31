// File: app/page.tsx
'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="mt-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Job Tracker</h1>
      <p className="mb-6 text-gray-600">Add and manage your job applications easily.</p>
      <div className="flex gap-4">
        <Link href="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Application
        </Link>
        <Link href="/search" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Search/Edit Applications
        </Link>
      </div>
    </main>
  )
}
