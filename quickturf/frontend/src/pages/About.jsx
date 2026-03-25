export default function About() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px' }}>
      <div style={{ marginBottom: 60 }}>
        <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '3rem', fontWeight: 700, marginBottom: 24, color: 'rgba(240,240,240,0.95)' }}>
          About Quick Turf
        </h1>
        <p style={{ fontFamily: 'Outfit', fontSize: '1.1rem', color: 'rgba(240,240,240,0.6)', lineHeight: 1.8, maxWidth: 700 }}>
          Quick Turf is revolutionizing how people book sports turf slots. We make it simple, fast, and hassle-free to find and reserve your perfect playing ground.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 80 }}>
        <div>
          <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.3rem', fontWeight: 600, marginBottom: 16, color: 'var(--c-green)' }}>Our Mission</h2>
          <p style={{ fontFamily: 'Outfit', fontSize: '0.95rem', color: 'rgba(240,240,240,0.5)', lineHeight: 1.8 }}>
            To eliminate the friction in booking sports turfs. We believe everyone should have instant access to quality playing surfaces without endless phone calls or confusion.
          </p>
        </div>
        <div>
          <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.3rem', fontWeight: 600, marginBottom: 16, color: 'var(--c-green)' }}>Our Vision</h2>
          <p style={{ fontFamily: 'Outfit', fontSize: '0.95rem', color: 'rgba(240,240,240,0.5)', lineHeight: 1.8 }}>
            To become the go-to platform for sports venue management and booking across the region, connecting players with premium facilities in seconds.
          </p>
        </div>
      </div>

      <div>
        <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.3rem', fontWeight: 600, marginBottom: 24, color: 'var(--c-green)' }}>Why Quick Turf?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { title: 'Instant Booking', desc: 'Reserve your slot in seconds, not hours' },
            { title: 'Real-time Availability', desc: 'See live slot availability across all turfs' },
            { title: 'No Hidden Charges', desc: 'Transparent pricing with zero surprise fees' },
            { title: 'Quality Assurance', desc: 'Only verified and premium turf facilities' }
          ].map(item => (
            <div key={item.title} style={{ padding: 24, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: 'rgba(240,240,240,0.9)' }}>{item.title}</h3>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.5)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
