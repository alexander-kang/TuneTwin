import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navBar.css'

const NavBarSignedInNoToggle = () => {
    const navigate = useNavigate()
    const navHome = () => {
        navigate("/")
    }

    return (
        <>
            <nav className="navbar-signedin">
                <div className="navbar-center" onClick={navHome}>
                    <img src={logo} alt="Live music event" />
                </div>
            </nav>
        </>
    )
}

export default NavBarSignedInNoToggle
