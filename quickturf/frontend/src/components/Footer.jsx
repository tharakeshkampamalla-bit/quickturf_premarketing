import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-bg)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 28px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--c-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--c-text)' }}>
                Quick<span style={{ color: 'var(--c-green)' }}>Turf</span>
              </span>
            </div>
            <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,240,240,0.38)', lineHeight: 1.75, maxWidth: 260 }}>
              Find available sports turf slots and book instantly. No calls. No confusion. Just play.
            </p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.2)', letterSpacing: '0.08em', marginTop: 16 }}>
              A PRODUCT BY SOLVIFY TECHNOLOGIES PVT. LTD.
            </p>
          </div>
          {[
            { title: 'Platform', links: ['Find Turfs', 'Book Slots', 'List Your Turf', 'Pricing'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Refund Policy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none' }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(240,240,240,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'rgba(240,240,240,0.75)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(240,240,240,0.35)'}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.2)', letterSpacing: '0.08em' }}>© 2024 SOLVIFY TECHNOLOGIES PVT. LTD. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,240,240,0.2)', letterSpacing: '0.08em' }}>
            BUILT FOR THE LOVE OF SPORT <span style={{ color: 'var(--c-green)', marginLeft: 4 }}>⚽</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){footer>div>div[style*="2fr 1fr"]{grid-template-columns:1fr 1fr!important}} @media(max-width:560px){footer>div>div[style*="2fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}
