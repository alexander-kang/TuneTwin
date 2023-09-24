import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navBar.css'

const NavBarSignedIn = () => {
    const navigate = useNavigate()
    const navHome = () => {
        navigate("/")
    }

    return (
        <nav className="navbar">
            <div className="navbar-left" onClick={navHome}>
                <img src={logo} alt="Live music event" />
            </div>
        </nav>
    )
}

export default NavBarSignedIn
