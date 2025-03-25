import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PlacesList.module.css";

const PlacesList = ({ places }) => {
  const navigate = useNavigate();
  const [imageCache, setImageCache] = useState({});

  const getOptimizedImageUrl = (url) => {
    if (url && url.startsWith("http")) {
      return url.replace("/upload/", "/upload/w_600,f_webp,q_80/");
    }
    return "https://via.placeholder.com/600";
  };

  const fetchAndCacheImage = async (imageUrl, placeId) => {
    try {
      const cachedImage = localStorage.getItem(`image_${placeId}`);
      if (cachedImage) {
        setImageCache((prev) => ({ ...prev, [placeId]: cachedImage }));
        return;
      }

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      setImageCache((prev) => ({ ...prev, [placeId]: objectURL }));
      localStorage.setItem(`image_${placeId}`, objectURL);
    } catch (error) {
      console.error("Image fetching failed:", error);
    }
  };

  useEffect(() => {
    places.forEach((place) => {
      if (place.image) {
        fetchAndCacheImage(getOptimizedImageUrl(place.image), place._id);
      }
    });
  }, [places]);

  const openMap = (place) => {
    if (place.lat && place.lng) {
      navigate(
        `/map/${place.lat}/${place.lng}/${encodeURIComponent(place.location)}`
      );
    } else {
      console.error("Location coordinates are missing.");
    }
  };

  return (
    <div className={styles.grid}>
      {places.map((place, index) => {
        const placeId = place._id || place.id || place.name;
        const imageUrl =
          imageCache[placeId] || getOptimizedImageUrl(place.image);

        return (
          <div
            key={placeId}
            className={styles.card}
            onClick={() => openMap(place)}
          >
            <img
              src={imageUrl}
              alt={place.name}
              className={styles.image}
              loading="lazy"
              fetchpriority={index < 3 ? "high" : "low"}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{place.name}</h3>
              <p className={styles.cardText}>{place.description}</p>
              <p className={styles.location}>{place.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlacesList;

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
