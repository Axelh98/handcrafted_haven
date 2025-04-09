import { useEffect, useState } from 'react';

export type Params = { qty: number; profile?: string };

export function useClientBestRatedProducts(params: Params) {
	const [products, setProducts] = useState([]);

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
