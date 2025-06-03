'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/utils/api'

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const confirmAndExecute = async (action: () => Promise<void>, confirmText: string) => {
    if (!window.confirm(confirmText)) return
    setLoading(true)
    setMessage('')
    try {
      await action()
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete-account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error('Failed to delete account')
    logout()
    router.push('/login')
  }

  const deleteAllApplications = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
    });

    if (!res.ok) throw new Error('Failed to delete applications');

    setMessage('All applications deleted successfully.');
    };


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">⚙️ Settings</h1>

      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

      <button
        onClick={() => confirmAndExecute(deleteAllApplications, 'Are you sure you want to delete all job applications?')}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 mb-4 rounded transition"
      >
        Delete All Applications
      </button>

      <button
        onClick={() => confirmAndExecute(deleteAccount, 'Are you sure you want to delete your account? This cannot be undone.')}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Delete Account
      </button>
    </div>
  )
}
