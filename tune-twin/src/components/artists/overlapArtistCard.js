import React from 'react'
import './artist.css'

function OverlapArtistConcert({ city, date, address, state, link, friends }) {
    return (
        <div className="artist-concert">
            <h2 className="artist-heading">Concert Details:</h2>
            <p className="artist-info">City: {city}</p>
            <p className="artist-info">Date: {date}</p>
            <p className="artist-info">Address: {address}</p>
            <p className="artist-info">State: {state}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="artist-link">
                Get Tickets
            </a>
            {friends && friends.length > 0 &&
                <p className="artist-info">Shared friends: {friends.join(',')}</p>
                // friends.map((item, index) => {
                // console.log(item)
                //     return <p key={index}>{friends.join(',')}</p>
                // })
            }
        </div>
    )
}

export default OverlapArtistConcert
