import React from 'react'
import content from '../content.json'
import { getAvatarSrc } from '../utils/avatar'

const Header = () => {
  const avatarSrc = getAvatarSrc(content.header, 128)

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <img src={avatarSrc} alt={`${content.header.name} avatar`} className="w-32 h-32 rounded-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.header.name}</h1>
          <h2 className="text-xl text-primary-600 font-medium mb-4">{content.header.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            {content.header.bio}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {content.header.tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">{tag}</span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <a className="btn-primary" href="#contact">Get in touch</a>
            <a className="btn-secondary" href="#projects">View projects</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header


