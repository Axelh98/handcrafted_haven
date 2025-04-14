'use client';

import { useEffect, useState } from 'react';
import { User } from '../lib/definitions';

export function useClientGetUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getUsers() {
			try {
				const res = await fetch('/api/users', {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setUsers(data);
			} catch (err) {
				if (err instanceof Error) {
					console.error('Error fetching users:', err.message);
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getUsers();
	}, []);

	return { users, loading, error };
}
