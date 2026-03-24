import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/quickturf-logo.jpg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'For Players',  href: '/#audiences' },
    { label: 'For Owners',   href: '/#audiences' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 120 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img 
            src={logoImage} 
            alt="QuickTurf Logo" 
            style={{
              height: 150,
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer'
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              padding: '7px 14px', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.85rem',
              color: 'rgba(240,240,240,0.5)', textDecoration: 'none', borderRadius: 5,
              transition: 'all 0.2s ease', letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--c-text)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(240,240,240,0.5)'; e.target.style.background = 'transparent' }}
            >{l.label}</a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="hidden-mobile">
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(0,255,135,0.7)', letterSpacing: '0.12em', padding: '4px 10px', border: '1px solid rgba(0,255,135,0.2)', borderRadius: 3 }}>
            EARLY ACCESS
          </div>
          <Link to="/join" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '9px 20px' }}>
            Get Started
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'none', padding: 8, display: 'none' }} className="show-mobile">
          <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'var(--c-text)', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none', transition: 'all 0.3s' }}/>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'var(--c-text)', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }}/>
            <span style={{ display: 'block', height: 1.5, background: menuOpen ? 'var(--c-green)' : 'var(--c-text)', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none', transition: 'all 0.3s' }}/>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(8,8,8,0.98)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 28px 28px' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 0', fontFamily: 'Outfit', fontWeight: 500,
              fontSize: '0.95rem', color: 'rgba(240,240,240,0.6)', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{l.label}</a>
          ))}
          <Link to="/join" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textDecoration: 'none', marginTop: 20, width: '100%', justifyContent: 'center' }}>
            Get Early Access
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
