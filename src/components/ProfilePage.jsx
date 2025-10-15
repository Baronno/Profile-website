import React from 'react'
import Header from './Header'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Contact from './Contact'

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <About />
          <Experience />
        </div>
        <div className="space-y-8">
          <Skills />
          <Contact />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


