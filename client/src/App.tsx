import React, { useEffect, useState } from 'react';

import logo from './logo.png';

import WarningText from './components/WarningText';
import NoResults from './components/NoResults';
import ProTip from './components/ProTip';
import Loader from './components/Loader';
import ResultList from './components/ResultList';
import LeafletMap from './components/LeafletMap';

import './App.css';

const App = () => {
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [errorLocating, setErrorLocating] = useState<boolean>(false);
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
      navigator.geolocation.getCurrentPosition(
        async (position) => {
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
        },
        (error) => {
          setIsLocating(false);
          setErrorLocating(true);
          console.error(error);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        },
      );
    }
  };

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
        {results && results.length > 0 && <ResultList results={results} />}

        {!isLocating &&
          !isLoading &&
          userLocation.lat &&
          userLocation.long &&
          results &&
          results.length > 0 && (
            <LeafletMap
              userLatitude={userLocation.lat}
              userLongitude={userLocation.long}
              results={results}
            />
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

        {errorLocating && (
          <WarningText
            text={
              'Paikantaminen epäonnistui... Kokeile toisella selaimella ja/tai tarkista laitteesi paikannusasetukset'
            }
          />
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
