import GridItem from './GridItem';
import { RawProductForCard } from '@/app/lib/definitions';
import styles from '@/app/ui/products/grid.module.css';

type Props = {
	products: RawProductForCard[];
};

export default function GridProducts({ products }: Props) {
	return (
		<section className={styles.products}>
			{products.map((product) => (
				<GridItem key={product.id} item={product} />
			))}
		</section>
	);
}
