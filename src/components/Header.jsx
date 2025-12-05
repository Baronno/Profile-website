import React from 'react'
import content from '../content.json'
import { getAvatarSrc } from '../utils/avatar'
import personalAvatar from '../assets/personal-avatar.jpg'

const Header = () => {
  // Prefer a directly imported avatar from `src/assets` when present (bundled by Vite).
  const avatarSrc = personalAvatar || getAvatarSrc(content.header, 128)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
              <img src={avatarSrc} alt={`${content.header.name} avatar`} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-4 mb-8">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{content.header.name}</h1>
              <h2 className="text-2xl font-semibold text-blue-600">{content.header.title}</h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
              {content.header.bio}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              {content.header.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">{tag}</span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                Get in touch
              </a>
              <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg border border-slate-200 transition-colors duration-200 shadow-md">
                View projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header


