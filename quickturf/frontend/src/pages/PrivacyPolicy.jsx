export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px' }}>
      <h1 style={{ fontFamily: 'JetBrains Mono', fontSize: '2.5rem', fontWeight: 700, marginBottom: 12, color: 'rgba(240,240,240,0.95)' }}>
        Privacy Policy
      </h1>
      <p style={{ fontFamily: 'Outfit', fontSize: '0.9rem', color: 'rgba(240,240,240,0.5)', marginBottom: 48 }}>
        Last updated: March 2026
      </p>

      <div style={{ lineHeight: 1.8 }}>
        {[
          {
            title: '1. Introduction',
            content: 'Quick Turf ("we", "our", or "us") operates the Quick Turf website and mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.'
          },
          {
            title: '2. Information Collection and Use',
            content: 'We collect several different types of information for various purposes to provide and improve our Service to you.\n\nTypes of Data Collected: Personal Data may include but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, Postal code, City, Cookies and Usage Data'
          },
          {
            title: '3. Usage Data',
            content: 'When you access the Service by or through a mobile device, we may collect certain information automatically, including but not limited to the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, and information about the way you use the Application.'
          },
          {
            title: '4. Cookies',
            content: 'Cookies are files with a small amount of data that is commonly used as an anonymous unique identifier. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.'
          },
          {
            title: '5. Security of Data',
            content: 'The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.'
          },
          {
            title: '6. Contact Us',
            content: 'If you have any questions about this Privacy Policy, please contact us by visiting our contact page or sending an email to privacy@quickturf.com'
          }
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '1.2rem', fontWeight: 600, marginBottom: 12, color: 'var(--c-green)' }}>
              {section.title}
            </h2>
            <p style={{ fontFamily: 'Outfit', fontSize: '0.95rem', color: 'rgba(240,240,240,0.5)', whiteSpace: 'pre-line' }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
