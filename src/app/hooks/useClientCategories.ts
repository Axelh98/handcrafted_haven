'use client';

import { useEffect, useState } from 'react';

export function useClientCategories() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function getCategories() {
			const res = await fetch('/api/categories', {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setCategories(data);
		}

		getCategories();
	}, []);

	return { categories };
}
