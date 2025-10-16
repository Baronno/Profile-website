import React from 'react'
import Header from './Header'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <About />
          <div id="projects">
            <Experience />
          </div>
        </div>
        <div className="space-y-6 lg:space-y-8">
          <Skills />
          <div id="contact">
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage


