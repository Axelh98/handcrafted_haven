import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { fontHeading } from '@/app/ui/fonts';
import ShopCart from '@/app/ui/layout/ShopCart';
import Search from '@/app/ui/layout/Search';
import Navbar from '@/app/ui/layout/ClientNavbar';
import CategoryList from '@/app/ui/layout/CategoryList';
import styles from '@/app/ui/layout/header.module.css';

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
			<Suspense fallback={<div>Loading...</div>}>
				<Search placeholder='Search products...' />
			</Suspense>
			<Navbar>
				<CategoryList summary='Products' />
				<Link href='/sellers' className='link'>
					Sellers
				</Link>
				<Link href='/contact' className='link'>
					Contact
				</Link>
				<ShopCart />
			</Navbar>
		</header>
	);
}
