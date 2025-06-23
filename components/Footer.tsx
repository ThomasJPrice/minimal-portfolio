import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 max-w-xl mx-auto">

      <div className="flex sm:justify-start gap-4">
        <Link href="https://github.com/thomasjprice" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        <Link href="mailto:contact@thomasprice.me">
          Email
        </Link>
        <Link href="https://www.linkedin.com/in/thomas-price-2a48b4262/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
      </div>

      <p>
        Thomas Price © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer