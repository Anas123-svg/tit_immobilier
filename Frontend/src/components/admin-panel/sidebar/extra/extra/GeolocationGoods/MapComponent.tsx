import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const center = { lat: 5.347, lng: -4.025 }; // Center coordinates for the map

const containerStyle = {
  width: '100%',
  height: '500px',
};

interface MapComponentProps {
  onLocationChange: (lat: number, lng: number) => void; // Callback prop for sending location
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange }) => {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null); // To store clicked position
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false); // To toggle InfoWindow visibility
  const [isDragging, setIsDragging] = useState<boolean>(false); // To track dragging state

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // Only set position if it was a click (not a drag)
    if (!isDragging) {
      const latLng = e.latLng;
      if (latLng) {
        const position = {
          lat: latLng.lat(),
          lng: latLng.lng(),
        };
        setClickedPosition(position);
        console.log(`Latitude: ${position.lat}, Longitude: ${position.lng}`); // Log the clicked position
        setShowInfoWindow(true); // Show InfoWindow on map click
        onLocationChange(position.lat, position.lng); // Send location to parent
      }
    }
  };

  const handleDragStart = () => {
    setIsDragging(true); // Map is being dragged
  };

  const handleDragEnd = () => {
    setIsDragging(false); // Map dragging has ended
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB2t4hOvy4D0fX0nb8T_By3xp4ibdkjWTQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onClick={handleMapClick} // Add onClick to handle map click
        onDragStart={handleDragStart} // Detect when dragging starts
        onDragEnd={handleDragEnd} // Detect when dragging ends
      >
        {/* Show InfoWindow on map click with clicked position */}
        {clickedPosition && (
          <Marker position={clickedPosition}>
            {showInfoWindow && (
              <InfoWindow position={clickedPosition} onCloseClick={() => setShowInfoWindow(false)}>
                <div>
                  <p>Latitude: {clickedPosition.lat}</p>
                  <p>Longitude: {clickedPosition.lng}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
