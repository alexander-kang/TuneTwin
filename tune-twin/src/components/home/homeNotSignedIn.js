import React from 'react'
import NavBarNotSignedIn from '../navBar/navBarNotSignedIn'
import LoginButton from './loginButton'
import Footer from '../footer/footer'
import concert from '../../assets/concert.jpg'
import './home.css'

const LandingPageNotSignedIn = () => {
    return (
        <div>
            <NavBarNotSignedIn/>

            <div className="home-content">
                <div className="home-content-flex">
                    <img src={concert} alt="Live music event"/>

                    <p>Find live music events with your friends!</p>
                </div>

                <p className="body-text">Log into your Spotify account and add friends on TuneTwin to find live music events compatible with your group's music tastes near you!</p>
            </div>

            <LoginButton/>

            <Footer/>
        </div>
    )
}

export default LandingPageNotSignedIn
