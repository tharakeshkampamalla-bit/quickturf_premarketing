import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import { PlayerIcon, TurfIcon, InvestorsIcon, TeamIcon } from '../components/IndustryIcons'

/* ── ICON COMPONENTS ────────────────────────────── */
// Icons are now imported from IndustryIcons.jsx for consistent styling

const ROLES = ['Player', 'Turf Owner', 'Investor', 'Collaborator']

const ROLE_META = {
  Player:       { icon: PlayerIcon, accent: '#00ff87', desc: 'Get early access and book turfs instantly the day we launch.', tag: 'PLAYER' },
  'Turf Owner': { icon: TurfIcon, accent: '#4488ff', desc: 'List your turf and start receiving automated bookings from day one.', tag: 'TURF OWNER' },
  Investor:     { icon: InvestorsIcon, accent: '#ffaa00', desc: 'Explore investment and strategic partnership opportunities with us.', tag: 'INVESTOR' },
  Collaborator: { icon: TeamIcon, accent: '#cc88ff', desc: 'Join our team or collaborate on building the QuickTurf platform.', tag: 'COLLABORATOR' },
}

export default function Join() {
  const [searchParams] = useSearchParams()
  const initialRole = (searchParams.get('role') || 'Player').replace(/\+/g, ' ')
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', role: initialRole, turfName: '', location: '', investmentInterest: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    const r = (searchParams.get('role') || 'Player').replace(/\+/g, ' ')
    setForm(f => ({ ...f, role: r }))
  }, [searchParams])

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading'); setErrorMsg('')
    try {
      await axios.post('/api/leads', form)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  const meta = ROLE_META[form.role] || ROLE_META.Player
  const { accent } = meta

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)` }} />
        <div style={{ textAlign: 'center', maxWidth: 480, position: 'relative', zIndex: 2, animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${accent}18`, border: `2px solid ${accent}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: `0 0 40px ${accent}30` }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Registration Complete</div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '3rem', letterSpacing: '-0.035em', color: 'var(--c-text)', marginBottom: 16, lineHeight: 1.05 }}>You're in!</h2>
          <p style={{ fontFamily: 'Outfit', fontSize: '1rem', color: 'rgba(240,240,240,0.5)', lineHeight: 1.75, marginBottom: 40 }}>
            Thanks, <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{form.name}</span>.
            We'll reach out at <span style={{ color: 'rgba(240,240,240,0.75)' }}>{form.email}</span> when QuickTurf launches in your city.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary" style={{ textDecoration: 'none', background: accent, boxShadow: `0 0 24px ${accent}35` }}>Back to Home</Link>
            <button onClick={() => { setStatus('idle'); setForm(f => ({ ...f, name: '', email: '', phone: '', city: '' })) }} className="btn-ghost">Register Another</button>
          </div>
        </div>
      </div>
    )
  }

  const Field = ({ label, name, type = 'text', placeholder, required, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: focusedField === name ? accent : 'rgba(240,240,240,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.2s' }}>{label}{required ? ' *' : ''}</label>
      {children || (
        <input name={name} type={type} value={form[name]} onChange={set} required={required} placeholder={placeholder}
          className="input-field"
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          style={{ '--focus-accent': accent }}
        />
      )}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Background effects */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: `radial-gradient(ellipse, ${accent}08 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0 }} className="dot-grid" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px 80px', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        {/* Left: info panel */}
        <div style={{ paddingTop: 24, position: 'sticky', top: 100 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(240,240,240,0.38)', textDecoration: 'none', marginBottom: 48, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,240,240,0.75)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,240,240,0.38)'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to home
          </Link>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 20, height: 1, background: accent, display: 'inline-block' }} />
            Early Access
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(2.4rem,4vw,3.8rem)', letterSpacing: '-0.035em', lineHeight: 0.95, color: 'var(--c-text)', marginBottom: 24 }}>
            Join<br /><span style={{ color: accent }}>QuickTurf</span>
          </h1>
          <p style={{ fontFamily: 'Outfit', fontSize: '0.95rem', color: 'rgba(240,240,240,0.44)', lineHeight: 1.75, marginBottom: 48, maxWidth: 380 }}>
            Register your interest. We'll notify you as soon as QuickTurf launches in your city.
          </p>

          {/* Role feature list */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}25`, borderRadius: 12, padding: '28px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32 }}>
                <meta.icon accent={accent} size={32} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', border: `1px solid ${accent}30`, padding: '3px 8px', borderRadius: 3 }}>{meta.tag}</span>
            </div>
            <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,240,240,0.5)', lineHeight: 1.7 }}>{meta.desc}</p>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
            {['No spam', 'No credit card', 'Free forever'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,240,240,0.3)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeOpacity="0.6"><path d="M20 6L9 17l-5-5"/></svg>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '44px 40px' }}>
          {/* Role tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 36, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 6 }}>
            {ROLES.map(r => {
              const rm = ROLE_META[r]
              const isActive = form.role === r
              return (
                <button key={r} type="button" onClick={() => setForm(f => ({ ...f, role: r }))}
                  style={{ padding: '10px 6px', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.75rem', background: isActive ? `${rm.accent}15` : 'transparent', color: isActive ? rm.accent : 'rgba(240,240,240,0.3)', border: isActive ? `1px solid ${rm.accent}35` : '1px solid transparent', borderRadius: 7, cursor: 'none', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 20, height: 20 }}>
                    <rm.icon accent={isActive ? rm.accent : 'rgba(240,240,240,0.3)'} size={20} />
                  </div>
                  <span style={{ fontSize: '0.68rem' }}>{r === 'Turf Owner' ? 'Owner' : r === 'Collaborator' ? 'Collab.' : r}</span>
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Full Name" name="name" placeholder="Rahul Sharma" required />
              <Field label="Phone" name="phone" placeholder="+91 98765 43210" required />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="rahul@example.com" required />
            <Field label="City" name="city" placeholder="Hyderabad" required />

            {form.role === 'Turf Owner' && (
              <div style={{ borderTop: `1px solid ${accent}18`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Turf Details</div>
                <Field label="Turf Name" name="turfName" placeholder="City Sports Arena" required />
                <Field label="Turf Location" name="location" placeholder="Banjara Hills, Hyderabad" required />
              </div>
            )}

            {form.role === 'Investor' && (
              <div style={{ borderTop: `1px solid ${accent}18`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Investment Interest (Optional)</div>
                <Field label="Tell us about your interest">
                  <textarea name="investmentInterest" value={form.investmentInterest} onChange={set}
                    placeholder="e.g., Early-stage sports tech investor looking for Seed/Series A opportunities in Tier 1 cities..."
                    rows={3} className="input-field" onFocus={() => setFocusedField('investmentInterest')} onBlur={() => setFocusedField(null)}
                    style={{ resize: 'none' }} />
                </Field>
              </div>
            )}

            {status === 'error' && (
              <div style={{ padding: '14px 16px', borderRadius: 8, background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.25)', fontFamily: 'Outfit', fontSize: '0.85rem', color: '#ff8888' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <button type="submit" disabled={status === 'loading'}
              style={{ marginTop: 8, padding: '16px 24px', background: accent, color: '#000', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.95rem', border: 'none', borderRadius: 8, cursor: status === 'loading' ? 'wait' : 'none', transition: 'all 0.2s', boxShadow: `0 0 28px ${accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? (
                <>
                  <svg style={{ animation: 'spin-slow 0.8s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  <div style={{ width: 18, height: 18 }}>
                    <meta.icon accent="#000" size={18} />
                  </div>
                  Register as {form.role}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="gridTemplateColumns: '1fr 1fr'"]{grid-template-columns:1fr!important} div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
