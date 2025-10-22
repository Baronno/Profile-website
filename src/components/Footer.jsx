import React from 'react'
import content from '../content.json'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-10 text-center text-sm text-gray-500">
      <div className="py-6">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a className="pro-link" href="https://www.linkedin.com/in/baron-z" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>•</span>
          <a className="pro-link" href="mailto:falconhui8@gmail.com">Email</a>
          <span>•</span>
          <a className="pro-link" href="#contact">Contact</a>
        </div>
        <p>© {year} {content.header.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer


