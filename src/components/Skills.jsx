import React, { useEffect, useMemo, useRef, useState } from 'react'
import content from '../content.json'

const Skills = () => {
  const skillCategories = content.skills.categories

  // Track visibility of skill items for reveal-on-scroll animation
  const itemRefs = useRef([])
  const [visibleIndexes, setVisibleIndexes] = useState(new Set())

  const totalItems = useMemo(() => (
    skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  ), [skillCategories])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute('data-skill-index')
          if (!idxAttr) return
          const idx = parseInt(idxAttr, 10)
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => new Set(prev).add(idx))
            observer.unobserve(entry.target)
          }
        })
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    )

    itemRefs.current.slice(0, totalItems).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [totalItems])

  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.skills.title}</h3>
      <div className="space-y-6">
        {skillCategories.map((category, categoryIndex) => {
          let baseIndex = 0
          for (let i = 0; i < categoryIndex; i++) {
            baseIndex += skillCategories[i].skills.length
          }
          return (
          <div key={categoryIndex}>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{category.title}</h4>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => {
                const globalIndex = baseIndex + skillIndex
                const isVisible = visibleIndexes.has(globalIndex)
                const delayMs = (categoryIndex * 120) + (skillIndex * 70)
                return (
                  <div
                    key={skillIndex}
                    ref={(el) => (itemRefs.current[globalIndex] = el)}
                    data-skill-index={globalIndex}
                    className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${delayMs}ms` }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-[1200ms] ease-out ${isVisible ? 'w-[var(--w)]' : 'w-0'}`}
                        style={{ ['--w']: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Skills


