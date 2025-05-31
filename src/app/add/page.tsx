'use client'
import { useEffect, useState } from 'react'

type JobApplication = {
  id?: number
  jobTitle: string
  company: string
  status: string
  applicationDate: string
  tags: string[]
}

export default function AddPage() {
  const [formData, setFormData] = useState<JobApplication>({
    jobTitle: '',
    company: '',
    status: '',
    applicationDate: '',
    tags: [],
  })
  const [tagInput, setTagInput] = useState('')
  const [recentApps, setRecentApps] = useState<JobApplication[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/applications')
      .then((res) => res.json())
      .then((data) => setRecentApps(data.slice(-4).reverse()))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    const updated = [...formData.tags]
    updated.splice(index, 1)
    setFormData({ ...formData, tags: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormData({ jobTitle: '', company: '', status: '', applicationDate: '', tags: [] })
        return fetch('http://localhost:8080/api/applications')
      })
      .then(res => res.json())
      .then(data => setRecentApps(data.slice(-4).reverse()))
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Job Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded mb-8">
        <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="" disabled>Select Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} className="w-full p-2 border rounded" required />

        <div>
          <label className="block font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="border p-2 rounded w-full" placeholder="Add tag" />
            <button type="button" onClick={handleAddTag} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">{tag}
                <button type="button" onClick={() => handleRemoveTag(idx)} className="text-red-600 hover:text-red-800 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Application</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
      <ul className="space-y-4">
        {recentApps.map(app => (
          <li key={app.id} className="p-4 border rounded shadow">
            <p className="font-semibold">{app.jobTitle} @ {app.company}</p>
            <p>Status: {app.status}</p>
            <p>Date: {app.applicationDate}</p>
            <p>Tags: {app.tags?.join(', ') || 'None'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
