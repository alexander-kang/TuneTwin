import React, { useState } from 'react';
import ArtistConcert from './artistCard'; // Import the child component

function YourArtists() {
  const [data, setData] = useState(null);
  const email = sessionStorage.getItem('email');

  const handleGetArtists = () => {
    fetch(`http://127.0.0.1:8080/getYourArtists?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div>
      <p>Email: {email}</p>
      <button onClick={handleGetArtists}>Get My Artists</button>

      <div>
        {data &&
          data.results.map((artistData, index) => (
            <div key={index}>
              {artistData.concerts && artistData.concerts.length > 0 && ( // Conditional check
                <div>
                  <h2>Artist: {artistData.artist}</h2>
                  <ul>
                    {artistData.concerts.map((concert, concertIndex) => (
                      concert && (
                        <li key={concertIndex}>
                          <ArtistConcert
                            city={concert.city}
                            date={concert.date}
                            address={concert.address}
                            state={concert.state}
                            link={concert.url}
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
    </div>
  );
}

export default YourArtists;
