'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from '../lib/definitions';

export function useClientFilters(searchParams: Search) {
	const pathname = usePathname();
	const { replace } = useRouter();

	const initialState =
		Object.keys(searchParams).length !== 0
			? searchParams
			: { category: '', minPrice: 0, seller: '' };

	const [filters, setFilters] = useState<Search>(initialState);
	const [currentPrice, setCurrentPrice] = useState<number>(initialState.minPrice || 0);

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;

		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value
		}));
	};

	const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value);
		setCurrentPrice(value);

		debouncedUpdateFilters(value);
	};

	const debouncedUpdateFilters = useDebouncedCallback((value: number) => {
		setFilters((prev) => ({
			...prev,
			minPrice: value
		}));
	}, 300);

	const debouncedParamsChange = useDebouncedCallback(() => {
		const cleanFilters = Object.fromEntries(Object.entries(filters).filter((entry) => !!entry[1]));
		const newParams = new URLSearchParams(cleanFilters as Record<string, string>);

		replace(`${pathname}?${newParams.toString()}`);
	}, 300);

	useEffect(debouncedParamsChange, [filters]);

	return {
		handleFilterChange,
		handleRangeChange,
		currentPrice,
		filters
	};
}
