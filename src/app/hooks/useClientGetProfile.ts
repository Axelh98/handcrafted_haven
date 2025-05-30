'use client';

import { useEffect, useState } from 'react';
import { SellerProfile } from "@/app/lib/definitions"; // 👈 importa el tipo correcto

export function useClientGetProfile(id: number) {
  const [profile, setProfile] = useState<SellerProfile | null>(null); // 👈 tipo explícito
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
          setError(error); // ✅ corregido: se pasa el objeto Error completo
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) getProfile();
  }, [id]);

  return { profile, loading, error };
}
