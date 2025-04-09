'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ShopCart() {
	return (
		<Link href='/cart' className='link'>
			<FontAwesomeIcon icon={faShoppingCart} />
		</Link>
	);
}
