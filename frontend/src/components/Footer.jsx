import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Created with ❤️ by{" "}
        <a
          href="https://github.com/sonuk-mehta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sonu Mehta
        </a>
      </p>
    </footer>
  );
};

export default Footer;
