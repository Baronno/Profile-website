import React from 'react'
import content from '../content.json'

const About = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{content.about.title}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.about.paragraphs.map((p, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <p className="text-slate-700 leading-relaxed text-lg">{p}</p>
            </div>
          ))}
          
          {/* Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Highlights</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">•</span> 3+ years UI/UX development</li>
              <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">•</span> React & Material UI expert</li>
              <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">•</span> Master's from UTS</li>
              <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">•</span> Full-stack & design skills</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


