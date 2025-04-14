import Grid from '../ui/Grid';
import { Search } from '../lib/definitions';
import { fetchFilteredSellers } from '../lib/data';
import gridStyle from '@/app/ui/sellers/grid.module.css';
import styles from '@/app/ui/sellers/sellers.module.css';

type PageProps = {
	searchParams?: Promise<Search>;
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const profiles = await fetchFilteredSellers(searchParams);

	return (
		<main className={styles.main}>
			<Grid items={profiles} customStyle={gridStyle.customGrid} />
		</main>
	);
}
