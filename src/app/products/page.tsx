import { Metadata } from 'next';
import FilterList from '@/app/ui/products/FilterList';
import VoidReturn from '../ui/VoidReturn';
import Grid from '@/app/ui/Grid';
import { Search } from '../lib/definitions';
import { fetchBoundPrices, fetchFilteredProducts } from '../lib/data';
import custom from '@/app/ui/products/custom.module.css';
import styles from '@/app/ui/products/products.module.css';

type PageProps = {
	searchParams?: Promise<Search>;
};

export const metadata: Metadata = {
	title: 'Search Products'
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const products = await fetchFilteredProducts(searchParams);
	const boundPrices = await fetchBoundPrices(searchParams);

	const isVoid = products.length === 0;

	return (
		<main className={styles.main}>
			<FilterList currentParams={searchParams} boundPrices={boundPrices} />
			{isVoid && (
				<VoidReturn message='No products found! Try again.' customStyle={custom.customError} />
			)}
			{!isVoid && <Grid items={products} customStyle={custom.customGrid} />}
		</main>
	);
}
