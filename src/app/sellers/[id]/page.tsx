'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/app/lib/supabaseClient';
import ContactInfo from '@/app/ui/sellers/profile/ContactInfo';
import Carousel from '@/app/ui/Carousel';
import SellerCard from '@/app/ui/sellers/profile/SellerCard';

type SellerProfile = {
  id: string;
  name: string;
  about: string;
  phone: string;
  email: string;
  imageUrl: string;
};

const Page = (
) => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<SellerProfile | undefined>();

  useEffect(() => {
    const fetchSellerProfile = async (): Promise<void> => {
      const { data, error } = await supabase
        .from('sellers')
        .select()
        .match({ id })
        .single();

      if (error) {
        console.error(`Error fetching seller profile: ${error}`);
        return;
      }

      setProfile(data);
    };

    fetchSellerProfile();
  }, [id]);

  return (
    <main>
      {/* Pass the id prop to SellerCard */}
      <section>
        {profile && typeof id === 'string' && <SellerCard id={id} profile={profile} />}
      </section>
      <section>
        <h2>Top Products</h2>
        {profile && <Carousel params={{ qty: '6', profile: profile.id }} />}
        {profile && <Link href={`/products?seller=${profile.id}`}>See more...</Link>}
      </section>
    </main>
  );
};

export default Page;
