'use client';

import { useEffect, useState } from 'react';

export function useClientProduct(id: number) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(`/api/products?id=${id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  return { product, loading, error };
}
