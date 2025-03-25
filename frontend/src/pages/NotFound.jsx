import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>
        Oops! The page you are looking for doesn't exist.
      </p>
      <button
        className={styles.homeButton}
        onClick={() => navigate("/dashboard")}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
