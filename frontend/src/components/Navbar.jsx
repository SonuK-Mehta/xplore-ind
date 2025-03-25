import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/dashboard">
          <img src="/logo.svg" alt="logo" />
          <span>Explore India</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/map">Map</NavLink>
        <FaSearch className={styles.icon} />
        <FaUserCircle
          className={styles.icon}
          onClick={() => navigate("/profile")}
        />
      </div>
    </nav>
  );
};

export default Navbar;

/*
 * © 2025 Sonu Mehta. All rights reserved.
 * The content, design, and code of this website are the property of Sonu Mehta.
 * Unauthorized use, reproduction, or redistribution is prohibited.
 * For permission to use, please contact **https://github.com/sonuk-mehta**.
 */
