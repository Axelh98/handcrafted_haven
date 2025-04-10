'use client';

import { useEffect, useState } from 'react';
import { SellerProfile } from '../lib/definitions';

export function useClientGetProfile(id: number) {
	const [profile, setProfile] = useState<SellerProfile>({} as SellerProfile);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		async function getProfile() {
			try {
				const res = await fetch(`/api/profiles?id=${id}`, {
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setProfile(data);
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error fetching profile:', error.message);
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}

		getProfile();
	}, [id]);

	return { profile, loading, error };
}
