'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/utils/api'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  const syncAuthState = () => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('username')
    setIsAuthenticated(!!token && !!name)
    setUsername(name)
  }

  useEffect(() => {
    syncAuthState() // check once on mount

    // Listen to changes across tabs/windows
    const handleStorage = () => syncAuthState()
    window.addEventListener('storage', handleStorage)

    // Recheck on route change
    const interval = setInterval(syncAuthState, 1000)

    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    logout()
    syncAuthState()
    router.push('/login')
  }

  return (
    <nav className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Job Tracker 
      </Link>


      {isAuthenticated && (
        <div className="flex items-center gap-4">
            
            <Link href="/add" className="text-gray-700 hover:text-blue-600">Add</Link>
            <Link href="/search" className="text-gray-700 hover:text-blue-600">Search</Link>
          
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-900 transition"
          >
            Logout (<span className="text-white font-medium">{username}</span>)
          </button>
        </div>
      )}
    </nav>
  )
}
