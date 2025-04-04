'use client';

import { useEffect, useState } from 'react';

export function useClientProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getProducts() {
			const res = await fetch('/api/products', {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setProducts(data);
		}

        // mostrar en consola
        console.log('Products:', products);

		getProducts();
	}, []);

	return { products };
}