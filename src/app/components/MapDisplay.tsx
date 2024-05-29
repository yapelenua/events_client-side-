import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { API_KEY } from '../utils';

interface MapDisplayProps {
  center: {
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: '600px',
  height: '600px',
};

const MapDisplay: React.FC<MapDisplayProps> = ({ center }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
