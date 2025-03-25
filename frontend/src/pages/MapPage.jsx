import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapPage.module.css";

const MapPage = () => {
  const { lat, lng, location } = useParams();

  // Set India's default coordinates
  const defaultLat = 20.5937; // India's Latitude
  const defaultLng = 78.9629; // India's Longitude
  const defaultLocation = "India";

  // Parse latitude and longitude if provided, else use India's coordinates
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
          zoom={lat && lng ? 13 : 5} // Zoom out for full India view
          className={styles.map}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[parsedLat, parsedLng]}>
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
