import React, { useState, useRef, useEffect } from 'react'
import content from '../content.json'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm here to answer questions about ${content.header.name}, a ${content.header.title}. What would you like to know about them?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // About/Introduction questions
    if (message.includes('who') && (message.includes('john') || message.includes('you'))) {
      return `I'm ${content.header.name}, a ${content.header.title}. ${content.header.bio}`
    }
    
    if (message.includes('about') || message.includes('tell me about')) {
      return `Here's what I can tell you about ${content.header.name}: ${content.about.paragraphs[0]}`
    }
    
    // Experience questions
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      const currentJob = content.experience.timeline[0]
      return `Currently, I work as a ${currentJob.title} at ${currentJob.company} (${currentJob.period}). ${currentJob.description}`
    }
    
    if (message.includes('company') || message.includes('where do you work')) {
      return `I currently work at ${content.experience.timeline[0].company} as a ${content.experience.timeline[0].title}.`
    }
    
    // Skills questions
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      const frontendSkills = content.skills.categories[0].skills.map(s => s.name).join(', ')
      const backendSkills = content.skills.categories[1].skills.map(s => s.name).join(', ')
      return `My main skills include:\n\nFrontend: ${frontendSkills}\nBackend: ${backendSkills}\n\nI'm particularly strong in React, Node.js, and TypeScript.`
    }
    
    if (message.includes('react') || message.includes('javascript')) {
      return `Yes! I'm very experienced with React (95% proficiency) and JavaScript. I've been using React for over 5 years and have built many applications with it.`
    }
    
    if (message.includes('python') || message.includes('node')) {
      return `I work with both Python (85% proficiency) and Node.js (90% proficiency). I use Node.js for backend development and Python for various projects.`
    }
    
    // Projects questions
    if (message.includes('project') || message.includes('work on') || message.includes('built')) {
      const projects = content.experience.projects.map(p => `• ${p.name}: ${p.tagline}`).join('\n')
      return `Here are some of my notable projects:\n\n${projects}\n\nYou can check them out on my profile!`
    }
    
    // Contact questions
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('get in touch')) {
      return `You can reach me at ${content.contact.items[0].value} or call me at ${content.contact.items[1].value}. I'm also on LinkedIn and GitHub - check the contact section for links!`
    }
    
    if (message.includes('email')) {
      return `My email is ${content.contact.items[0].value}. Feel free to reach out!`
    }
    
    if (message.includes('phone') || message.includes('call')) {
      return `You can call me at ${content.contact.items[1].value}.`
    }
    
    // Education/Background
    if (message.includes('education') || message.includes('degree') || message.includes('background')) {
      return `I have a Computer Science degree and over 5 years of professional experience in full-stack development. I've worked with both startups and enterprise companies.`
    }
    
    // Years of experience
    if (message.includes('how long') || message.includes('years') || message.includes('experience')) {
      return `I have over 5 years of experience in full-stack development. I started as a Frontend Developer in 2019 and have progressed to Senior Full Stack Developer.`
    }
    
    // Default responses
    const defaultResponses = [
      `That's a great question! I'd be happy to tell you more about ${content.header.name}. What specific aspect interests you - my experience, skills, or projects?`,
      `I can share more about my background, current role, or technical skills. What would you like to know?`,
      `Feel free to ask about my work experience, the technologies I use, or my projects. I'm here to help!`,
      `I'd love to tell you more about my professional journey. What would you like to know about my career or skills?`
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Generate intelligent bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 w-80 h-96 flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-medium">Chat Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.text}</div>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot
