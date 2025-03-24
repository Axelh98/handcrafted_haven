import Link from 'next/link'
import styles from './LandingPage.module.scss'
import classNames from 'classnames';
import Search from './Search'

export default function Header() {
    return (
        <header className={styles.header}>
          <nav className={classNames(styles.navbar, styles.container)}>
            <Link href="/" className={styles.logo}>
                Handcrafted Haven
            </Link>
            <Search placeholder="Buscar productos" />
            <div className={styles.menu}>
              <ul className={styles.menuInner}>
                <li className={styles.menuItem}>
                  <Link href="/" className={styles.menuLink}>
                    Inicio
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="/productos" className={styles.menuLink}>
                    Productos
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="/sobre-nosotros" className={styles.menuLink}>
                    Sobre Nosotros
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="/contacto" className={styles.menuLink}>
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    );
};
