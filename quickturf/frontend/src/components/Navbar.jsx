import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/quickturf-logo.png'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const links = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'For Players',  href: '/join?role=Player' },
    { label: 'For Owners',   href: '/join?role=Turf+Owner' },
  ]

  const NavLink = ({ label, href }) => {
    const isActive = href.startsWith('/join') && pathname === '/join'
    return (
      <a href={href} style={{
        padding: '7px 14px',
        fontFamily: 'Outfit',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: isActive ? 'var(--c-text)' : 'rgba(240,240,240,0.48)',
        textDecoration: 'none',
        borderRadius: 6,
        transition: 'color 0.18s ease, background 0.18s ease',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--c-text)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.055)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = isActive ? 'var(--c-text)' : 'rgba(240,240,240,0.48)'
        e.currentTarget.style.background = 'transparent'
      }}
      >
        {label}
      </a>
    )
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src={logoImage}
            alt="QuickTurf"
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop nav — centred links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="hidden-mobile">
          {links.map(l => <NavLink key={l.label} {...l} />)}
        </nav>

        {/* Desktop right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }} className="hidden-mobile">
          {/* Early access badge */}
          <span style={{
            fontFamily: 'JetBrains Mono', fontSize: '0.58rem',
            color: 'rgba(0,255,135,0.65)', letterSpacing: '0.14em',
            padding: '4px 10px',
            border: '1px solid rgba(0,255,135,0.18)',
            borderRadius: 4,
          }}>
            EARLY ACCESS
          </span>

          {/* Divider */}
          <span style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)', display: 'inline-block', margin: '0 4px' }} />

          {/* CTA */}
          <Link to="/join" style={{
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 18px',
            background: 'var(--c-green)',
            color: '#000',
            fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.82rem',
            borderRadius: 6,
            border: 'none',
            letterSpacing: '0.01em',
            boxShadow: '0 0 20px rgba(0,255,135,0.25)',
            transition: 'opacity 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,255,135,0.38)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,135,0.25)' }}
          >
            Get Started
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          className="show-mobile"
        >
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'rgba(240,240,240,0.8)', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none', transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)' }}/>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'rgba(240,240,240,0.8)', borderRadius: 2, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none', transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)' }}/>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'rgba(240,240,240,0.8)', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none', transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)' }}/>
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div style={{
        overflow: 'hidden',
        maxHeight: menuOpen ? 400 : 0,
        transition: 'max-height 0.32s cubic-bezier(0.4,0,0.2,1)',
        background: 'rgba(8,8,8,0.97)',
        borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>
        <div style={{ padding: '16px 28px 28px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '11px 12px',
              fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.95rem',
              color: 'rgba(240,240,240,0.55)', textDecoration: 'none',
              borderRadius: 6, transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,240,240,0.55)'; e.currentTarget.style.background = 'transparent' }}
            >{l.label}</a>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />
          <Link to="/join" onClick={() => setMenuOpen(false)} style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px 20px', background: 'var(--c-green)', color: '#000',
            fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.9rem', borderRadius: 8,
            boxShadow: '0 0 20px rgba(0,255,135,0.2)',
          }}>
            Get Early Access
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        nav[style*="translateX(-50%)"] { position: absolute; }
      `}</style>
    </header>
  )
}
