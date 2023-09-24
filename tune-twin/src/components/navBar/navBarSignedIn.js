import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navBar.css'

const NavBarSignedIn = (props) => {
    const navigate = useNavigate()
    const navHome = () => {
        navigate("/")
    }

    useEffect(() => {
        setActiveButton(`${props.status}Btn`)
    }, [props.status])

    const [activeButton, setActiveButton] = useState(`${props.status}Btn`);
    const handleClick = (buttonId) => {
        setActiveButton(buttonId);
        if (buttonId === 'yourArtistsBtn') {
            navigate("/yourArtists")
        } else {
            navigate("/overlappingArtists")
        }
    }

    return (
        <>
            <nav className="navbar-signedin">
                <div className="navbar-center" onClick={navHome}>
                    <img src={logo} alt="Live music event" />
                </div>
            </nav>
            <div className="toggle-container">
                <button
                    className={`toggle-button ${activeButton === 'yourArtistsBtn' ? 'active' : ''}`}
                    onClick={() => handleClick('yourArtistsBtn')}
                    id="yourArtistsBtn"
                >
                    Personal
                </button>
                <button
                    className={`toggle-button ${activeButton === 'overlappingArtistsBtn' ? 'active' : ''}`}
                    onClick={() => handleClick('overlappingArtistsBtn')}
                    id="overlappingArtistsBtn"
                >
                    Social
                </button>
            </div>
        </>
    )
}

export default NavBarSignedIn
