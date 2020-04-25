import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import Loader from './components/Loader';

import logo from './logo.png';

import WarningText from './components/WarningText';
import NoResults from './components/NoResults';
import ProTip from './components/ProTip';

import './App.css';

const App = () => {
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<any>({
    lat: null,
    long: null,
  });
  const [canUseGeoLocation, setCanUseGeoLocate] = useState<boolean>(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const fetchData = async (lat: number, long: number) => {
    const response = await fetch(`/api/toilets?lat=${lat}&long=${long}`);
    const json = await response.json();
    setResults(json.response);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      setCanUseGeoLocate(true);
    } else {
      setCanUseGeoLocate(false);
    }
  }, []);

  const findTheNearestToilet = async () => {
    if (canUseGeoLocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        setIsLocating(false);
        setIsLoading(true);
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setUserLocation({ lat, long });

        try {
          setIsLocating(false);
          await fetchData(lat, long);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          setInitialFetchDone(true);
        }
      });
    }
  };

  const toiletIcon = new Icon({
    iconUrl: require('./toilet.svg'),
    iconSize: [25, 40],
  });

  const date = new Date();
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

        {results &&
          results.length > 0 &&
          results.map((result: any) => {
            return (
              <div key={result._id}>
                <p>{result.name}</p>
              </div>
            );
          })}

        {!isLocating &&
          !isLoading &&
          userLocation.lat &&
          userLocation.long &&
          results &&
          results.length > 0 && (
            <Map center={[userLocation.lat, userLocation.long]} zoom={12}>
              <Marker position={[userLocation.lat, userLocation.long]}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Popup>Sijaintisi</Popup>
              </Marker>

              {!isLoading &&
                results &&
                results.length > 0 &&
                results.map((result: any) => {
                  const long = result.location.coordinates[0];
                  const lat = result.location.coordinates[1];

                  return (
                    <Marker
                      position={[lat, long]}
                      key={result._id}
                      icon={toiletIcon}
                    >
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Popup>{result.name}</Popup>
                    </Marker>
                  );
                })}
            </Map>
          )}

        {initialFetchDone && (!results || results.length <= 0) && <NoResults />}

        {(isLocating || isLoading) && (
          <>
            <Loader />
            <p>
              {isLocating
                ? 'Paikannetaan sijaintiasi...'
                : isLoading
                ? 'Etsitään lähintä vessaa...'
                : null}
            </p>
          </>
        )}

        {!canUseGeoLocation && (
          <WarningText
            text={
              'Selaimen sijaintiominaisuuksien tulee olla päällä käyttääksesi palvelua.'
            }
          />
        )}

        {canUseGeoLocation && !isLocating && !isLoading && (
          <button
            type="button"
            className="primary-button"
            onClick={() => findTheNearestToilet()}
          >
            {initialFetchDone ? 'Etsi uudestaan' : 'Paikanna lähin käymäläni'}
          </button>
        )}

        <ProTip />
      </main>
      <footer className="App-footer">Copyright Juhani Ahola - {year}</footer>
    </div>
  );
};

export default App;
