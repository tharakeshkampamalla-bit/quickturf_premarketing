import { Link } from 'react-router-dom'
import logoImage from '../assets/quickturf-logo.png'
import solvifyLogo from '../assets/Solvify logo.png'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-bg)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 28px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56, flexWrap: 'wrap' }}>
          <div>
            <img src={logoImage} alt="QuickTurf" style={{ height: 36, width: 'auto', objectFit: 'contain', marginBottom: 16 }} />
            <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,240,240,0.38)', lineHeight: 1.75, maxWidth: 260, marginBottom: 32 }}>
              Find available sports turf slots and book instantly. No calls. No confusion. Just play.
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,240,240,0.6)', lineHeight: 1.6, marginBottom: 12 }}>
                Quick Turf is a product by
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '16px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.15)' }}>
                <img src={solvifyLogo} alt="Solvify Technologies" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
          {[
            { title: 'Company', links: [
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/join' },
              { label: 'Email', href: 'mailto:solvifytechpvtltd@gmail.com' }
            ]},
            { title: 'Legal', links: [
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use', href: '/terms' }
            ]},
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.href} style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(240,240,240,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'rgba(240,240,240,0.75)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(240,240,240,0.35)'}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.2)', letterSpacing: '0.08em' }}>© 2025 SOLVIFY TECHNOLOGIES PVT. LTD. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.2)', letterSpacing: '0.08em' }}>
            BUILT FOR THE LOVE OF SPORT <span style={{ color: 'var(--c-green)', marginLeft: 4 }}>⚽</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){footer>div>div[style*="2fr 1fr"]{grid-template-columns:1fr 1fr!important}} @media(max-width:560px){footer>div>div[style*="2fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}
