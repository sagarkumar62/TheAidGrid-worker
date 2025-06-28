import React, { useState } from 'react';

const SOSButton = () => {
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState('');

  const handleSOS = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported!');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLocation({ lat, lng });

      // Get area name (optional)
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_API_KEY`
      );
      const data = await response.json();
      const areaName =
        data.results[0]?.formatted_address || 'Unknown location';
      setArea(areaName);

      // Trigger WhatsApp or mail
      const message = `🚨 EMERGENCY SOS 🚨\nLocation: ${areaName}\nMaps: https://www.google.com/maps?q=${lat},${lng}`;
      const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappLink, '_blank');
    });
  };

  return (
    <div>
      <button
        onClick={handleSOS}
        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 cursor-pointer"
      >
        🆘 Send SOS
      </button>
    </div>
  );
};

export default SOSButton;
