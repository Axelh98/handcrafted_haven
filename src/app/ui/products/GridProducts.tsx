'use client';

import { RawProductForCard } from '@/app/lib/definitions';
import './ProductListPage.css';
import ProductCard from '../ProductCard';

type Props = {
	products: RawProductForCard[];
};

export default function GridProducts({ products }: Props) {
	return (
		<div className='products'>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
				// <div key={product.id} className='product-card'>
				// 	<div className='product-image'>
				// 		<img src={product.imageUrl} alt='card-image' />
				// 		<link rel='stylesheet' href='/productDetail' />
				// 	</div>
				// 	<div className='product-details'>
				// 		<div className='product-title'>
				// 			<p>{product.name}</p>
				// 			<p className='product-price'>{product.price}</p>
				// 		</div>
				// 		<p className='product-description'>{product.description}</p>
				// 		<button className='add-to-cart-button' type='button'>
				// 			Add to Cart
				// 		</button>
				// 	</div>
				// </div>
			))}
		</div>
	);
}
