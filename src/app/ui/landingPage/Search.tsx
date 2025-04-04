'use client';

import { ChangeEvent, useActionState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchFromHome, State } from '@/app/lib/actions';
import styles from './search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(searchFromHome, initialState);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		// params.set('page', '1');

		if (term) {
			params.set('q', term);
		} else {
			params.delete('q');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleSearch(e.target.value);
	};

	const isHome = pathname === '/';

	return (
		<>
			<form
				action={formAction}
				onChange={
					!isHome
						? handleChange
						: (e: ChangeEvent<HTMLInputElement>) => {
								e.preventDefault();
						  }
				}
				className={styles.searchForm}>
				<input
					id='search'
					name='query'
					className={styles.searchInput}
					placeholder={placeholder}
					value={searchParams.get('q')?.toString()}
				/>
				<MagnifyingGlassIcon className={styles.searchIcon} />
			</form>
			{state.errors?.query && state.errors.query.map((error: string) => console.error(error))}
		</>
	);
}
