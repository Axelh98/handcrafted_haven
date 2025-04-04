'use client';

import { useActionState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchFromHome, State } from '@/app/lib/actions';
import styles from './search.module.css';

export default function Search({
	placeholder,
	defaultValue = ''
}: {
	placeholder: string;
	defaultValue: string;
}) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(searchFromHome, initialState);

	return (
		<>
			<form action={formAction} className={styles.searchForm}>
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
