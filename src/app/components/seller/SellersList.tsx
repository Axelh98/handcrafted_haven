import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';


interface SellerProfile {
	id: string;
	name: string;
	about: string;
	phone: string;
	email: string;
	image_url: string;
	user_id: string;
}


export default function SellersList(
) {
  const [sellers, setSellers] = useState<SellerProfile[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSellers(
) {
      try {
        const fetchedSellers = await supabase.from('sellers').select('*');

        if (fetchedSellers.error) {
          setError(fetchedSellers.error.message || 'An error occurred while fetching sellers.');
          setSellers(undefined);
        } else {
          const transformedSellers: SellerProfile[] = fetchedSellers.data.map((seller) => ({
            ...seller,
            userId: 'user_id' in seller ? seller.user_id : undefined,
          }));

          setSellers(transformedSellers);
          setError(null);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred while fetching sellers.');
        setSellers(undefined);
      }
    }

    fetchSellers();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2>Sellers List</h2>
      {sellers && (
        <ul>
          {sellers.map((seller) => (
            <li key={seller.id}>
              <strong>{seller.name}</strong> - {seller.about}
              {seller.image_url && <img src={seller.image_url} alt={seller.name} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
