'use client'
import { useEffect } from 'react'

export function IncrementViews() {
  useEffect(() => {
    fetch('/api/increment-views', { method: 'POST' })
  }, [])

  return null
}