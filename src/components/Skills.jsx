import React from 'react'

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Vue.js", level: 75 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "GraphQL", level: 70 }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Figma", level: 70 },
        { name: "Jest", level: 85 }
      ]
    }
  ]

  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
      <div className="space-y-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{category.title}</h4>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills


