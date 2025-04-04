import Image from 'next/image';
import styles from '@/app/ui/components/ProductImage.module.css';

export default function ProductImage({ name, image }: { name: string; image: string }) {
	return (
		<div className={styles.productImgs}>
			<div className={styles.imgDisplay}>
				<div className={styles.imgShowcase}>
					<Image src={image} alt={`${name} image`} width={100} height={100} />
				</div>
			</div>
		</div>
	);
}
