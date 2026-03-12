import { useEffect, useState } from 'react'
import Modal from './Modal'

const initial = {
  teamName: '',
  email: '',
  track: 'general',
  members: [{ name: '', email: '' }],
}

export default function RegisterForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => {
    const cached = localStorage.getItem('hackheist:register')
    return cached ? JSON.parse(cached) : initial
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => { localStorage.setItem('hackheist:register', JSON.stringify(form)) }, [form])

  function validate() {
    const e = {}
    if (!form.teamName) e.teamName = 'Team name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    form.members.forEach((m, i) => {
      if (!m.name) e[`member-${i}-name`] = 'Name required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) e[`member-${i}-email`] = 'Valid email required'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function update(field, value) { setForm(prev => ({ ...prev, [field]: value })) }
  function updateMember(idx, field, value) {
    setForm(prev => ({ ...prev, members: prev.members.map((m, i) => i === idx ? { ...m, [field]: value } : m) }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      if (data?.ok) { setSuccess(true); localStorage.removeItem('hackheist:register') }
    } catch {
      localStorage.setItem('hackheist:register:pending', JSON.stringify(form))
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-muted-gray/80 border border-white/10 p-6 shadow-soft">
      <div className="mb-4" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map(n => (
            <div key={n} className={`flex-1 h-2 rounded-full ${n <= step ? 'bg-heist-red' : 'bg-white/10'}`} />
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-300">Step {step} of 3</div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Team Name</label>
            <input className="mt-1 w-full rounded-xl bg-black/40 border-white/10 text-white" value={form.teamName} onChange={e => update('teamName', e.target.value)} required />
            {errors.teamName && <p className="text-heist-red text-sm mt-1">{errors.teamName}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-300">Contact Email</label>
            <input type="email" className="mt-1 w-full rounded-xl bg-black/40 border-white/10 text-white" value={form.email} onChange={e => update('email', e.target.value)} required />
            {errors.email && <p className="text-heist-red text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-300">Track</label>
            <select className="mt-1 w-full rounded-xl bg-black/40 border-white/10 text-white" value={form.track} onChange={e => update('track', e.target.value)}>
              <option value="general">General</option>
              <option value="ai">AI</option>
              <option value="web3">Web3</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {form.members.map((m, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300">Member Name</label>
                  <input className="mt-1 w-full rounded-xl bg-black/40 border-white/10 text-white" value={m.name} onChange={e => updateMember(i, 'name', e.target.value)} required />
                  {errors[`member-${i}-name`] && <p className="text-heist-red text-sm mt-1">{errors[`member-${i}-name`]}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-300">Member Email</label>
                  <input type="email" className="mt-1 w-full rounded-xl bg-black/40 border-white/10 text-white" value={m.email} onChange={e => updateMember(i, 'email', e.target.value)} required />
                  {errors[`member-${i}-email`] && <p className="text-heist-red text-sm mt-1">{errors[`member-${i}-email`]}</p>}
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button type="button" onClick={() => setForm(f => ({ ...f, members: [...f.members, { name: '', email: '' }] }))} className="rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10">Add member</button>
            {form.members.length > 1 && (
              <button type="button" onClick={() => setForm(f => ({ ...f, members: f.members.slice(0, -1) }))} className="rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10">Remove last</button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2 text-gray-200">
          <div><span className="text-gray-400">Team:</span> {form.teamName}</div>
          <div><span className="text-gray-400">Email:</span> {form.email}</div>
          <div><span className="text-gray-400">Track:</span> {form.track}</div>
          <div className="mt-2">
            <div className="text-gray-400">Members</div>
            <ul className="list-disc pl-6">
              {form.members.map((m, i) => (<li key={i}>{m.name} — {m.email}</li>))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={() => setStep(s => Math.max(1, s - 1))} className="rounded-xl px-4 py-2 border border-white/10 text-white hover:bg-white/10" disabled={step === 1}>Back</button>
        {step < 3 ? (
          <button type="button" onClick={() => setStep(s => Math.min(3, s + 1))} className="rounded-xl px-4 py-2 bg-white/10 text-white border border-white/10 hover:bg-white/20">Next</button>
        ) : (
          <button type="submit" disabled={submitting} className="rounded-xl px-5 py-2.5 bg-heist-red text-white font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-heist-red/60">
            {submitting ? 'Submitting…' : 'Confirm & Submit'}
          </button>
        )}
      </div>

      <Modal open={success} onClose={() => setSuccess(false)} title="Registration received">
        <p className="text-gray-200">We have your submission. Check your email for confirmation (mock).</p>
        <p className="text-gray-400 text-sm mt-2">To connect a real backend, configure EmailJS or Firebase (see README).</p>
      </Modal>
    </form>
  )
}

