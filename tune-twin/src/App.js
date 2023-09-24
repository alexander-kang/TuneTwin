import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPageSignedIn from './components/home/homeSignedIn'
import LandingPageNotSignedIn from './components/home/homeNotSignedIn'
import EmailInput from './components/home/emailInput'
import { MyProvider } from './components/home/emailContext'
import YourArtists from './components/home/yourArtists'
import Welcome from './components/home/welcome'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<MyProvider>
          <Welcome/>
        </MyProvider>}/>
        <Route path="/email" element={<MyProvider>
          <EmailInput/>
        </MyProvider>}/>
        <Route path="/yourArtists" element={<MyProvider>
          <YourArtists/>
        </MyProvider>}/>
        {/*<Route path="/dashboard" element={<dashboard/>}/>*/}
      </Routes>
    </div>
  )
}

export default App
