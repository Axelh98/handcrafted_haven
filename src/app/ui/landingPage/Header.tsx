
import Link from 'next/link'
import styles from './LandingPage.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
          <div className={styles.logo}>
            <Link href="/">
                Handcrafted Haven
            </Link>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <div className={styles.cart}>
            <Link href="/carrito">
              🛒 Carrito
            </Link>
          </div>
        </header>
      );
};
    