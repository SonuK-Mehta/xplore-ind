import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginUser, registerUser } from "../api/api";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = isSignUp
        ? await registerUser(credentials)
        : await loginUser(credentials);

      if (isSignUp) {
        setSuccessMessage("✅ Account created successfully! Please log in.");
        setIsSignUp(false);
        return;
      }

      if (!data?.user?.token) {
        throw new Error("No token received from backend.");
      }

      localStorage.setItem("token", data.user.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "❌ Invalid email or password! Please try again."
      );
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setCredentials({ name: "", email: "", password: "" });
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Explore India</h2>
        <p className={styles.subTitle}>
          {isSignUp
            ? "Create a new account!"
            : "Access your account to start exploring!"}
        </p>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <button type="submit" className={styles.button}>
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Need to create an account?"}{" "}
          <span className={styles.toggleButton} onClick={handleToggle}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
