import { useState, useEffect, useRef } from 'react'
import api from '../api'
import { TeamIcon, PlayerIcon, TurfIcon, ImageIcon, UsersIcon, FolderIcon, LabelIcon } from '../components/IndustryIcons'

/* ── ICON COMPONENTS ────────────────────────────── */
// Icons are imported from IndustryIcons for consistent visual style

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/auth/login', { password })
      if (res.data.success) {
        localStorage.setItem('qt_admin', 'true')
        onLogin()
      }
    } catch {
      setError('Incorrect password. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Admin Login</h1>
          <p className="text-white/40 text-sm mt-1">QuickTurf Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Admin Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password" required
              className="w-full bg-white/5 border border-white/15 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-display font-bold rounded-full transition-all disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        <p className="text-center text-white/20 text-xs mt-4">Default password: <code className="text-white/40">quickturf_admin_2024</code></p>
      </div>
    </div>
  )
}

// ─── LEADS TABLE ──────────────────────────────────────────────────────────────
function LeadsTable({ leads, onDelete }) {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('All')

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === 'All' || l.role === filterRole
    return matchSearch && matchRole
  })

  const roleBadge = {
    'Player':       'bg-green-500/15 text-green-400 border-green-500/30',
    'Turf Owner':   'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'Collaborator': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, city..."
          className="flex-1 bg-white/5 border border-white/15 focus:border-green-500 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all" />
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          className="bg-white/5 border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-all">
          {['All', 'Player', 'Turf Owner', 'Collaborator'].map(r => (
            <option key={r} value={r} className="bg-gray-900">{r}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {['Player', 'Turf Owner', 'Collaborator'].map(role => (
          <div key={role} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="font-display font-black text-2xl text-white">
              {leads.filter(l => l.role === role).length}
            </div>
            <div className="text-white/40 text-xs mt-0.5">{role}s</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {['Name', 'Email', 'Phone', 'City', 'Role', 'Details', 'Date', 'Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-white/30">No leads found</td></tr>
            ) : filtered.map(lead => (
              <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{lead.name}</td>
                <td className="px-4 py-3 text-white/60">{lead.email}</td>
                <td className="px-4 py-3 text-white/60 whitespace-nowrap">{lead.phone}</td>
                <td className="px-4 py-3 text-white/60">{lead.city}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${roleBadge[lead.role] || 'bg-white/10 text-white/60 border-white/20'}`}>
                    {lead.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/50 max-w-[200px] truncate text-xs">
                  {lead.turfName ? `${lead.turfName}` : lead.investmentInterest ? `${lead.investmentInterest.slice(0, 40)}...` : '—'}
                </td>
                <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => onDelete(lead._id)}
                    className="text-red-400/60 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-white/30 text-xs mt-3">{filtered.length} of {leads.length} entries</p>
    </div>
  )
}

// ─── MEDIA MANAGER ────────────────────────────────────────────────────────────
function MediaManager({ images, onUpload, onDelete }) {
  const [uploading, setUploading] = useState(false)
  const [uploadType, setUploadType] = useState('turf')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const handleFile = async (file) => {
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('image', file)
    fd.append('type', uploadType)
    try {
      await onUpload(fd)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const typeIcons = { logo: LabelIcon, partner: TeamIcon, turf: TurfIcon }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload zone */}
        <div>
          <h3 className="font-display font-bold text-white text-lg mb-4">Upload New Image</h3>
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Image Type</label>
              <div className="flex gap-2">
                {['logo', 'partner', 'turf'].map(t => (
                  <button key={t} onClick={() => setUploadType(t)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${
                      uploadType === t
                        ? 'border-green-500/50 bg-green-500/15 text-green-400'
                        : 'border-white/10 bg-white/5 text-white/40 hover:border-white/25'
                    }`}>
                    {(() => {
                      const IconComponent = typeIcons[t]
                      return <IconComponent size={16} />
                    })()}
                    <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
              dragOver ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-white/40 bg-white/5'
            }`}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => handleFile(e.target.files[0])} />
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/>
                  <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" stroke="#22c55e"/>
                </svg>
                <p className="text-white/60 text-sm">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="mb-3 text-white/60">
                  <FolderIcon size={48} />
                </div>
                <p className="text-white/60 text-sm mb-1">Drag & drop or click to upload</p>
                <p className="text-white/30 text-xs">JPG, PNG, WEBP up to 5MB</p>
              </>
            )}
          </div>
        </div>

        {/* Image grid */}
        <div>
          <h3 className="font-display font-bold text-white text-lg mb-4">
            Uploaded Media <span className="text-white/30 font-normal text-sm">({images.length})</span>
          </h3>
          {images.length === 0 ? (
            <div className="border border-white/10 rounded-2xl p-10 text-center text-white/30">
              No images uploaded yet
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {images.map(img => (
                <div key={img._id} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-square">
                  <img src={img.imageUrl} alt={img.type} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-white/70 font-medium">{img.type}</span>
                    <button onClick={() => onDelete(img._id)}
                      className="text-red-400 text-xs bg-red-500/20 px-3 py-1 rounded-full hover:bg-red-500/40 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(localStorage.getItem('qt_admin') === 'true')
  const [tab, setTab] = useState('leads')
  const [leads, setLeads] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authed) {
      fetchLeads()
      fetchImages()
    }
  }, [authed])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/leads')
      setLeads(res.data.data || [])
    } catch (e) {
      console.error('Failed to fetch leads:', e)
    } finally {
      setLoading(false)
    }
  }

  const fetchImages = async () => {
    try {
      const res = await api.get('/api/images')
      setImages(res.data.data || [])
    } catch (e) {
      console.error('Failed to fetch images:', e)
    }
  }

  const deleteLead = async id => {
    if (!confirm('Delete this lead?')) return
    try {
      await api.delete(`/api/leads/${id}`)
      setLeads(l => l.filter(x => x._id !== id))
    } catch (e) {
      alert('Failed to delete')
    }
  }

  const uploadImage = async (formData) => {
    try {
      const res = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.data.data) setImages(prev => [res.data.data, ...prev])
    } catch (e) {
      alert('Upload failed: ' + (e.response?.data?.message || 'Server error'))
    }
  }

  const deleteImage = async id => {
    if (!confirm('Delete this image?')) return
    try {
      await api.delete(`/api/images/${id}`)
      setImages(imgs => imgs.filter(i => i._id !== id))
    } catch (e) {
      alert('Failed to delete image')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('qt_admin')
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  const tabs = [
    { id: 'leads', label: 'Leads', icon: UsersIcon, count: leads.length },
    { id: 'media', label: 'Media', icon: ImageIcon, count: images.length },
  ]

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Admin header */}
      <div className="border-b border-white/10 bg-black/95 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <span className="font-display font-bold text-white text-sm">Admin Panel</span>
              </div>
              <div className="flex gap-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      tab === t.id
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}>
                    <t.icon size={16} />
                    <span>{t.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-green-500/30' : 'bg-white/10'}`}>
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={fetchLeads} className="text-white/40 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors" title="Refresh">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                </svg>
              </button>
              <button onClick={handleLogout}
                className="text-xs text-white/40 hover:text-red-400 px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/40 transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length, icon: UsersIcon, color: 'text-white' },
            { label: 'Players', value: leads.filter(l => l.role === 'Player').length, icon: PlayerIcon, color: 'text-green-400' },
            { label: 'Turf Owners', value: leads.filter(l => l.role === 'Turf Owner').length, icon: TurfIcon, color: 'text-blue-400' },
            { label: 'Collaborators', value: leads.filter(l => l.role === 'Collaborator').length, icon: TeamIcon, color: 'text-yellow-400' },
          ].map(card => (
            <div key={card.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
              <div className="text-2xl mb-2"><card.icon /></div>
              <div className={`font-display font-black text-3xl ${card.color}`}>{card.value}</div>
              <div className="text-white/40 text-xs mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/>
                <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" stroke="#22c55e"/>
              </svg>
            </div>
          ) : tab === 'leads' ? (
            <LeadsTable leads={leads} onDelete={deleteLead} />
          ) : (
            <MediaManager images={images} onUpload={uploadImage} onDelete={deleteImage} />
          )}
        </div>
      </div>
    </div>
  )
}
