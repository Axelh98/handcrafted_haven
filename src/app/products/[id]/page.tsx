import { fetchProduct } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { RawProductDetail } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import RatingAverage from '@/app/ui/products/RatingAverage';
import Reviews from '@/app/ui/products/Reviews';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const product: RawProductDetail = await fetchProduct(id);

	return (
		<main>
			<section>
				<figure>
					<Image
						src={`/images${product.image}`}
						alt={`${product.title} image`}
						width={100}
						height={100}
					/>
					<figcaption>
						<RatingAverage avg={product.rating} />
					</figcaption>
				</figure>
				<article>
					<Link href={`/products?category=${product.category_id}`}>
						<h5>{product.category}</h5>
					</Link>
					<h2>{product.title}</h2>
					<Link href={`/profiles/${product.profile_id}`}>
						<h4>{product.profile}</h4>
					</Link>
					<p>
						<b>Description:</b> {product.description}
					</p>
					<p>
						<b>{formatCurrency(product.price)}</b>
					</p>
					<form>
						<button>Add to cart</button>
						<button>Add to wishlist</button>
					</form>
				</article>
			</section>
			<Reviews id={id} />
		</main>
	);
}
