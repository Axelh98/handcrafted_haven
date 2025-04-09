'use client';

import { useEffect, useState } from 'react';

export function useClientGetProfiles() {
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfiles() {
      try {
        const res = await fetch('/api/profiles', {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setProfiles(data);
      } catch (error: any) {
        console.error('Error fetching profiles:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getProfiles();
  }, []);

  return { profiles, loading, error };
}
