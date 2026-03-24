import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { SearchIcon, BookIcon, PlayIcon, PlayerIcon, TurfIcon, InvestorsIcon, CheckmarkIcon } from '../components/IndustryIcons'

/* ── ICON COMPONENTS ────────────────────────────── */
// Shared icons are provided by IndustryIcons.jsx
const RunnerIcon = ({ accent }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="4" r="2"/><path d="M11 20L8 10m6 0l3 10M8 10l-2-3M14 10l2-3M9 18h6"/>
  </svg>
)
const StadiumIcon = ({ accent }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v7c0 1 1 2 2 2h12c1 0 2-1 2-2v-7M4 12h16M8 8l3-3 3 3M12 3v5M6 12v7M18 12v7M10 15h4"/>
  </svg>
)
const ChartIcon = ({ accent }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18M6 18v-6M10 18v-3M14 18v-8M18 18v-5"/><circle cx="6" cy="12" r="1" fill={accent}/><circle cx="10" cy="15" r="1" fill={accent}/><circle cx="14" cy="10" r="1" fill={accent}/><circle cx="18" cy="13" r="1" fill={accent}/>
  </svg>
)

/* ── INTERSECTION OBSERVER HOOK ─────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

/* ── ANIMATED COUNTER ──────────────────────────── */
function Counter({ end, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const [ref, inView] = useInView(0.3)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const t = setInterval(() => {
      start = Math.min(start + step, end)
      setVal(Math.floor(start))
      if (start >= end) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [inView])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ── PARTICLE CANVAS ─────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.45 + 0.08,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,135,${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,255,135,${0.05 * (1 - d / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
}

/* ── TICKER ──────────────────────────────────── */
function Ticker() {
  const items = ['Find Available Slots', 'Book Instantly', 'No Phone Calls', 'Real-Time Availability', 'Instant Confirmation', 'Play More, Wait Less', 'Multiple Sports', 'Turf Management', 'Secure Payments']
  const doubled = [...items, ...items]
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 0', background: 'rgba(0,255,135,0.025)', overflow: 'hidden' }}>
      <div className="animate-ticker" style={{ display: 'flex', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '0 32px', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(0,255,135,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--c-green)', display: 'inline-block' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── HERO ───────────────────────────────────── */
function Hero({ logo }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--c-bg)', paddingTop: 80 }}>
      <ParticleField />
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,135,0.065) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 88, left: 36, width: 64, height: 64, borderLeft: '1px solid rgba(0,255,135,0.18)', borderTop: '1px solid rgba(0,255,135,0.18)', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 88, right: 36, width: 64, height: 64, borderRight: '1px solid rgba(0,255,135,0.18)', borderBottom: '1px solid rgba(0,255,135,0.18)', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 88, right: 36, width: 32, height: 32, borderRight: '1px solid rgba(0,255,135,0.09)', borderTop: '1px solid rgba(0,255,135,0.09)', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 88, left: 36, width: 32, height: 32, borderLeft: '1px solid rgba(0,255,135,0.09)', borderBottom: '1px solid rgba(0,255,135,0.09)', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: 980, padding: '0 24px' }}>
        <div className={`animate-fade-in ${mounted ? '' : ''}`} style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', border: '1px solid rgba(0,255,135,0.2)', borderRadius: 4, background: 'rgba(0,255,135,0.04)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-green)', boxShadow: '0 0 10px var(--c-green)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.63rem', color: 'var(--c-green)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Pre-Launch &nbsp;·&nbsp; Accepting Registrations
            </span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(3.8rem, 10vw, 8.5rem)', lineHeight: 0.88, letterSpacing: '-0.04em', marginBottom: 36, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s' }}>
          <span style={{ display: 'block', color: 'var(--c-text)' }}>Find.</span>
          <span style={{ display: 'block', color: 'var(--c-green)', textShadow: '0 0 80px rgba(0,255,135,0.4)' }}>Book.</span>
          <span style={{ display: 'block', color: 'var(--c-text)' }}>Play.</span>
        </h1>

        <p style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'rgba(240,240,240,0.48)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 52px', letterSpacing: '0.01em', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.32s' }}>
          QuickTurf powered by Solvify Technologies is India's instant sports turf booking platform.
          Real-time slot visibility. Zero calls. One tap to play.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 76, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.48s' }}>
          <Link to="/join?role=Player" className="btn-primary" style={{ textDecoration: 'none' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            Join as Player
          </Link>
          <Link to="/join?role=Turf+Owner" className="btn-ghost" style={{ textDecoration: 'none' }}>List Your Turf</Link>
          <Link to="/join?role=Investor" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.88rem', color: 'rgba(0,255,135,0.65)', border: '1px solid rgba(0,255,135,0.18)', borderRadius: 6, transition: 'all 0.2s', letterSpacing: '0.01em' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,135,0.45)'; e.currentTarget.style.color = 'var(--c-green)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,135,0.18)'; e.currentTarget.style.color = 'rgba(0,255,135,0.65)' }}>
            Partner With Us ↗
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 44, opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.65s' }}>
          {[{ n: 10, s: '+', label: 'Turfs Ready' }, { n: 1000, s: ' ', label: 'Players Waiting' }, { n: 2, s: ' ', label: 'Cities' }].map((stat, i) => (
            <div key={i} style={{ flex: 1, maxWidth: 180, textAlign: 'center', padding: '0 28px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, background: 'linear-gradient(135deg,#fff 0%,var(--c-green) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <Counter end={stat.n} suffix={stat.s} />
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(240,240,240,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 7 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 3 }}>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(0,255,135,0.5), transparent)', animation: 'float 2.2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>scroll</span>
      </div>
    </section>
  )
}

/* ── PROBLEM ─────────────────────────────────── */
function Problem() {
  const [ref, inView] = useInView()
  const cards = [
    { icon: '📞', title: 'Endless Calls', body: 'Call one turf — busy. Call another — no answer. Waste 30 minutes before finding a free slot.', tag: 'TIME WASTED', tagColor: '#ff4444' },
    { icon: '🔭', title: 'Zero Visibility', body: 'There is no way to check what slots are available before calling. Every booking starts in the dark.', tag: 'NO TRANSPARENCY', tagColor: '#ff8844' },
    { icon: '💥', title: 'Double Bookings', body: 'Manual bookings cause miscommunications, slot overlaps, and disputes when groups show up together.', tag: 'POOR SYSTEM', tagColor: '#ffaa00' },
    { icon: '📉', title: 'Owner Revenue Loss', body: 'Turfs miss bookings because owners are unreachable. Every missed call is income permanently lost.', tag: 'BUSINESS PAIN', tagColor: '#ff6688' },
  ]
  return (
    <section style={{ padding: '120px 28px', background: 'var(--c-bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(200,30,30,0.035), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} style={{ marginBottom: 72, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>The Problem</div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--c-text)', maxWidth: 680 }}>
            Booking a turf shouldn't feel like<br />
            <span style={{ color: '#ff4444' }}>pulling teeth</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          {cards.map((c, i) => (
            <div key={i} className="glow-card"
              style={{ padding: '44px 32px', background: 'rgba(255,255,255,0.02)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.08}s` }}
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`) }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: c.tagColor, letterSpacing: '0.12em', border: `1px solid ${c.tagColor}30`, padding: '3px 8px', borderRadius: 3, display: 'inline-block', marginBottom: 28 }}>{c.tag}</span>
                <div style={{ fontSize: '2.4rem', marginBottom: 18 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.15rem', color: 'var(--c-text)', marginBottom: 12, letterSpacing: '-0.01em' }}>{c.title}</h3>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,240,240,0.42)', lineHeight: 1.72 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){div[style*="repeat(4,1fr)"]{grid-template-columns:1fr 1fr!important}}`}</style>
      <style>{`@media(max-width:550px){div[style*="repeat(4,1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

/* ── SOLUTION ────────────────────────────────── */
function Solution() {
  const [ref, inView] = useInView()
  return (
    <section style={{ padding: '120px 28px', background: 'var(--c-surface)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }} className="dot-grid" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.3), transparent)' }} />
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-32px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>The Solution</div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--c-text)', marginBottom: 24 }}>
            QuickTurf makes it<br />
            <span style={{ color: 'var(--c-green)', textShadow: '0 0 40px rgba(0,255,135,0.3)' }}>instant & effortless</span>
          </h2>
          <p style={{ fontFamily: 'Outfit', fontSize: '1rem', color: 'rgba(240,240,240,0.48)', lineHeight: 1.78, marginBottom: 40 }}>
            A real-time platform giving players complete slot visibility and turf owners a fully automated booking system. No calls. No spreadsheets. No chaos.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 44 }}>
            {['Real-time slot availability across all turfs', 'Book & pay securely in under 60 seconds', 'Instant confirmation via SMS & email', 'Owners manage everything in one dashboard', 'Smart analytics, calendar & no-show protection'].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'rgba(0,255,135,0.1)', border: '1px solid rgba(0,255,135,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckmarkIcon accent='#00ff87' size={14} />
                </div>
                <span style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,240,240,0.62)' }}>{item}</span>
              </li>
            ))}
          </ul>
          <Link to="/join" className="btn-primary" style={{ textDecoration: 'none' }}>
            Start for Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* App UI mockup */}
        <div style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}>
          <div style={{ background: 'rgba(8,8,8,0.92)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--glow-green)' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {['#ff5f56','#ffbd2e','#27c93f'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)', marginLeft: 12, letterSpacing: '0.07em' }}>quickturf.in/book</span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <span style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(255,255,255,0.28)' }}>Banjara Hills, Hyderabad</span>
                <div style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--c-green)', background: 'rgba(0,255,135,0.1)', padding: '3px 8px', borderRadius: 4 }}>TODAY</div>
              </div>
              {[{ name: 'City Sports Arena', sport: 'Football · 5v5', price: '₹600/hr', rating: 4.8 }, { name: 'ProTurf Madhapur', sport: 'Cricket · Box', price: '₹800/hr', rating: 4.6 }].map((t, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '16px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.88rem', color: 'var(--c-text)', marginBottom: 3 }}>{t.name}</div>
                      <div style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'rgba(255,255,255,0.32)' }}>{t.sport}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.88rem', color: 'var(--c-green)' }}>{t.price}</div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)' }}>⭐ {t.rating}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {['6am','7am','8am','9am','10am','11am','12pm'].map((slot, j) => (
                      <div key={slot} style={{ padding: '5px 9px', borderRadius: 5, fontFamily: 'JetBrains Mono', fontSize: '0.62rem', background: j === 2 ? 'var(--c-green)' : [1,4].includes(j) ? 'rgba(255,68,68,0.1)' : 'rgba(255,255,255,0.05)', color: j === 2 ? '#000' : [1,4].includes(j) ? '#ff6666' : 'rgba(255,255,255,0.4)', border: j === 2 ? 'none' : `1px solid ${[1,4].includes(j) ? 'rgba(255,68,68,0.18)' : 'rgba(255,255,255,0.07)'}`, fontWeight: j === 2 ? 700 : 400 }}>{slot}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ background: 'rgba(0,255,135,0.07)', border: '1px solid rgba(0,255,135,0.22)', borderRadius: 8, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,255,135,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.82rem', color: 'var(--c-green)' }}>Booking Confirmed — 8:00 AM ✓</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>City Sports Arena · Ref #QT-0042</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
    </section>
  )
}

/* ── HOW IT WORKS ────────────────────────────── */
function HowItWorks() {
  const [ref, inView] = useInView()
  const steps = [
    { n: '01', title: 'Find', icon: SearchIcon, desc: 'Browse verified turfs near you. Filter by sport, price, and location. See live availability with real-time sync across all venues.', accent: '#4488ff' },
    { n: '02', title: 'Book', icon: BookIcon, desc: 'Select your slot, pay securely, and receive confirmation in under 60 seconds. No calls, no back-and-forth, no waiting.', accent: '#00ff87' },
    { n: '03', title: 'Play', icon: PlayIcon, desc: 'Arrive, scan your QR code at the gate, and start playing. Your slot is locked. Zero disputes, zero surprises.', accent: '#ffaa00' },
  ]
  return (
    <section id="how-it-works" style={{ padding: '120px 28px', background: 'var(--c-bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0 }} className="line-grid" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>How It Works</div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', letterSpacing: '-0.03em', color: 'var(--c-text)' }}>Three steps to the field</h2>
        </div>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 40, left: '17%', right: '17%', height: 1, background: 'linear-gradient(90deg, #4488ff60, #00ff8760, #ffaa0060)', zIndex: 1 }} />
          {steps.map((s, i) => (
            <div key={i} className="glow-card"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : 0, borderLeft: i > 0 ? 'none' : undefined, padding: '52px 36px', position: 'relative', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.15}s` }}
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`) }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: `${s.accent}15`, border: `1px solid ${s.accent}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, position: 'relative', zIndex: 2 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: s.accent, fontWeight: 700 }}>{s.n}</span>
                <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1px solid ${s.accent}20`, animation: `pulse-ring 2.5s ease-out ${i * 0.5}s infinite` }} />
              </div>
              <div style={{ marginBottom: 16, position: 'relative', zIndex: 2 }}>
                <s.icon accent={s.accent} />
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '2.2rem', letterSpacing: '-0.035em', color: s.accent, marginBottom: 16, position: 'relative', zIndex: 2 }}>{s.title}</h3>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,240,240,0.42)', lineHeight: 1.75, position: 'relative', zIndex: 2 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important} div[style*="17%"]{display:none}}`}</style>
    </section>
  )
}

/* ── AUDIENCES ───────────────────────────────── */
function Audiences() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const items = [
    { role: 'Players', icon: PlayerIcon, headline: 'Stop calling.\nStart playing.', body: 'QuickTurf gives you full visibility into turf availability. Browse, select, and book from your phone in seconds.', features: ['Browse turfs by sport & location', 'Live slot availability 24/7', 'Book & pay in under 60 seconds', 'Instant digital confirmation', 'All your bookings in one place'], cta: 'Join as Player', to: '/join?role=Player', accent: '#00ff87' },
    { role: 'Turf Owners', icon: TurfIcon, headline: 'Fill every slot.\nEffortlessly.', body: 'List your turf once and let QuickTurf handle the rest. Automated bookings, instant payments, zero admin overhead.', features: ['List your turf in minutes', 'Automated booking calendar', 'Instant payout on booking', 'No-show protection built-in', 'Analytics & revenue dashboard'], cta: 'List Your Turf', to: '/join?role=Turf+Owner', accent: '#4488ff' },
    { role: 'Investors', icon: InvestorsIcon, headline: "A massive market,\ntotally untapped.", body: "India's sports infrastructure is enormous but almost entirely offline. QuickTurf is the digital layer that changes everything.", features: ['50,000+ turfs across India', 'Under 5% currently digitised', '₹8,000 Cr+ annual market', 'Pre-launch traction & waitlist', 'SaaS + marketplace revenue model'], cta: 'Partner With Us', to: '/join?role=Investor', accent: '#ffaa00' },
  ]
  const a = items[active]
  return (
    <section id="audiences" ref={ref} style={{ padding: '120px 28px', background: 'var(--c-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>Who It's For</div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,4.5rem)', letterSpacing: '-0.03em', color: 'var(--c-text)' }}>Built for everyone in the game</h2>
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            {items.map((item, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ flex: 1, padding: '18px 24px', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.88rem', background: active === i ? 'rgba(255,255,255,0.04)' : 'transparent', color: active === i ? item.accent : 'rgba(240,240,240,0.38)', border: 'none', borderBottom: active === i ? `2px solid ${item.accent}` : '2px solid transparent', marginBottom: -1, cursor: 'none', transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', letterSpacing: '0.01em' }}>
                <item.icon accent={active === i ? item.accent : 'rgba(240,240,240,0.38)'} /><span>{item.role}</span>
              </button>
            ))}
          </div>
          <div key={active} className="animate-fade-in" style={{ padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: 24, width: 48, height: 48 }}>
                <a.icon accent={a.accent} />
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.03em', color: 'var(--c-text)', lineHeight: 1.05, marginBottom: 20, whiteSpace: 'pre-line' }}>{a.headline}</h3>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.95rem', color: 'rgba(240,240,240,0.44)', lineHeight: 1.75, marginBottom: 36 }}>{a.body}</p>
              <Link to={a.to} className="btn-primary" style={{ textDecoration: 'none', background: a.accent, boxShadow: `0 0 24px ${a.accent}35` }}>{a.cta}</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.accent}28`; e.currentTarget.style.background = `${a.accent}07` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: a.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Outfit', fontSize: '0.87rem', color: 'rgba(240,240,240,0.6)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important} div[style*="padding: 56px"]{padding:32px!important}}`}</style>
    </section>
  )
}

/* ── PARTNERS ────────────────────────────────── */
function Partners({ logos }) {
  const names = ['Sports Arena', 'PlayZone Pro', 'TurfMaster', 'AthletiX', 'SportsPlex', 'GameGround', 'ProTurf', 'FieldFirst', 'Urban Turf', 'Elite Grounds', 'SportSync', 'TurfHub', 'PlayField', 'ArenaMax', 'TurfZone']
  const defaultLogos = [
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="12" font-family="Arial">SA</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="36" height="36" rx="8" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">PPP</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="20,2 38,20 20,38 2,20" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">TM</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="20" rx="18" ry="12" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">AX</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">SP</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="36" height="36" rx="4" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">GG</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="20,2 38,20 20,38 2,20" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">PT</text></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="20" rx="18" ry="12" fill="#00ff87" stroke="#000" stroke-width="2"/><text x="20" y="25" text-anchor="middle" fill="#000" font-size="10" font-family="Arial">FF</text></svg>`
  ]
  return (
    <>
      <Ticker />
      <section style={{ padding: '100px 28px', background: 'var(--c-surface)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32 }}>Partners & Early Supporters</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {logos.length > 0 ? logos.map((l, i) => (
              <img key={i} src={l.imageUrl} alt="Partner" style={{ height: 40, objectFit: 'contain', opacity: 0.35, filter: 'grayscale(100%)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.filter = 'none' }}
                onMouseLeave={e => { e.target.style.opacity = 0.35; e.target.style.filter = 'grayscale(100%)' }} />
            )) : defaultLogos.map((svg, i) => (
              <div key={i} style={{ height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, opacity: 0.35, filter: 'grayscale(100%)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = 'none' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = 0.35; e.currentTarget.style.filter = 'grayscale(100%)' }}
                dangerouslySetInnerHTML={{ __html: svg }} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── FINAL CTA ───────────────────────────────── */
function FinalCTA() {
  const [ref, inView] = useInView()
  return (
    <section style={{ padding: '140px 28px', background: 'var(--c-bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }} className="hex-grid" />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,135,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 520, height: 520, borderRadius: '50%', border: '1px solid rgba(0,255,135,0.06)', animation: 'spin-slow 22s linear infinite' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(60deg)', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(0,255,135,0.04)', animation: 'spin-slow 16s linear infinite reverse' }} />
      <div ref={ref} style={{ position: 'relative', zIndex: 2, maxWidth: 680, margin: '0 auto', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
        <div className="tag" style={{ display: 'inline-flex', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-green)' }} />
          Free for Early Members
        </div>
        <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 'clamp(3rem,7vw,6rem)', letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--c-text)', marginBottom: 28 }}>
          Ready to play?<br />
          <span style={{ color: 'var(--c-green)', textShadow: '0 0 80px rgba(0,255,135,0.5)' }}>Join QuickTurf.</span>
        </h2>
        <p style={{ fontFamily: 'Outfit', fontSize: '1.05rem', color: 'rgba(240,240,240,0.44)', lineHeight: 1.75, marginBottom: 52 }}>
          Be among the first 1,000 members. Early access is completely free — and stays free for founding members at launch.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          <Link to="/join" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '16px 36px', boxShadow: 'var(--glow-green)' }}>
            Get Early Access — Free
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/join?role=Turf+Owner" className="btn-ghost" style={{ textDecoration: 'none', fontSize: '1rem', padding: '15px 32px' }}>List Your Turf</Link>
        </div>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em' }}>NO CREDIT CARD &nbsp;·&nbsp; NO SPAM &nbsp;·&nbsp; CANCEL ANYTIME</p>
      </div>
    </section>
  )
}

/* ── HOME ────────────────────────────────────── */
export default function Home() {
  const [logo, setLogo] = useState(null)
  const [partnerLogos, setPartnerLogos] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [p, l] = await Promise.all([
          axios.get('/api/images?type=partner'),
          axios.get('/api/images?type=logo'),
        ])
        setPartnerLogos(p.data.data || [])
        if (l.data.data?.[0]) setLogo(l.data.data[0].imageUrl)
      } catch {}
    }
    load()
  }, [])

  return (
    <main>
      <Hero logo={logo} />
      <Problem />
      <Solution />
      <HowItWorks />
      <Audiences />
      <Partners logos={partnerLogos} />
      <FinalCTA />
    </main>
  )
}
