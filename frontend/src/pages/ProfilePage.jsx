import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FaUserCircle } from "react-icons/fa";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, redirecting...");
          navigate("/login");
          return;
        }

        const { data } = await getUserProfile();
        setUser(data.user);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false); // Ensure loading state updates
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <>
            <div className={styles.icon}>
              <FaUserCircle />
            </div>
            <h1 className={styles.name}>Name: {user.name}</h1>
            <p className={styles.email}>UserName: {user.email}</p>
            <p className={styles.location}>Location: {user.location}</p>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
