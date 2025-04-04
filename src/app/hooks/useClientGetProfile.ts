'use client';

import { useEffect, useState } from 'react';

export function useClientGetProfile(id: number) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch(`/api/profiles?id=${id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [id]);

  return { profile, loading, error };
}