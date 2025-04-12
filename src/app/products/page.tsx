import FilterList from '@/app/ui/products/FilterList';
import Grid from '@/app/ui/Grid';
import { ProductSearch } from '../lib/definitions';
import { fetchFilteredProducts } from '../lib/data';
import gridStyle from '@/app/ui/products/grid.module.css';
import styles from '@/app/ui/products/products.module.css';

type PageProps = {
	searchParams?: Promise<ProductSearch>;
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const products = await fetchFilteredProducts(searchParams);

	return (
		<main className={styles.main}>
			<FilterList />
			<Grid items={products} customStyle={gridStyle.customGrid} />
		</main>
	);
}
