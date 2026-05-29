import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
}

function DeliveryMap() {
  const [position, setPosition] = useState([11.0168, 76.9558]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (location) => {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        setPosition([lat, lng]);
      },

      (error) => {
        console.log(error);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        paddingTop: "160px",
        background: "#020817",
      }}
    >
      <MapContainer
        center={position}
        zoom={15}
        style={{
          width: "100%",
          height: "70vh",
          borderRadius: "20px",
        }}
      >
        <RecenterMap position={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Delivery Rider 🚚</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DeliveryMap;
