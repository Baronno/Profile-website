import React from 'react'
import content from '../content.json'

const About = () => {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.about.title}</h3>
      <div className="space-y-4 text-gray-600">
        {content.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}

export default About


