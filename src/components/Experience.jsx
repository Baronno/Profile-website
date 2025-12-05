import React, { useEffect, useMemo, useRef, useState } from 'react'
import content from '../content.json'

const Experience = ({ showOnlyWork = false, showOnlyProjects = false }) => {
  const experiences = content.experience.timeline
  const [projectsVisible, setProjectsVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const projectsRef = useRef(null)
  const titleRef = useRef(null)

  // Fancy projects carousel with infinite scroll
  const projects = useMemo(() => content.experience.projects, [])
  
  // Create infinite carousel: [original cards, duplicated cards, original cards again]
  const infiniteProjects = useMemo(() => {
    return [...projects, ...projects, ...projects]
  }, [projects])

  const [currentIndex, setCurrentIndex] = useState(projects.length) // Start at first original card
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(100) // Default to full width
  const autoplayRef = useRef(null)
  const containerRef = useRef(null)
  const slideRef = useRef(null)

  // Track desktop vs mobile so we can render a static row on desktop
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px)')
    const update = (e) => setIsDesktop(typeof e === 'boolean' ? e : (e.matches ?? m.matches))
    update(m.matches)
    if (m.addEventListener) m.addEventListener('change', update)
    else m.addListener(update)
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', update)
      else m.removeListener(update)
    }
  }, [])

  // Calculate actual card width percentage based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      if (typeof window === 'undefined') return
      // Show multiple cards: on desktop show ~3 cards with peek effect
      setCardWidth(33.33) // 3 cards visible at once (100% / 3)
    }
    
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [])

  const goTo = (index) => {
    setIsTransitioning(true)
    setCurrentIndex(index)
  }

  const next = () => {
    if (isTransitioning) return // Prevent rapid clicks
    goTo(currentIndex + 1)
  }

  const prev = () => {
    if (isTransitioning) return // Prevent rapid clicks
    goTo(currentIndex - 1)
  }

  // Handle seamless infinite loop by jumping to duplicate without transition
  useEffect(() => {
    const handleTransitionEnd = () => {
      // Jump to duplicate without animation when reaching the ends
      if (currentIndex >= projects.length * 2) {
        // Reached end, jump back to start
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(projects.length)
        }, 0)
      } else if (currentIndex < projects.length) {
        // Went before start, jump to end
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(projects.length * 2 - 1)
        }, 0)
      } else {
        // Normal slide, just mark transition complete
        setIsTransitioning(false)
      }
    }

    if (slideRef.current && isTransitioning) {
      slideRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true })
      return () => {
        slideRef.current?.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [currentIndex, isTransitioning, projects.length])

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((i) => i + 1)
    }, 4000)
    return () => clearInterval(autoplayRef.current)
  }, [projects.length])

  // Scroll reveal animation for title
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [])

  // Scroll reveal animation for projects section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [])

  // Pause on hover for better UX
  const onMouseEnter = () => autoplayRef.current && clearInterval(autoplayRef.current)
  const onMouseLeave = () => {
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % projects.length)
    }, 4000)
  }

  // Basic touch swipe
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let startX = 0
    let isTouching = false

    const onTouchStart = (e) => {
      isTouching = true
      startX = e.touches[0].clientX
      onMouseEnter()
    }
    const onTouchEnd = (e) => {
      if (!isTouching) return
      const endX = e.changedTouches[0].clientX
      const dx = endX - startX
      if (Math.abs(dx) > 50) {
        dx > 0 ? prev() : next()
      }
      isTouching = false
      onMouseLeave()
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section className={`py-20 px-4 ${showOnlyProjects ? 'bg-transparent' : 'bg-white'}`}  >
      <div className="max-w-4xl mx-auto">
        {!showOnlyProjects && (
          <div className="card">
            <h3 
              ref={titleRef}
              className={`text-2xl font-bold text-gray-900 mb-6 transition-all duration-700 ease-out ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
            {content.experience.title}
          </h3>
          <div className="space-y-6 sm:space-y-7 lg:space-y-8 mb-12 lg:mb-14">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
          </div>
        )}
      </div>

      {!showOnlyWork && (
      <div className={`transition-all duration-700 ease-out ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }} id="experience">
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="pb-4">
            <h3 
              ref={projectsRef}
              className={`text-2xl font-bold text-gray-900 mb-4 transition-all duration-700 ease-out ${
                projectsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {content.experience.projectsTitle}
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
          </div>

          {/* Carousel with peek effect */}
          <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="relative py-8 overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96">
            <div 
              ref={slideRef}
              className={`flex gap-6 h-full ${isTransitioning ? 'transition-transform duration-2000 ease-out' : ''}`}
              style={{ transform: `translateX(calc(-${currentIndex * cardWidth}% - ${currentIndex * 1.5}rem))` }}
            >
            {infiniteProjects.map((project, i) => (
              <a key={`${project.name}-${i}`} href={project.href} target="_blank" rel="noreferrer" className="flex-shrink-0 w-1/3 block group rounded-xl overflow-hidden h-full">
                <div className="relative h-full w-full">
                  <img src={project.image} alt={project.name} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://picsum.photos/seed/fallback/1600/900' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-900">Featured</span>
                      <span className="text-white/80 text-sm">{((i % projects.length) + 1)} / {projects.length}</span>
                    </div>
                    <h4 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">{project.name}</h4>
                    <p className="mt-2 text-white/90 text-base md:text-lg">{project.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-blue-200 group-hover:text-white transition-colors text-base">
                      Visit site
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414L14 5.414V13a1 1 0 11-2 0V5.414L8.707 7.707A1 1 0 117.293 6.293l4-4z"/></svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
        </div>

        {/* Controls */}
        <button type="button" onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-2 focus:outline-none">
          <svg className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
        </button>
        <button type="button" onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-2 focus:outline-none">
          <svg className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L14 9.586a1 1 0 010 1.414l-5.293 5.293a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {projects.map((_, i) => {
            const actualIndex = currentIndex % projects.length
            return (
              <button 
                key={i} 
                type="button" 
                aria-label={`Go to slide ${i + 1}`} 
                onClick={() => goTo(projects.length + i)} 
                className={`h-2 w-2 rounded-full transition-all ${i === actualIndex ? 'w-6 bg-white' : 'bg-white/60 hover:bg-white/90'}`} 
              />
            )
          })}
        </div>
      </div>
        </div>
      </div>
      )}
    </section>
  )
}

// Collapsible experience item with scroll reveal animation
const ExperienceItem = ({ exp, index }) => {
  const [open, setOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef(null)
  const itemRef = useRef(null)

  // Scroll reveal animation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={itemRef}
      className={`border-l-4 border-primary-500 pl-6 relative transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full" />

      <button
        type="button"
        aria-expanded={open}
        aria-controls={`exp-panel-${index}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left mb-2 group"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
            <p className="text-primary-600 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.period}</p>
          </div>
          <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.187l3.71-3.955a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd"/></svg>
          </span>
        </div>
      </button>

      <div
        id={`exp-panel-${index}`}
        ref={contentRef}
        className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${open ? 'opacity-100 max-h-[400px] translate-y-0' : 'opacity-0 max-h-0 -translate-y-1'}`}
      >
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
    </div>
  )
}

export default Experience


