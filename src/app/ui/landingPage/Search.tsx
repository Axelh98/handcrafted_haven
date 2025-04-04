'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useClientSearchFromAnywhere, useClientSearchFromHome } from '@/app/hooks/useClientSearch';
import styles from './search.module.css';

export default function Search({ placeholder }: { placeholder: string }) {
	const { state, formAction } = useClientSearchFromHome();
	const { defaultValue, isHome, handleChange, fallback } = useClientSearchFromAnywhere();

	return (
		<>
			<form
				action={formAction}
				onChange={!isHome ? handleChange : fallback}
				className={styles.searchForm}>
				<input
					id='search'
					name='query'
					className={styles.searchInput}
					placeholder={placeholder}
					value={defaultValue}
				/>
				<MagnifyingGlassIcon className={styles.searchIcon} />
			</form>
			{state.errors?.query && state.errors.query.map((error: string) => console.error(error))}
		</>
	);
}
