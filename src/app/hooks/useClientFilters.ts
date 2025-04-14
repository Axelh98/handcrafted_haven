'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { ProductSearch } from '../lib/definitions';

export function useClientFilters(searchParams: ProductSearch) {
	const pathname = usePathname();
	const { replace } = useRouter();

	const initialState =
		Object.keys(searchParams).length !== 0
			? searchParams
			: { category: '', minPrice: 0, seller: '' };

	const [filters, setFilters] = useState<ProductSearch>(initialState);

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = event.target;

		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value
		}));
	};

	const debouncedParamsChange = useDebouncedCallback(() => {
		const cleanFilters = Object.fromEntries(Object.entries(filters).filter((entry) => !!entry[1]));
		const newParams = new URLSearchParams(cleanFilters as Record<string, string>);

		replace(`${pathname}?${newParams.toString()}`);
	});

	useEffect(debouncedParamsChange, [filters]);

	return { handleFilterChange };
}
