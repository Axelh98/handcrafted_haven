import { Metadata } from 'next';
import VoidReturn from '../ui/VoidReturn';
import Grid from '../ui/Grid';
import { Search } from '../lib/definitions';
import { fetchFilteredSellers } from '../lib/data';
import custom from '@/app/ui/sellers/custom.module.css';
import styles from '@/app/ui/sellers/sellers.module.css';

type PageProps = {
	searchParams?: Promise<Search>;
};

export const metadata: Metadata = {
	title: 'Search Sellers'
};

export default async function Page(props: PageProps) {
	const searchParams = (await props.searchParams) || {};

	const profiles = await fetchFilteredSellers(searchParams);

	const isVoid = profiles.length === 0;

	return (
		<main className={styles.main}>
			{isVoid && (
				<VoidReturn message='No sellers found! Try again.' customStyle={custom.customError} />
			)}
			{!isVoid && <Grid items={profiles} customStyle={custom.customGrid} />}
		</main>
	);
}
