import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import CategoryList from './CategoryList';
import Search from './Search';
import { fontHeading } from '../fonts';
import styles from './header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href='/' className='link'>
				<figure className={styles.logo}>
					<Image src='/images/logo.webp' width={70} height={70} alt='Handcrafted Haven logo' />
					<figcaption>
						<p className={fontHeading.className}>Handcrafted Haven</p>
					</figcaption>
				</figure>
			</Link>
			<Search placeholder='Search products...' />
			<Navbar>
				<CategoryList summary='Products' />
				<Link href='/about' className='link'>
					About Us
				</Link>
				<Link href='/contact' className='link'>
					Contact
				</Link>
				<Link href='/cart' className='link'>
					<FontAwesomeIcon icon={faShoppingCart} />
				</Link>
			</Navbar>
		</header>
	);
}
