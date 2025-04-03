'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';
import ProductCard from './ProductCard';

export default function Carousel() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getProducts() {
			const res = await fetch('/api/rated-products', {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setProducts(data);
		}

		getProducts();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true
	};

	return (
		<div className='container' id='carousel'>
			<Slider {...settings}>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Slider>
		</div>
	);
}
