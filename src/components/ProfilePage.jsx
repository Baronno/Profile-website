import React from 'react'
import Header from './Header'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'

const ProfilePage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <Header />
      </div>
      
      <div className="max-w-4xl mx-auto mt-8" >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <About />
            <Experience showOnlyWork={true} />
          </div>
          <div className="space-y-6 lg:space-y-8">
            <Skills />
            <div id="contact">
              <Contact />
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width Projects section */}
      <Experience showOnlyProjects={true} />
      
      <Footer />
    </div>
  )
}

export default ProfilePage


