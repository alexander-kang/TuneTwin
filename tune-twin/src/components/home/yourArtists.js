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
      {loading ? (
        <p>Loading...</p> // Display loading indicator while fetching data
      ) : (
        <div>
          <div>
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
        </div>
      )}
    </div>
  );
}

export default YourArtists;
