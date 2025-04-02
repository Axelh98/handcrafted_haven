import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer(
) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSections}>
            <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/productList" className="footer-link">Products</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>
              Handcrafted Haven<br />
              123 Main Street<br />
              Anytown, ST 12345<br />
              (555) 555-1234<br />
              <a href="mailto:info@handcraftedhaven.com" className="footer-link">info@handcraftedhaven.com</a>
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Follow Us</h3>
            <ul>
              <li>
                <a href="https://www.facebook.com/handcraftedhaven" rel="noopener noreferrer" target="_blank" className="footer-link" title="Visit our Facebook page">
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/handcraftedhaven" rel="noopener noreferrer" target="_blank" className="footer-link" title="Visit our Instagram page">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                </li>
                <li>
                <a href="https://www.pinterest.com/handcraftedhaven" rel="noopener noreferrer" target="_blank" className="footer-link" title="Visit our Pinterest page">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/handcraftedhaven" rel="noopener noreferrer" target="_blank" className="footer-link" title="Visit our Twitter page">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          © 2023 Handcrafted Haven. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

