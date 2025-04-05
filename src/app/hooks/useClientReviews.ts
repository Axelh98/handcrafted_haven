'use client';

import { useEffect, useState } from 'react';

export function useClientReviews(id: string) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		async function getCategories() {
			const res = await fetch(`/api/products/${id}/reviews`, {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setReviews(data);
		}

		getCategories();
	}, []);

	return { reviews };
}
