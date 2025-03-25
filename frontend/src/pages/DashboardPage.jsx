import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDashboard } from "../api/api";
import PlacesList from "../components/PlacesList";
import styles from "./DashboardPage.module.css";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState(() => {
    const savedPlaces = localStorage.getItem("places");
    return savedPlaces ? JSON.parse(savedPlaces) : [];
  });
  const [loading, setLoading] = useState(places.length === 0);

  useEffect(() => {
    const savedPlaces = localStorage.getItem("places");
    if (savedPlaces) {
      setPlaces(JSON.parse(savedPlaces));
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const { data } = await getUserDashboard();
        setPlaces(data.data.places || []);
        localStorage.setItem("places", JSON.stringify(data.data.places || []));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Explore Places</h1>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <PlacesList places={places} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
