import React from 'react'
import './navBar.css'

const NavBarNotSignedIn = () => {
  return (
    <nav className="navbar">
        <div className="navbar-left">
          <i>TuneTwin</i>
        </div>
        <div className="navbar-right">
          <a href="http://localhost:3000/email">Sign in</a>
        </div>
    </nav>
  )
}

export default NavBarNotSignedIn
