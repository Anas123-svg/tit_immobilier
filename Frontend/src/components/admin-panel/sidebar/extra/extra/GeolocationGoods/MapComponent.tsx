import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const center = { lat: 5.347, lng: -4.025 }; // Center coordinates for the map

const markers = [
  { id: 1, position: { lat: 5.347, lng: -4.025 }, popup: "Property 1" },
  { id: 2, position: { lat: 5.348, lng: -4.030 }, popup: "Property 2" },
];

const containerStyle = {
  width: '100%',
  height: '500px',
};

const MapComponent: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null); // To track the selected marker

  return (
    <LoadScript googleMapsApiKey="AIzaSyB2t4hOvy4D0fX0nb8T_By3xp4ibdkjWTQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setSelectedMarker(marker.id)} // Set the selected marker
          >
            {selectedMarker === marker.id ? (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>{marker.popup}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
