'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RawProductForCard } from '@/app/lib/definitions';
import { formatCurrency } from '../lib/utils';

export default function ProductCard({ product }: { product: RawProductForCard }) {
	return (
		<div className='carousel-slide'>
			<div className='carousel-image-container'>
				<Image
					src={`/images${product.image_url}`}
					alt={`${product.name} image`}
					width={100}
					height={100}
				/>
			</div>
			<div className='carousel-details'>
				<p className='carousel-title'>{product.name}</p>
				<p className='carousel-price'>{formatCurrency(product.price)}</p>
				<Link href={`/sellers/${product.profile_id}`} className='carousel-description'>
					{product.profile_name}
				</Link>
				<Link href={`/products/${product.id}`} className='carousel-button'>
					Read More
				</Link>
			</div>
		</div>
	);
}
