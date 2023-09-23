import React from 'react'
import navBar from '../navBar/navBarNotSignedIn'
import loginButton from './loginButton'
import footer from '../footer/footer'

const landingPageNotSignedIn = () => {
    return (
        <div>
            <navBarNotSignedIn/>

            <div className="home-content">
                <div className="home-content-flex">
                    <img src="" alt=""/>

                    <p>Find live music events with your friends!</p>
                </div>

                <p>Log into your Spotify account and add friends on TuneTwin to find live music events compatible with your group's music tastes near you!</p>
            </div>

            <loginButton/>

            <footer/>
        </div>
    )
}

export default landingPageNotSignedIn
