import React from 'react'

const Header = () => {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            JD
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>
          <h2 className="text-xl text-primary-600 font-medium mb-4">Full Stack Developer</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Passionate developer with 5+ years of experience building scalable web applications. 
            I love creating user-friendly interfaces and solving complex problems with clean, efficient code.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              React
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Node.js
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              TypeScript
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              AWS
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header


