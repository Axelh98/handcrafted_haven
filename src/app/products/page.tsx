import FilterList from '@/app/ui/products/FilterList';
import GridProducts from '@/app/ui/products/GridProducts';
import { ProductSearch } from '../lib/definitions';
import { fetchFilteredProducts } from '../lib/data';

type PageProps = {
	searchParams?: Promise<ProductSearch>;
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const products = await fetchFilteredProducts(searchParams);

	return (
		<main>
			<FilterList />

			<GridProducts products={products} />
		</main>
	);
}
