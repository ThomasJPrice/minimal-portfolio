'use client'

export const NavLinks = [
  { href: '/lab', label: 'Lab', key: 'l' },
  { href: '/now', label: 'Now', key: 'n' },
  { href: '/vault', label: 'Vault', key: 'v' },
  { href: '/blog', label: 'Blog', key: 'b' },
  { href: '/', label: 'Home', key: 'h' },
  { href: '/cv', label: 'cv', key: 'c' },
]

export default function KeyboardNav() {
  // All keyboard handling is now done in KonamiMatrix via useKeyboardManager
  return null
}
