import React from 'react'
import ProfilePage from './components/ProfilePage'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="tech-bg">
      <ProfilePage />
      <Chatbot />
      <div className="fixed bottom-2 right-2 text-xs text-gray-500 flex justify-start"> kakao: LiNeng99 </div>   
    </div>
  )
}

export default App


