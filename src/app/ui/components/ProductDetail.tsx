import ProductContent from '@/app/ui/components/ProductContent';
import ProductImage from '@/app/ui/components/ProductImage';
import styles from '@/app/ui/components/ProductDetail.module.css';

export default function ProductDetail({ product }) {
	return (
		<div className={styles.cardWrapper}>
			<div className={styles.card}>
				<ProductImage name={product.name} image={product.image} />

				<ProductContent product={product} />
			</div>
		</div>
	);
}
