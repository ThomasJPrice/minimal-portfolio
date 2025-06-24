'use client'

import { useState, useCallback, useEffect } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

// Global state to track the current sequence
let globalSequence: string[] = []
let sequenceListeners: ((sequence: string[]) => void)[] = []
let sequenceTimeout: NodeJS.Timeout | null = null

const addSequenceListener = (listener: (sequence: string[]) => void) => {
  sequenceListeners.push(listener)
  return () => {
    sequenceListeners = sequenceListeners.filter(l => l !== listener)
  }
}

const updateGlobalSequence = (newKey: string) => {
  // Clear existing timeout
  if (sequenceTimeout) {
    clearTimeout(sequenceTimeout)
  }
  
  globalSequence = [...globalSequence, newKey].slice(-KONAMI_CODE.length)
  sequenceListeners.forEach(listener => listener(globalSequence))
  
  // Reset sequence after 2 seconds of inactivity
  sequenceTimeout = setTimeout(() => {
    resetGlobalSequence()
  }, 2000)
  
  return globalSequence
}

const resetGlobalSequence = () => {
  if (sequenceTimeout) {
    clearTimeout(sequenceTimeout)
    sequenceTimeout = null
  }
  globalSequence = []
  sequenceListeners.forEach(listener => listener(globalSequence))
}

export const useKonamiSequence = () => {
  const [sequence, setSequence] = useState<string[]>(globalSequence)

  const addKeyToSequence = useCallback((key: string) => {
    const newSequence = updateGlobalSequence(key)
    return newSequence
  }, [])

  const resetSequence = useCallback(() => {
    resetGlobalSequence()
  }, [])

  const isKonamiSequence = useCallback((seq: string[] = sequence) => {
    if (seq.length < KONAMI_CODE.length) return false
    return seq.every((key, index) => key === KONAMI_CODE[index])
  }, [sequence])
  const isPartialKonamiMatch = useCallback((seq: string[] = sequence) => {
    if (seq.length === 0) return false
    // Check if the current sequence could be the beginning of the Konami code
    return KONAMI_CODE.slice(0, seq.length).every((key, index) => key === seq[index])
  }, [sequence])

  const wouldBePartialMatch = useCallback((newKey: string, seq: string[] = sequence) => {
    const testSequence = [...seq, newKey].slice(-KONAMI_CODE.length)
    if (testSequence.length === 0) return false
    return KONAMI_CODE.slice(0, testSequence.length).every((key, index) => key === testSequence[index])
  }, [sequence])
  // Subscribe to global sequence changes
  useEffect(() => {
    const unsubscribe = addSequenceListener(setSequence)
    return unsubscribe
  }, [])
  return {
    sequence,
    addKeyToSequence,
    resetSequence,
    isKonamiSequence,
    isPartialKonamiMatch,
    wouldBePartialMatch,
    KONAMI_CODE
  }
}
