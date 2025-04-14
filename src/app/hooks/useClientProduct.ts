'use client';

import { useEffect, useState } from 'react';
import { Product } from '../lib/definitions';

export function useClientProduct(id: number) {
	const [product, setProduct] = useState<Product>({} as Product);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getProduct() {
			try {
				const res = await fetch(`/api/products?id=${id}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setProduct(data);
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching product:', error.message);
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getProduct();
	}, [id]);

	return { product, loading, error };
}
