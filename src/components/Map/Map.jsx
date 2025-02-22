import React, { useState } from "react";
import mapStyle from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const { BaseLayer, Overlay } = LayersControl;

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

export default function MapComponent() {
  const polygonCoords = [
    [30.0444, 31.2357], // Cairo
    [30.0524, 31.2407],
    [30.0484, 31.2507],
  ];

  //Egyptian Ministry of Planning and Economic Development
  const polygonCoordsMiistry = [
    [30.0796, 31.3164],
    [30.0797, 31.3165],
    [30.0798, 31.3164],
    [30.0797, 31.3163],
  ];

  const lineCoords = [
    [30.0444, 31.2357],
    [30.05, 31.24],
    [30.055, 31.245],
  ];

  const initialMarker = [30.0444, 31.2357];

  // State for user-added markers
  const [markers, setMarkers] = useState([initialMarker]);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers([...markers, [lat, lng]]);
      },
    });
    return null;
  }

  return (
    <div className={`around-border ${mapStyle.aroundBorder} ${mapStyle.map}`}>
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <LayersControl position="topright">
          {/* Base Map Layer */}
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Satellite">
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
          </BaseLayer>

          {/* Polygon Layer */}
          <Overlay checked name="Polygon">
            <Polygon
              positions={polygonCoords}
              pathOptions={{ color: "blue", fillOpacity: 0.4 }}
            />
          </Overlay>

          {/* Egyptian Ministry of Planning and Economic Development */}
          <Overlay checked name="Polygon">
            <Polygon
              positions={polygonCoordsMiistry}
              pathOptions={{ color: "red", fillOpacity: 0.4 }}
            />
          </Overlay>

          {/* Line Layer */}
          <Overlay checked name="Polyline">
            <Polyline
              positions={lineCoords}
              pathOptions={{ color: "red", weight: 3 }}
            />
          </Overlay>

          {/* Point (Marker) Layer */}
          <Overlay checked name="Markers">
            <>
              {markers.map((position, index) => (
                <Marker key={index} position={position} icon={customIcon}>
                  <Popup>
                    Marker {index + 1} at {position.toString()}
                  </Popup>
                </Marker>
              ))}
            </>
          </Overlay>
        </LayersControl>

        {/* Click to add marker */}
        <AddMarkerOnClick />
      </MapContainer>
    </div>
  );
}
