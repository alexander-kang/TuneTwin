import React from 'react'
import NavBarSignedIn from '../navBar/navBarSignedIn'
import ContinueButton from './continueButton'
import Footer from '../footer/footer'
import './home.css'

const LandingPageSignedIn = () => {
    return (
        <div>
            <NavBarSignedIn/>

            <div className="home-content">
                <div className="home-content-flex">
                    <img src="../../../assets/concert.jpg" alt="Live music event"/>

                    <p>Find live music events with your friends!</p>
                </div>

                <p>Add friends on TuneTwin to find live music events compatible with your group's music tastes near you!</p>
            </div>

            <ContinueButton/>

            <Footer/>
        </div>
    )
}

export default LandingPageSignedIn
