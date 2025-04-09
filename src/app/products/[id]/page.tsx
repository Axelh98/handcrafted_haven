import { RawProductDetail } from '@/app/lib/definitions';
import { fetchProductById, fetchProductDetail } from '@/app/lib/data';
import DetailImage from '@/app/ui/products/detail/DetailImage';
import DetailPresentation from '@/app/ui/products/detail/DetailPresentation';
import Reviews from '@/app/ui/products/detail/Reviews';
import styles from '@/app/ui/products/detail/detail.module.css';

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;

	const product = await fetchProductById(id);

	return {
		title: product.name || 'Default Title',
		description: product.description || 'Default description for the product.'
	};
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const product: RawProductDetail = await fetchProductDetail(id);

	return (
		<main>
			<section className={styles.detailSection}>
				<DetailImage
					title={product.title}
					image={product.image}
					rating={product.rating}
					count={product.count}
				/>
				<DetailPresentation
					id={id}
					title={product.title}
					description={product.description}
					price={product.price}
					categoryId={product.category_id}
					category={product.category}
					profileId={product.profile_id}
					profile={product.profile}
				/>
			</section>
			<Reviews id={id} />
		</main>
	);
}
