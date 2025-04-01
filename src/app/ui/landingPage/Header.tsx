import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import Search from './Search';
import { fontHeading } from '../fonts';
import styles from './header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href='/' className={styles.link}>
				<figure className={styles.logo}>
					<Image src='/images/logo.webp' width={70} height={70} alt='Handcrafted Haven logo' />
					<figcaption>
						<p className={fontHeading.className}>Handcrafted Haven</p>
					</figcaption>
				</figure>
			</Link>
			{/* <Search placeholder='Buscar productos' /> */}
			<Navbar></Navbar>
		</header>
	);
}
