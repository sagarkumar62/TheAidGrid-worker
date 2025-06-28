import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { toast } from 'react-toastify';

const libraries = ['places'];

const WorkerMapComponent = ({ jobLocation, onLocationUpdate }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [isTracking, setIsTracking] = useState(true);
  const [watchId, setWatchId] = useState(null);

  // Initialize Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Start GPS tracking
  const startLocationTracking = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    // Watch position with high accuracy
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(newPosition);
        onLocationUpdate?.(newPosition);

        // If we have a job location, update directions
        if (jobLocation && map) {
          updateDirections(newPosition, jobLocation);
        }
      },
      (error) => {
        toast.error(`Error getting location: ${error.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    setWatchId(id);
  }, [jobLocation, map, onLocationUpdate]);

  // Stop GPS tracking
  const stopLocationTracking = useCallback(() => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  }, [watchId]);

  // Update directions between current location and job location
  const updateDirections = useCallback((origin, destination) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          toast.error(`Error getting directions: ${status}`);
        }
      }
    );
  }, []);

  // Effect for managing location tracking
  useEffect(() => {
    if (isTracking) {
      startLocationTracking();
    } else {
      stopLocationTracking();
    }

    return () => {
      stopLocationTracking();
    };
  }, [isTracking, startLocationTracking, stopLocationTracking]);

  // Handle map load
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="text-red-600">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="text-gray-600">Loading maps...</div>;
  }

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={currentPosition || { lat: 28.6139, lng: 77.2090 }} // Default to Delhi
        zoom={15}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Current location marker */}
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new google.maps.Size(40, 40),
            }}
            title="Your Location"
          />
        )}

        {/* Job location marker */}
        {jobLocation && (
          <Marker
            position={jobLocation}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(40, 40),
            }}
            title="Job Location"
          />
        )}

        {/* Show directions if available */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* GPS tracking toggle button */}
      <button
        onClick={() => setIsTracking(!isTracking)}
        className={`absolute top-4 right-4 px-4 py-2 rounded-md text-white ${
          isTracking ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        {isTracking ? 'GPS Active' : 'GPS Inactive'}
      </button>
    </div>
  );
};

export default WorkerMapComponent;
