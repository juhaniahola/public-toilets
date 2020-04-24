import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import Loader from './Loader';

import logo from './logo.png';

import './App.css';

const App = () => {
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<any>({ lat: null, long: null })
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
    if(canUseGeoLocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        setIsLocating(false);
        setIsLoading(true)
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setUserLocation({ lat, long });

        try {
          setIsLocating(false);
          await fetchData(lat, long)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      })
    }
  }

  const toiletIcon = new Icon({
    iconUrl: require('./toilet.svg'),
    iconSize: [25, 40]
  })

  const date = new Date()
  const year = date.getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Kakalle</h1>
        <p className="App-description">Etsi lähin julkinen WC</p>
      </header>

      <main className="App-main">
        {results && results.length > 0 && (
          <h3>{results.length > 1 ? 'Lähimmät vessat:' : 'Lähin vessa:'}</h3>
        )}

        {results && results.length > 0 && results.map((result: any) => {
          return (
            <div key={result._id}>
              <p>{result.name}</p>
            </div>
          )
        })}

      {!isLocating && !isLoading && userLocation.lat && userLocation.long && (
        <Map center={[userLocation.lat, userLocation.long]} zoom={12}>
          <Marker position={[userLocation.lat, userLocation.long]}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Popup>
              Sijaintisi
            </Popup>
          </Marker>

          {!isLoading && results && results.length > 0 && results.map((result:any) => {
            const long = result.location.coordinates[0]
            const lat = result.location.coordinates[1]
            
            return (
              <Marker position={[lat, long]} key={result._id} icon={toiletIcon}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Popup>
                  {result.name}
                </Popup>
              </Marker>
            )
          })}
        </Map>
      )}

        {(isLocating || isLoading) && (
          <>
            <Loader />
            <p>{isLocating ? 'Paikannetaan sijaintiasi...' : isLoading ? 'Etsitään lähintä vessaa...' : null}</p>
          </>
        )}
        
        {!canUseGeoLocation && <p>Sijaintiominaisuuksien pitää olla päällä käyttääksesi palvelua.</p>}
        
        {canUseGeoLocation && !isLocating && !isLoading && (
          <button type="button" className="primary-button" onClick={() => findTheNearestToilet()}>
            Paikanna lähin käymäläni
          </button>
        )}

        {/* {userLocation && userLocation.lat && userLocation.long && (
          <p>Sijaintisi: {userLocation.lat}, {userLocation.long}</p>
        )} */}

        <div className="App-pro-tip">
          <h3>Pro tip</h3>
          <p>Tukemalla paikallista ravintolayrittäjää edes oluen tai kahvikupin verran, saat todennäköisesti käyttää myös ravintolan vessaa.</p>
        </div>

      </main>
      <footer className="App-footer">
        Copyright Juhani Ahola - {year}
      </footer>
    </div>
  );
}

export default App;
