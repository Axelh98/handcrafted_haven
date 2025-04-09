'use client';

import { useEffect, useState } from 'react';

interface Review {
  // Define the structure of a review object
  id: string;
  content: string;
  // Add other relevant fields
}

export function useClientReviews(id: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [iteration, setIteration] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getTotalPages() {
      const res = await fetch(`/api/products/${id}/reviews/pages`, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      setTotalPages(data);
    }

    getTotalPages();
  }, [id]);

  useEffect(() => {
    async function getCategories() {
      if (iteration <= totalPages) {
        const res = await fetch(`/api/products/${id}/reviews/${iteration}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        setReviews((prevState) => {
          return [...prevState, ...data];
        });
      }
    }

    getCategories();
  }, [iteration, totalPages, id]);

  const reqMoreReviews = () => {
    setIteration((prevState) => prevState + 1);
  };

  return { reviews, reqMoreReviews, isLast: iteration === totalPages };
}

