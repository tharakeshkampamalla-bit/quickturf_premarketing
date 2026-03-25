export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px' }}>
      <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '3rem', fontWeight: 700, marginBottom: 16, textAlign: 'center', color: 'rgba(240,240,240,0.95)' }}>
        Get in Touch
      </h1>
      <p style={{ fontFamily: 'Outfit', fontSize: '1.1rem', color: 'rgba(240,240,240,0.6)', textAlign: 'center', marginBottom: 60, maxWidth: 600, margin: '0 auto 60px' }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1000, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.8)', marginBottom: 8 }}>Name</label>
            <input type="text" placeholder="Your name" style={{ width: '100%', padding: '12px 16px', fontFamily: 'Outfit', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(240,240,240,0.9)' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.8)', marginBottom: 8 }}>Email</label>
            <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '12px 16px', fontFamily: 'Outfit', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(240,240,240,0.9)' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.8)', marginBottom: 8 }}>Subject</label>
            <input type="text" placeholder="How can we help?" style={{ width: '100%', padding: '12px 16px', fontFamily: 'Outfit', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(240,240,240,0.9)' }} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.8)', marginBottom: 8 }}>Message</label>
            <textarea placeholder="Your message here..." rows="6" style={{ width: '100%', padding: '12px 16px', fontFamily: 'Outfit', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(240,240,240,0.9)', resize: 'none' }} />
          </div>
          <button style={{ width: '100%', padding: '14px 24px', fontFamily: 'Outfit', fontSize: '1rem', fontWeight: 600, backgroundColor: 'var(--c-green)', color: 'var(--c-bg)', border: 'none', borderRadius: 8, cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = '0.8'}
            onMouseLeave={e => e.target.style.opacity = '1'}>
            Send Message
          </button>
        </form>

        <div>
          <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.3rem', fontWeight: 600, marginBottom: 32, color: 'var(--c-green)' }}>Other Ways to Reach Us</h2>
          {[
            { label: 'Email', value: 'solvifytechpvtltd@gmail.com' },
            { label: 'Phone', value: '+91 7013256858' },
            { label: 'Address', value: 'Nandyal, Andra Pradesh' },
            { label: 'Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM' }
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</p>
              <p style={{ fontFamily: 'Outfit', fontSize: '1rem', color: 'rgba(240,240,240,0.9)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
