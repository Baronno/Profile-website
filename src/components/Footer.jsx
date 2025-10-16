import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-10 text-center text-sm text-gray-500">
      <div className="py-6">
        <div className="flex items-center justify-center gap-4 mb-3">
          <a className="pro-link" href="https://github.com/johndoe" target="_blank" rel="noreferrer">GitHub</a>
          <span>•</span>
          <a className="pro-link" href="https://linkedin.com/in/johndoe" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>•</span>
          <a className="pro-link" href="#contact">Contact</a>
        </div>
        <p>© {year} John Doe. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer


