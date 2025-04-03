import styles from './hero.module.css';

export default function HeroSection() {
	return (
		<section className={styles.hero}>
			<picture className={styles.heroImage}>
				<source srcSet='/images/hero.webp' media='(min-width: 1024px)' />
				<source srcSet='/images/hero-medium.webp' media='(min-width: 768px)' />
				<img src='/images/hero-small-2.webp' alt='Welcome to Handcrafted Haven' loading='lazy' />
			</picture>
			<div className={styles.textContainer}>
				<h1 className={styles.title}>Discover the best handmade products.</h1>
				<br />
				<a href='#carousel' className={styles.ctaButton}>
					Explore Products
				</a>
			</div>
		</section>
	);
}
