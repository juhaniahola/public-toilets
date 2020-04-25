import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { IToilet } from '../../types/toilet.interface';
import './LeafletMap.scss';

interface IProps {
  userLatitude: number;
  userLongitude: number;
  results: IToilet[];
}

const toiletIcon = new Icon({
  iconUrl: require('../../toilet.svg'),
  iconSize: [25, 40],
});

const LeafletMap = ({ userLatitude, userLongitude, results }: IProps) => {
  if (!userLatitude || !userLongitude) return null;

  return (
    <Map center={[userLatitude, userLongitude]} zoom={12}>
      <Marker position={[userLatitude, userLongitude]}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Popup>Sijaintisi</Popup>
      </Marker>

      {results &&
        results.length > 0 &&
        results.map((result: any) => {
          const long = result.location.coordinates[0];
          const lat = result.location.coordinates[1];

          return (
            <Marker position={[lat, long]} key={result._id} icon={toiletIcon}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Popup>{result.name}</Popup>
            </Marker>
          );
        })}
    </Map>
  );
};

export default LeafletMap;
