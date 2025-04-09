import { ChangeEvent, useActionState, useState, useEffect, useRef } from 'react';
import { searchFromHome, State } from '@/app/lib/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function useClientSearchFromAnywhere() {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(searchFromHome, initialState);

	return { state, formAction };
}

export function useClientSearchInProducts() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const [query, setQuery] = useState<string>(searchParams.get('q')?.toString() || '');
	const isFirstInput = useRef<boolean>(true);

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		params.set('page', '1');

		if (term) {
			params.set('q', term);
		} else {
			params.delete('q');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		const isProducts = pathname === '/products';
		if (newQuery === ' ') return;
		setQuery(newQuery);

		if (isProducts) handleSearch(newQuery);
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
