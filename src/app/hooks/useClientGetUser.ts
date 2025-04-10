'use client';

import { useEffect, useState } from 'react';
import { User } from '../lib/definitions';

export function useClientGetUser(id: number) {
	const [user, setUser] = useState<User>({} as User);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getUser() {
			try {
				const res = await fetch(`/api/users?id=${id}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setUser(data);
			} catch (err) {
				if (err instanceof Error) {
					console.error('Error fetching user:', err.message);
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getUser();
	}, [id]);

	return { user, loading, error };
}
