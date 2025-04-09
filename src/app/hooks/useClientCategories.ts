'use client';

import { useEffect, useState } from 'react';
import { Category } from '../lib/definitions';

export function useClientCategories() {
	const [categories, setCategories] = useState<Category[]>([]);

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
