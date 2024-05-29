import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../utils';

interface MapDisplayProps {
  center: {
    lat: number;
    lng: number;
  };
  markers: {
    id?: number;
    position: {
      lat: number;
      lng: number;
    };
  }[];
  onMarkerClick: (id: any) => void;
}

const GlobalMap: React.FC<MapDisplayProps> = ({ center, markers, onMarkerClick }) => {
  const mapContainerStyle = {
    width: '50%',
    height: '600px',
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} onClick={() => onMarkerClick(marker.id)} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GlobalMap;
