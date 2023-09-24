import React from 'react';

const artistConcertStyles = {
  border: '1px solid #ddd',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const headingStyles = {
  fontSize: '20px',
  marginBottom: '10px',
  color: '#333',
};

const infoStyles = {
  marginBottom: '5px',
  color: '#666',
};

const linkStyles = {
  display: 'block',
  marginTop: '10px',
  textDecoration: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
};

function ArtistConcert({ city, date, address, state, link }) {
  return (
    <div style={artistConcertStyles}>
      <h2 style={headingStyles}>Concert Details:</h2>
      <p style={infoStyles}>City: {city}</p>
      <p style={infoStyles}>Date: {date}</p>
      <p style={infoStyles}>Address: {address}</p>
      <p style={infoStyles}>State: {state}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyles}
      >
        Get Tickets
      </a>
    </div>
  );
}

export default ArtistConcert;
