'use client'

import { useEffect, useState, useCallback } from 'react'
import { useKeyboardManager } from '@/lib/useKeyboardManager'

export default function KonamiMatrix() {
  const [isMatrixMode, setIsMatrixMode] = useState(false)

  const toggleMatrixMode = useCallback(() => {
    const newMatrixMode = !isMatrixMode
    setIsMatrixMode(newMatrixMode)
    
    // Toggle the matrix theme class on the html element
    if (newMatrixMode) {
      document.documentElement.classList.add('matrix-theme')
      // Change font to matrix style
      document.body.style.fontFamily = 'Courier New, monospace'
      document.body.style.textTransform = 'uppercase'
      
      // Show matrix rain effect
      createMatrixRain()
    } else {
      document.documentElement.classList.remove('matrix-theme')
      // Restore original font
      document.body.style.fontFamily = ''
      document.body.style.textTransform = 'lowercase'
      
      // Remove matrix rain effect
      removeMatrixRain()
    }
  }, [isMatrixMode])

  const { sequence } = useKeyboardManager({ 
    onKonamiComplete: toggleMatrixMode 
  })

  const createMatrixRain = () => {
    // Remove existing matrix canvas if any
    removeMatrixRain()
    
    const canvas = document.createElement('canvas')
    canvas.id = 'matrix-rain'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '-1'
    canvas.style.opacity = '0.1'
    
    document.body.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
    const fontSize = 10
    const columns = canvas.width / fontSize
    
    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff00'
      ctx.font = fontSize + 'px monospace'
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 35)
    
    // Store the interval ID on the canvas element for cleanup
    ;(canvas as any).matrixInterval = interval
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    ;(canvas as any).resizeHandler = handleResize
  }

  const removeMatrixRain = () => {
    const canvas = document.getElementById('matrix-rain')
    if (canvas) {
      // Clear the interval
      const interval = (canvas as any).matrixInterval
      if (interval) clearInterval(interval)
      
      // Remove resize handler
      const resizeHandler = (canvas as any).resizeHandler
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      
      // Remove canvas
      canvas.remove()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeMatrixRain()
    }
  }, [])

  return null
}
