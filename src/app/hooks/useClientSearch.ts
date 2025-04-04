import { ChangeEvent, useActionState } from 'react';
import { searchFromHome, State } from '@/app/lib/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function useClientSearchFromHome() {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(searchFromHome, initialState);

	return { state, formAction };
}

export function useClientSearchFromAnywhere() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

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
		handleSearch(e.target.value);
	};

	const isHome = pathname === '/';

	const defaultValue = searchParams.get('q')?.toString();

	return {
		defaultValue,
		isHome,
		handleChange,
		fallback: (e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
		}
	};
}
