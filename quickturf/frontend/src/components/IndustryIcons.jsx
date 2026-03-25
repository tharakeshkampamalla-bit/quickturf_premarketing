import React from 'react'

/* ── All icons are clean stroke SVGs — no circle shells. ── */

const Svg = ({ accent, size, children }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={accent}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

/* How It Works icons */
export function SearchIcon({ accent = '#4488ff', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <circle cx="11" cy="11" r="7"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </Svg>
  )
}

export function BookIcon({ accent = '#00ff87', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </Svg>
  )
}

export function PlayIcon({ accent = '#ffaa00', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </Svg>
  )
}

/* Audience tab icons */
export function PlayerIcon({ accent = '#00ff87', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </Svg>
  )
}

export function TurfIcon({ accent = '#4488ff', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </Svg>
  )
}

export function InvestorsIcon({ accent = '#ffaa00', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </Svg>
  )
}

export function TeamIcon({ accent = '#cc88ff', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </Svg>
  )
}

export function CheckmarkIcon({ accent = '#00ff87', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

/* Admin panel icons */
export function ImageIcon({ accent = '#4488ff', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </Svg>
  )
}

export function UsersIcon({ accent = '#ffaa00', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </Svg>
  )
}

export function FolderIcon({ accent = '#00ff87', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </Svg>
  )
}

export function LabelIcon({ accent = '#ffffff', size = 22 }) {
  return (
    <Svg accent={accent} size={size}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </Svg>
  )
}
