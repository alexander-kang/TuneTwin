import React from 'react'
import navBarSignedIn from '../navBar/navBarSignedIn'
import continueButton from './continueButton'
import footer from '../footer/footer'

const landingPageSignedIn = () => {
    return (
        <div>
            <navBarSignedIn/>

            <div className="home-content">
                <div className="home-content-flex">
                    <img src="" alt=""/>

                    <p>Find live music events with your friends!</p>
                </div>

                <p>Add friends on TuneTwin to find live music events compatible with your group's music tastes near you!</p>
            </div>

            <continueButton/>

            <footer/>
        </div>
    )
}

export default landingPageSignedIn
