'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import styles from './LandingPage.module.scss';
import classNames from 'classnames';

export default function Navbar() {


  return (
    <nav className={classNames(styles.navbar, styles.container)}>
      <Link href="/pages" className={styles.logo}>
        Handcrafted Haven
      </Link>
      <Search placeholder="Buscar productos" />
      <div className={styles.menu}>
        <ul className={styles.menuInner}>(
            <>
              <li className={styles.menuItem}>
                <Link href="/pages/signUp" className={styles.menuLink}>
                  Sign Up
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/pages/auth/" className={styles.menuLink}>
                  Sign In
                </Link>
              </li>
            </>
          )
          <li className={styles.menuItem}>
            <Link href="/pages" className={styles.menuLink}>
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="pages/productList" className={styles.menuLink}>
              Products
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="pages/sobre-nosotros" className={styles.menuLink}>
              About Us
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="pages/contacto" className={styles.menuLink}>
              Contact
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="pages/Cart" className={styles.menuLink}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}