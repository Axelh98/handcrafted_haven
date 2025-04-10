'use client';

import { useEffect, useState } from 'react';
import { SellerProfile } from '../lib/definitions';

export function useClientGetProfiles() {
	const [profiles, setProfiles] = useState<SellerProfile[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getProfiles() {
			try {
				const res = await fetch('/api/profiles', {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setProfiles(data);
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching profiles:', error.message);
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getProfiles();
	}, []);

	return { profiles, loading, error };
}
