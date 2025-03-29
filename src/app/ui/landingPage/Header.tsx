import styles from './LandingPage.module.scss'
import Navbar from './Navbar' // Import the Navbar component from the Navbar.tsx file 

export default function Header() {
    return (
        <header className={styles.header}>
          <Navbar></Navbar>
        </header>
    );
};
