import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { searchFromHome, State } from '@/app/lib/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useActionState } from 'react';

export function useClientSearchFromAnywhere() {
	const initialState: State = { message: '', errors: {} };
	const [state, formAction] = useActionState(
		searchFromHome as (state: State, payload: FormData) => Promise<State>,
		initialState
	);

	return { state, formAction };
}

export function useClientSearchInProducts() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const [query, setQuery] = useState<string>(searchParams.get('query')?.toString() || '');
	const isFirstInput = useRef<boolean>(true);

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		params.set('page', '1');

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const isProdsOrSells = pathname === '/products' || pathname === '/sellers';
		if (newQuery === ' ') return;
		setQuery(newQuery);

		if (isProdsOrSells) handleSearch(newQuery);
	};

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = query === '';
			return;
		}

		return;
	}, [query]);

	return {
		query,
		handleChange
	};
}
