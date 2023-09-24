import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navBar.css'

const NavBarNotSignedIn = () => {
  const navigate = useNavigate()
  const navHome = () => {
      navigate("/")
  }

  return (
    <nav className="navbar">
        <div className="navbar-left" onClick={navHome}>
          <i>TuneTwin</i>
        </div>
        
        <div className="navbar-right">
          <a href="http://127.0.0.1:8080/">
            Sign in
          </a>
        </div>
    </nav>
  )
}

export default NavBarNotSignedIn
