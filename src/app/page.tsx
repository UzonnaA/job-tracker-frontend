'use client'
import Image from "next/image";
import { useEffect, useState } from 'react'

type JobApplication = {
  id?: number
  jobTitle: string
  company: string
  status: string
  applicationDate: string
  tags: string[]
}

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [formData, setFormData] = useState<JobApplication>({
    jobTitle: '',
    company: '',
    status: '',
    applicationDate: '',
    tags: [],
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  // Fetch all applications
  const fetchApplications = () => {
  const params = new URLSearchParams()

  if (filterCompany) params.append('company', filterCompany)
  if (filterStatus) params.append('status', filterStatus)
  if (filterTag) params.append('tag', filterTag)

  fetch(`http://localhost:8080/api/applications?${params.toString()}`)
    .then((res) => res.json())
    .then((data) => setApplications(data))
    .catch((err) => console.error('Error fetching jobs:', err))
}

  const [filterCompany, setFilterCompany] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  // Handle tag changes
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...formData.tags]
    updatedTags.splice(index, 1)
    setFormData({ ...formData, tags: updatedTags })
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Add or update application
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingId ? 'PUT' : 'POST'
    const url = editingId
      ? `http://localhost:8080/api/applications/${editingId}`
      : 'http://localhost:8080/api/applications'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchApplications()
        setFormData({ jobTitle: '', company: '', status: '', applicationDate: '', tags: [] })
        setEditingId(null)
      })
      .catch((err) => console.error('Error saving job:', err))
  }

  // Fill form for editing
  const handleEdit = (app: JobApplication) => {
    setFormData(app)
    setEditingId(app.id || null)
  }

  // Delete application
  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/api/applications/${id}`, { method: 'DELETE' })
      .then(() => fetchApplications())
      .catch((err) => console.error('Error deleting job:', err))
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by company"
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">All Statuses</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchApplications}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded mb-8">
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>Select Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Tag input */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>




        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Application' : 'Add Application'}
        </button>
      </form>

      {/* List */}
      <ul className="space-y-4">
        {applications.map((app) => (
          <li key={app.id} className="p-4 border rounded shadow flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg">{app.jobTitle} @ {app.company}</p>
              <p>Status: {app.status}</p>
              <p>Date: {app.applicationDate}</p>
              <p>Tags: {app.tags?.join(', ') || 'None'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(app)}
                className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(app.id!)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
