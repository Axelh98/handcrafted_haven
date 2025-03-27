
import styles from './LandingPage.module.scss'
import CarouselCard  from './carouselHero'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImage}>
        <img src="/landingPage/heroImage.jpg" alt="hero image" />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome to Handcrafted Haven</h1>
        <p className={styles.subtitle}>Descubre los mejores productos hechos a mano</p>
        <button className={styles.ctaButton}>Explorar Productos</button>
      </div>
    </section>
  );
}