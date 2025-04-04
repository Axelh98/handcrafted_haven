import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '@/app/ui/components/ProductContent.module.css';

export default function ProductContent({ product }) {
	return (
		<div className={styles.productContent}>
			<h2 className={styles.productTitle}>{product.name}</h2>
			<div className={styles.productRating}>
				{[...Array(Math.floor(product.rating))].map((_, i) => (
					<FontAwesomeIcon key={i} icon={faStar} />
				))}
				{product.rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
				<span>
					{product.rating} ({product.reviews})
				</span>
			</div>

			<div className={styles.productPrice}>
				<p className={styles.newPrice}>
					Price: <span>{product.price}</span>
				</p>
			</div>

			<div className={styles.productDetail}>
				<h2>About this item:</h2>
				<p>{product.description}</p>
			</div>

			<div className={styles.purchaseInfo}>
				{/* <input type='number' min='1' defaultValue='1' /> */}
				<button type='button' className={styles.btn}>
					Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
				</button>
			</div>
		</div>
	);
}
