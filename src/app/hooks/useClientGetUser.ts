'use client';

import { useEffect, useState } from 'react';

export function useClientGetUser(id: number) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function getUser() {
			try {
				const res = await fetch(`/api/users?id=${id}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setUser(data);
			} catch (err) {
				console.error('Error fetching user:', err.message);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		getUser();
	}, [id]);

	return { user, loading, error };
}
