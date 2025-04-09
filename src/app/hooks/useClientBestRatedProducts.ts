import { useEffect, useState } from 'react';
import { ProductForCard } from '../lib/definitions';

export type Params = { qty: string; profile?: string };

export function useClientBestRatedProducts(params: Params) {
	const [products, setProducts] = useState<ProductForCard[]>([]);

	const searchParams = new URLSearchParams(params);

	useEffect(() => {
		async function getProducts() {
			const res = await fetch(`/api/products/rated?${searchParams}`, {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setProducts(data);
		}

		getProducts();
	}, []);

	return { products };
}
