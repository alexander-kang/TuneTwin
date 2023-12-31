import React, { useState, useEffect } from 'react'
import OverlapArtistConcert from './overlapArtistCard'
import NavBarSignedIn from '../navBar/navBarSignedIn'
import Footer from '../footer/footer'
import './artist.css'
import AddFriend from '../friend/addFriend'

function OverlappingArtists() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const email = sessionStorage.getItem('email');

        fetch(`http://127.0.0.1:8080/getOverlappingArtists?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false); // Set loading to false on error
            });
    }, [callback]);

    return (
        <div>
            <NavBarSignedIn status="overlappingArtists" />
            <AddFriend callback={callback} callbackFn={setCallback} />
            {loading ? (
                <div className="loading-indicator">
                    {/* Display an animated loading circle */}
                    <div className="loader"></div>
                    <div className="loading-text">
                        Fetching common artist data
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>
            ) : (
                <div className="artist-boxes">
                    {data &&
                        data.results.map((artistData, index) => (
                            <div key={index}>
                                {artistData.concerts && artistData.concerts.length > 0 && (
                                    <div>
                                        <h2 className='artist-header'>Artist: {artistData.artist}</h2>
                                        <ul className="artist-ul">
                                            {artistData.concerts.map((concert, concertIndex) => (
                                                concert && (
                                                    <li className="artist-li" key={concertIndex}>
                                                        <OverlapArtistConcert
                                                            city={concert.city}
                                                            date={concert.date}
                                                            address={concert.address}
                                                            state={concert.state}
                                                            link={concert.url}
                                                            friends={artistData.friends}
                                                        />
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default OverlappingArtists
