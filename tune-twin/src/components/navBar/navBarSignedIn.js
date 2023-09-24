import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navBar.css'

const NavBarSignedIn = () => {
  const navigate = useNavigate()
  const navHome = () => {
      navigate("/")
  }

  return (
    <nav className="navbar">
        <div className="navbar-left" onClick={navHome}>
          <i>TuneTwin</i>
        </div>
    </nav>
  )
}

export default NavBarSignedIn
