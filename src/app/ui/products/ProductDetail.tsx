import ProductContent from '@/app/ui/products/ProductContent';
import ProductImage from '@/app/ui/products/ProductImage';
import styles from '@/app/ui/products/ProductDetail.module.css';
import { RawProductDetail } from '@/app/lib/definitions';

export default function ProductDetail({ product }: { product: RawProductDetail }) {
	return (
		<div className={styles.cardWrapper}>
			<div className={styles.card}>
				<ProductImage name={product.title} image={product.image} />

				<ProductContent product={product} />
			</div>
		</div>
	);
}
