import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPageSignedIn from './components/home/homeSignedIn'
import LandingPageNotSignedIn from './components/home/homeNotSignedIn'
import EmailInput from './components/email/emailInput'
import { MyProvider } from './components/email/emailContext'
import YourArtists from './components/artists/yourArtists'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isSignedIn ? <LandingPageSignedIn/> : <LandingPageNotSignedIn/>}/>
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
