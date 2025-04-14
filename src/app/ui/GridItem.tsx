import Link from 'next/link';
import Image from 'next/image';
import { RawProductForCard, SellerProfile } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import styles from '@/app/ui/GridItem.module.css';

type Props = {
	item: RawProductForCard | SellerProfile;
};

export default function GridItem({ item }: Props) {
	const isProduct = 'price' in item;

	return (
		<article className={styles.card}>
			<div className={styles.cardImage}>
				<Image
					src={`/images${item.image_url}`}
					alt={`${item.name} image`}
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.cardDetail}>
				<div className={styles.title}>
					<p>{item.name}</p>
					{isProduct && <p className={styles.price}>{formatCurrency(item.price)}</p>}
				</div>
				{isProduct && (
					<p className={styles.profile}>
						<Link href={`/sellers/${item.profile_id}`}>{item.profile_name}</Link>
					</p>
				)}
				<p className={styles.link}>
					<Link href={`/${isProduct ? 'products' : 'sellers'}/${item.id}`}>See more</Link>
				</p>
			</div>
		</article>
	);
}
