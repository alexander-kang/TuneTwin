import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import landingPageSignedIn from './components/home/homeSignedIn'
import landingPageNotSignedIn from './components/home/homeNotSignedIn'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isSignedIn ? <landingPageSignedIn/> : <landingPageNotSignedIn/>}/>
        <Route path="/dashboard" element={<dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
