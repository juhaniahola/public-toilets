import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import logo from './logo.png';

import './App.css';
import LeafletMap from './LeafletMap';

const App = () => {
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<any>(null)
  const [canUseGeoLocation, setCanUseGeoLocate] = useState<boolean>(true);

  const fetchData = async (lat: number, long: number) => {
    const response = await fetch(`/api/toilets?lat=${lat}&long=${long}`)
    const json = await response.json();
    setResults(json.response);
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      setCanUseGeoLocate(true)
    } else {
      setCanUseGeoLocate(false)
    }
  }, []);

  const findTheNearestToilet = async () => {
    setIsLoading(true)

    if(canUseGeoLocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setIsLocating(false);
          await fetchData(position.coords.latitude, position.coords.longitude)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Kakalle</h1>
        <p className="App-description">Etsi lähin julkinen käymäläsi</p>
      </header>
      <main className="App-main">
        {results && results.length > 0 && results.map((result: any) => {
          return (
            <div key={result._id}>
              <h3>{result.name}</h3>
              <p>{result.location.coordinates[0]}, {result.location.coordinates[1]}</p>
            </div>
          )
        })}

        <LeafletMap />

        {isLoading && <div className="App-loader">Ladataan...</div>}
        
        {!canUseGeoLocation && <p>Sijaintiominaisuuksien pitää olla päällä käyttääksesi palvelua.</p>}
        {canUseGeoLocation && (
          <button type="button" className="primary-button" onClick={() => findTheNearestToilet()}>
          {isLocating ? 'Paikannetaan...' : isLoading ? 'Etsitään käymälää...' : 'Paikanna lähin käymäläni'}
        </button>
        )}

        {userLocation && userLocation.lat && userLocation.long && (
          <p>Sijaintisi: {userLocation.lat}, {userLocation.long}</p>
        )}
      </main>
      <footer className="App-footer">
        Copyright Juhani Ahola - 2020
      </footer>
    </div>
  );
}

export default App;
