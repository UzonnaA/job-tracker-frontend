'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/utils/api'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('username')
    setIsAuthenticated(!!token && !!name)
    setUsername(name)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Job Tracker
      </Link>

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
