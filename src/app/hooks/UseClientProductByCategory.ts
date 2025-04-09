'use client';

import { useEffect, useState } from 'react';

export function useClientProductsByCategory(categoryId: string) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getProductsByCategory() {
      try {
        const res = await fetch(`/api/products/by-category?categoryId=${categoryId}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setProducts(data);
      } catch (error: any) {
        console.error('Error fetching products by category:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getProductsByCategory();
  }, [categoryId]);

  return { products, loading, error };
}
