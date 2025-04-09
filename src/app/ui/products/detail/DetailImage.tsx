import Image from 'next/image';
import Rating from './Rating';
import styles from './DetailImage.module.css';
import ReviewCount from './ReviewCount';

export default async function DetailImage({
	title,
	image,
	rating,
	count
}: {
	title: string;
	image: string;
	rating: number;
	count: number;
}) {
	return (
		<figure className={styles.detailImage}>
			<Image src={`/images${image}`} alt={`${title} image`} width={200} height={200} />
			<figcaption>
				<Rating avg={rating} className={styles.badge} />
				<ReviewCount count={count} className={styles.badge} />
			</figcaption>
		</figure>
	);
}
