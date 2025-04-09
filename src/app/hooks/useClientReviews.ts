'use client';

import { useEffect, useState } from 'react';
import { ReviewForCard } from '../lib/definitions';

export function useClientReviews(id: string) {
	const [reviews, setReviews] = useState<ReviewForCard[]>([]);
	const [iteration, setIteration] = useState<number>(1);

	const [totalPages, setTotalPages] = useState<number>(1);

	useEffect(() => {
		async function getTotalPages() {
			const res = await fetch(`/api/products/${id}/reviews/pages`, {
				headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();

			setTotalPages(data);
		}

		getTotalPages();
	}, []);

	useEffect(() => {
		async function getReviews() {
			if (iteration <= totalPages) {
				const res = await fetch(`/api/products/${id}/reviews/${iteration}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();

				setReviews((prevState) => {
					return [...prevState, ...data];
				});
			}
		}

		getReviews();
	}, [iteration]);

	const reqMoreReviews = () => {
		setIteration((prevState) => prevState + 1);
	};

	return { reviews, reqMoreReviews, isLast: iteration === totalPages };
}
