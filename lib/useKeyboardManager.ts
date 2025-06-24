'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useKonamiSequence } from './useKonamiSequence'

const NavLinks = [
  { href: '/lab', label: 'Lab', key: 'l' },
  { href: '/now', label: 'Now', key: 'n' },
  { href: '/vault', label: 'Vault', key: 'v' },
  { href: '/blog', label: 'Blog', key: 'b' },
  { href: '/', label: 'Home', key: 'h' },
  { href: '/cv', label: 'cv', key: 'c' },
]

interface KeyboardManagerProps {
  onKonamiComplete: () => void
}

export const useKeyboardManager = ({ onKonamiComplete }: KeyboardManagerProps) => {
  const router = useRouter()
  const { 
    sequence, 
    addKeyToSequence, 
    resetSequence, 
    isKonamiSequence,
    isPartialKonamiMatch,
    KONAMI_CODE 
  } = useKonamiSequence()
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey || e.ctrlKey || e.altKey
      ) return

      // Update the sequence
      const newSequence = addKeyToSequence(e.code)
      console.log('Key pressed:', e.code, 'New sequence:', newSequence)
      
      // Check if the sequence matches the Konami code
      if (newSequence.length === KONAMI_CODE.length && isKonamiSequence(newSequence)) {
        console.log('Konami code completed!')
        onKonamiComplete()
        resetSequence()
        return // Don't do navigation when Konami is triggered
      }

      // Check if this is part of a potential Konami sequence
      if (isPartialKonamiMatch(newSequence)) {
        console.log('Partial Konami match, blocking navigation')
        return // Don't navigate if we're potentially in a Konami sequence
      }

      // If not part of Konami sequence, check for navigation
      const match = NavLinks.find(link => link.key === e.key.toLowerCase())
      if (match) {
        console.log('Navigating to:', match.href)
        router.push(match.href)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [router, addKeyToSequence, resetSequence, isKonamiSequence, isPartialKonamiMatch, KONAMI_CODE, onKonamiComplete])

  return { sequence }
}
