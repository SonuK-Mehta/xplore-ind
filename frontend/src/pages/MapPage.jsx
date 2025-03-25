import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import styles from "./MapPage.module.css";

// Fix missing marker icon issue
const markerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"), // Ensure correct bundling
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41], // Default Leaflet icon size
  iconAnchor: [12, 41], // Position anchor
  popupAnchor: [1, -34], // Adjust popup position
});

const MapPage = () => {
  const { lat, lng, location } = useParams();

  // Default coordinates for India
  const defaultLat = 20.5937;
  const defaultLng = 78.9629;
  const defaultLocation = "India";

  // Parse latitude and longitude
  const parsedLat = lat ? parseFloat(lat) : defaultLat;
  const parsedLng = lng ? parseFloat(lng) : defaultLng;

  return (
    <>
      <Navbar />
      <div className={styles.mapContainer}>
        <h1 className={styles.title}>
          Location: {location ? decodeURIComponent(location) : defaultLocation}
        </h1>
        <MapContainer
          center={[parsedLat, parsedLng]}
          zoom={lat && lng ? 13 : 5}
          className={styles.map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[parsedLat, parsedLng]} icon={markerIcon}>
            <Popup>
              {location ? decodeURIComponent(location) : defaultLocation}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default MapPage;
