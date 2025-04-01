'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';
import classNames from 'classnames';

export default function Navbar() {
	return (
		<nav className=''>
			<ul className={styles.menuInner}>
				<li className={styles.menuItem}>
					<Link href='/productList' className={styles.menuLink}>
						Products
					</Link>
				</li>
				<li className={styles.menuItem}>
					<Link href='/sobre-nosotros' className={styles.menuLink}>
						About Us
					</Link>
				</li>
				<li className={styles.menuItem}>
					<Link href='/contacto' className={styles.menuLink}>
						Contact
					</Link>
				</li>
				<li className={styles.menuItem}>
					<Link href='/Cart' className={styles.menuLink}>
						<FontAwesomeIcon icon={faShoppingCart} />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
