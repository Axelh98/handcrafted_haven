'use client';

import Slider from 'react-slick';
import { Params, useClientBestRatedProducts } from '@/app/hooks/useClientBestRatedProducts';
import ProductCard from '@/app/ui/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css';

type Props = { params: Params };

export default function Carousel({ params }: Props) {
	const { products } = useClientBestRatedProducts(params);

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
