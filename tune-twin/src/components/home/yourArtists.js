import React, { useState, useEffect } from 'react';
import ArtistConcert from './artistCard'; // Import the child component

function YourArtists() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = sessionStorage.getItem('email');

    fetch(`http://127.0.0.1:8080/getYourArtists?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div>
      <style>
        {`
          /* Loading indicator styles */
          .loading-indicator {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .loader {
            border: 10px solid rgba(0, 0, 0, 0.3); /* Thicker border */
            border-top: 10px solid #1DB954; /* Green color */
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1s linear infinite; /* Add animation for rotation */
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-text {
            font-size: 18px;
            color: #1DB954;
            margin-top: 30px;
            text-align: center;
            font-weight: bold;
          }

          .loading-text span {
            display: inline-block;
            animation: bounce 1s infinite alternate; /* Add animation for letters */
          }

          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-5px);
            }
          }

          /* Artist boxes layout */
          .artist-boxes {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Two boxes per row */
            gap: 20px; /* Gap between boxes */
            justify-items: center; /* Center horizontally */
            align-items: center; /* Center vertically */
          }
        `}
      </style>

      {loading ? (
        <div className="loading-indicator">
          {/* Display an animated loading circle */}
          <div className="loader"></div>
          <div className="loading-text">
            Fetching your artists data
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
      )}
    </div>
  );
}

export default YourArtists;
