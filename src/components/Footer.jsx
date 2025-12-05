import React from 'react'
import content from '../content.json'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-slate-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-700">
          <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-widest">Let's Connect</h3>
          <div className="flex items-center gap-6">
            <a className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium text-sm" href="https://www.linkedin.com/in/baron-z" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium text-sm" href="mailto:falconhui8@gmail.com">Email</a>
            <a className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium text-sm" href="#contact">Contact</a>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-400">© {year} {content.header.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer


