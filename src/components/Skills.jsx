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
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{content.skills.title}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            let baseIndex = 0
            for (let i = 0; i < categoryIndex; i++) {
              baseIndex += skillCategories[i].skills.length
            }
            return (
              <div key={categoryIndex} className="bg-white rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const globalIndex = baseIndex + skillIndex
                    const isVisible = visibleIndexes.has(globalIndex)
                    const delayMs = (categoryIndex * 120) + (skillIndex * 70)
                    return (
                      <div
                        key={skillIndex}
                        ref={(el) => (itemRefs.current[globalIndex] = el)}
                        data-skill-index={globalIndex}
                        className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        style={{ transitionDelay: `${delayMs}ms` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-[1200ms] ease-out ${isVisible ? 'w-[var(--w)]' : 'w-0'}`}
                            style={{ ['--w']: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills


