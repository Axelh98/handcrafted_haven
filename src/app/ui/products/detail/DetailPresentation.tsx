import Link from 'next/link';
import { formatCurrency } from '@/app/lib/utils';
import styles from '@/app/ui/products/detail/DetailPresentation.module.css';

type Props = {
	id: string;
	title: string;
	description: string;
	price: number;
	categoryId: string;
	category: string;
	profileId: string;
	profile: string;
};

export default function DetailPresentation({
	id,
	title,
	description,
	price,
	categoryId,
	category,
	profileId,
	profile
}: Props) {
	console.log(id);

	return (
		<article className={styles.detailPresentation}>
			<Link href={`/products?category=${categoryId}`}>
				<h5>{category}</h5>
			</Link>
			<h2>{title}</h2>
			<h4>
				Seller: <Link href={`/sellers/${profileId}`}>{profile}</Link>
			</h4>
			<p className={styles.description}>
				<b>Description:</b> {description}
			</p>
			<p>
				<b>{formatCurrency(price)}</b>
			</p>
			<form>
				<button>Add to cart</button>
				<button>Add to wishlist</button>
			</form>
		</article>
	);
}
