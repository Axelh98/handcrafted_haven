'use client';

import { useEffect, useState } from 'react';
import { Product } from '../lib/definitions';

export function useClientProductsByCategory(categoryId: string) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getProductsByCategory() {
			try {
				const res = await fetch(`/api/products/by-category?categoryId=${categoryId}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setProducts(data);
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching products by category:', error.message);
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getProductsByCategory();
	}, [categoryId]);

	return { products, loading, error };
}
