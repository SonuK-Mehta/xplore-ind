import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./MapPage.module.css";
import Footer from "../components/Footer";

const MapPage = () => {
  const { lat, lng, location } = useParams();

  // Default India's coordinates
  const defaultLat = 20.5937;
  const defaultLng = 78.9629;
  const defaultLocation = "India";

  // Parse values
  const parsedLat = lat ? parseFloat(lat) : defaultLat;
  const parsedLng = lng ? parseFloat(lng) : defaultLng;

  // Fix missing marker issue
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default Leaflet icon size
    iconAnchor: [12, 41], // Center-bottom anchor
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
          <Marker position={[parsedLat, parsedLng]} icon={customIcon}>
            <Popup>
              {location ? decodeURIComponent(location) : defaultLocation}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <Footer />
    </>
  );
};

export default MapPage;
