import React, { useState, useRef, useEffect } from 'react'
import content from '../content.json'
import { getAvatarSrc } from '../utils/avatar'

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
  const [selectedFileName, setSelectedFileName] = useState(null)
  const [selectedFileContent, setSelectedFileContent] = useState(null)
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
    if (!inputValue.trim() && !selectedFileName) return

    // Combine input text and file content (if any) into a single outgoing message
    let combinedContent = inputValue.trim()
    if (selectedFileName) {
      if (selectedFileContent) {
        combinedContent = `${combinedContent}${combinedContent ? '\n\n' : ''}[Attached file: ${selectedFileName}]\n${selectedFileContent}`
      } else {
        combinedContent = `${combinedContent}${combinedContent ? '\n\n' : ''}[Attached file: ${selectedFileName} - no preview]`
      }
    }

    const userMessage = {
      id: messages.length + 1,
      text: combinedContent,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setSelectedFileName(null)
    setSelectedFileContent(null)
    setIsTyping(true)
    // If an OpenAI API key is provided via Vite env, call the Chat Completions API.
    // Otherwise, fall back to the local rule-based `getBotResponse`.
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

    if (openaiKey) {
      try {
        const systemPrompt = `You are a strict personal assistant for ${content.header.name}. Only answer questions about ${content.header.name} using ONLY the facts provided in the JSON below. Do NOT invent facts or speculate. If asked something outside of this person's profile (for example, personal opinions, unrelated topics, or other people), reply exactly: \"I can only answer questions about ${content.header.name}. Please ask about their background, skills, experience, projects, or contact info.\"\n\nFacts JSON:\n${JSON.stringify(content)}`

        const payload = {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: combinedContent }
          ],
          max_tokens: 500,
          temperature: 0.2
        }

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify(payload)
        })

        if (!resp.ok) {
          throw new Error(`OpenAI error: ${resp.status} ${resp.statusText}`)
        }

        const data = await resp.json()
        const botResponse = data?.choices?.[0]?.message?.content?.trim() || getBotResponse(combinedContent)

        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
      } catch (err) {
        // On error, fall back to local responses
        const botResponse = getBotResponse(combinedContent)
        const botMessage = {
          id: messages.length + 2,
          text: `Sorry, I'm having trouble reaching the assistant service. ${botResponse}`,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } finally {
        setIsTyping(false)
      }
    } else {
      // No API key — use local fallback rules
      setTimeout(() => {
        const botResponse = getBotResponse(combinedContent)

        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 800 + Math.random() * 800)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setSelectedFileName(file.name)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target.result
      setSelectedFileContent(text)
    }
    reader.onerror = () => {
      setSelectedFileContent(null)
    }

    // Try to read as text. For binary files this will likely fail/produce gibberish.
    reader.readAsText(file)
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
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 w-80 h-96 flex flex-col">
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
            {messages.map((message) => {
              const isUser = message.sender === 'user'
              const botAvatar = getAvatarSrc(content.header, 40)

              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}> 
                  {!isUser && (
                    <img src={botAvatar} alt="bot avatar" className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
                  )}

                  <div className={`max-w-xs px-4 py-2 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                    <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {isUser && <div className="w-8" />} {/* spacer so user bubble aligns nicely */}
                </div>
              )
            })}
            
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
            <div className="flex space-x-2 items-end">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full pr-14 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  disabled={isTyping}
                />

                <input id="chat-file-input" type="file" accept=".txt,.md,.json" onChange={handleFileChange} disabled={isTyping} className="hidden" />
                <label htmlFor="chat-file-input" className="absolute right-3 bottom-0.5 p-2 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer shadow hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 10-5.656-5.657L6.343 10.172a6 6 0 108.486 8.486L20 13.657" />
                  </svg>
                </label>
              </div>

              <button
                type="submit"
                disabled={isTyping || (!inputValue.trim() && !selectedFileName)}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {selectedFileName && (
              <div className="mt-2 text-xs justify-end">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{selectedFileName}</span>
                <button type="button" onClick={() => { setSelectedFileName(null); setSelectedFileContent(null); }} className="ml-2 text-red-500 text-xs">Remove</button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot
