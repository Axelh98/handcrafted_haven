/** @use client */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import SellerCard from '../components/seller/SellerCard';

interface SellerProfile {
  id: string;
  name: string;
  about: string;
  phone: string;
  email: string;
  imageUrl?: string;
  userId: string;
}

const SellersPage = (
) => {
  const [sellers, setSellers] = useState<SellerProfile[]>([]);

  useEffect(() => {
    const fetchSellers = async (): Promise<void> => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (error) {
        console.error(`Error fetching sellers: ${error}`);
        return;
      }

      const { data: sellerData, error: sellerError } = await supabase
        .from('sellers')
        .select()
        .match({ userId: String(user?.id) });

      if (sellerError) {
        console.error(`Error fetching sellers: ${sellerError}`);
        return;
      }

      setSellers(sellerData ?? []);
    };

    fetchSellers();
  }, []);

  return (
    <div className="sellers-page">
      <h1>Sellers</h1>
      {sellers.map((seller) => (
        <SellerCard key={seller.id} seller={seller} />
      ))}
    </div>
  );
};

export default SellersPage;
