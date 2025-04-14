import FilterList from '@/app/ui/products/FilterList';
import Grid from '@/app/ui/Grid';
import { Search } from '../lib/definitions';
import { fetchBoundPrices, fetchFilteredProducts } from '../lib/data';
import gridStyle from '@/app/ui/products/grid.module.css';
import styles from '@/app/ui/products/products.module.css';

type PageProps = {
	searchParams?: Promise<Search>;
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const products = await fetchFilteredProducts(searchParams);
	const boundPrices = await fetchBoundPrices(searchParams);

	return (
		<main className={styles.main}>
			<FilterList currentParams={searchParams} boundPrices={boundPrices} />
			<Grid items={products} customStyle={gridStyle.customGrid} />
		</main>
	);
}
