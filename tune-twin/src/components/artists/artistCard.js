import React from 'react'
import './artist.css'

function ArtistConcert({ city, date, address, state, link }) {
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
    </div>
  )
}

export default ArtistConcert
