'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
	useClientSearchFromAnywhere,
	useClientSearchInProducts
} from '@/app/hooks/useClientSearch';
import styles from './search.module.css';

export default function Search({ placeholder }: { placeholder: string }) {
	const { state, formAction } = useClientSearchFromAnywhere();
	const { query, handleChange } = useClientSearchInProducts();

	return (
		<>
			<form action={formAction} onChange={handleChange} className={styles.searchForm}>
				<input
					id='search'
					name='query'
					className={styles.searchInput}
					placeholder={placeholder}
					value={query}
				/>
				<MagnifyingGlassIcon className={styles.searchIcon} />
			</form>
			{state.errors?.query && state.errors.query.map((error: string) => console.error(error))}
		</>
	);
}
