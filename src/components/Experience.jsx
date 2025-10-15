import React from 'react'

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Leading development of microservices architecture and mentoring junior developers. Improved system performance by 40% and reduced deployment time by 60%.",
      technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications serving 10,000+ users. Implemented CI/CD pipelines and automated testing processes.",
      technologies: ["Vue.js", "Python", "MongoDB", "Redis", "Kubernetes"]
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Ltd.",
      period: "2019 - 2020",
      description: "Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces.",
      technologies: ["React", "JavaScript", "CSS3", "SASS", "Webpack"]
    }
  ]

  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Experience</h3>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-primary-500 pl-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
            <div className="mb-2">
              <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
              <p className="text-primary-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
            </div>
            <p className="text-gray-600 mb-3">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience


