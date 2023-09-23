import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPageSignedIn from './components/home/homeSignedIn'
import LandingPageNotSignedIn from './components/home/homeNotSignedIn'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isSignedIn ? <LandingPageSignedIn/> : <LandingPageNotSignedIn/>}/>
        {/*<Route path="/dashboard" element={<dashboard/>}/>*/}
      </Routes>
    </div>
  )
}

export default App
