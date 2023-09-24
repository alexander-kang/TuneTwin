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
          <a href="http://localhost:3000/email">Sign in</a>
        </div>
    </nav>
  )
}

export default NavBarNotSignedIn
