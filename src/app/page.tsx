'use client'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Link from 'next/link'

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center  text-center bg-gray-50">
      <div data-aos="fade-up" className="space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Welcome to <span className="text-blue-600">Job Tracker</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Add and manage your job applications easily.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded shadow transition"
          >
            Add Application
          </Link>
          <Link
            href="/search"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded shadow transition"
          >
            Search Applications
          </Link>
        </div>
      </div>
    </main>
  )
}
