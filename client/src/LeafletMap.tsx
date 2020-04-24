import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = () => {
  return (
    <Map center={[60.20, 24.88]} zoom={16}>
      <Marker position={[60.20, 24.88]}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      </Marker>
    </Map>
  );
};

export default LeafletMap;