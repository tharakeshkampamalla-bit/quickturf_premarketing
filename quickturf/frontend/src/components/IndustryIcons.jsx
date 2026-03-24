import React from 'react'

function IconShell({ accent, size = 40, children }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `rgba(255,255,255,0.06)`,
      border: `1px solid ${accent || 'rgba(255,255,255,0.2)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 4px 20px rgba(0,0,0,0.15)`,
      color: accent || '#00ff87'
    }}>
      {children}
    </div>
  )
}

const IconStroke = ({ d, accent = '#00ff87' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
)

export function SearchIcon({ accent = '#4488ff', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    </IconShell>
  )
}

export function BookIcon({ accent = '#00ff87', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2Z"/>
        <path d="M7 4v16M12 4v16M17 4v16"/>
      </svg>
    </IconShell>
  )
}

export function PlayIcon({ accent = '#ffaa00', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 5v14l11-7L8 5Z"/>
      </svg>
    </IconShell>
  )
}

export function PlayerIcon({ accent = '#00ff87', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="3"/>
        <path d="M6 20c0-3 2.5-5 6-5s6 2 6 5"/>
        <path d="M6 11l4 2 4-2"/>
      </svg>
    </IconShell>
  )
}

export function TurfIcon({ accent = '#4488ff', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="12" rx="2"/>
        <path d="M6 8V5h12v3"/>
      </svg>
    </IconShell>
  )
}

export function InvestorsIcon({ accent = '#ffaa00', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18h16M4 14h10M4 10h7M4 6h4"/>
        <circle cx="18" cy="6" r="2"/>
      </svg>
    </IconShell>
  )
}

export function TeamIcon({ accent = '#ffffff', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3"/>
        <path d="M6 20v-1a4 4 0 0 1 8 0v1"/>
        <path d="M2 15a4 4 0 0 1 8 0"/>
      </svg>
    </IconShell>
  )
}

export function CheckmarkIcon({ accent = '#00ff87', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  )
}

export function ImageIcon({ accent = '#4488ff', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    </IconShell>
  )
}

export function UsersIcon({ accent = '#ffaa00', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </IconShell>
  )
}

export function FolderIcon({ accent = '#00ff87', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
      </svg>
    </IconShell>
  )
}

export function LabelIcon({ accent = '#ffffff', size = 44 }) {
  return (
    <IconShell accent={accent} size={size}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
        <path d="M7 7h.01"/>
      </svg>
    </IconShell>
  )
}
