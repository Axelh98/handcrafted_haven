/** @use client */
import { supabase } from '@/app/lib/supabaseClient';
import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';

const CardGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto 1fr',
  gridGap: '10px',
});

const CardDetails = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '10px',
  padding: '10px',
});

interface SellerProfile {
  id: string;
  name: string;
  about: string;
  phone: string;
  email: string;
  imageUrl: string;
}

interface SellerCardProps {
    id?: string; // Make id optional by adding '?'
    profile: SellerProfile;
  }

const SellerCard = ({ id }: SellerCardProps) => {
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | undefined>();

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

      setSellerProfile(data);
    };

    fetchSellerProfile();
  }, [id]);

  if (!sellerProfile) {
    return <div>Loading seller profile...</div>;
  }

  return (
    <CardGrid>
      <Box m={1}>
        {sellerProfile.imageUrl ? (
          <img src={sellerProfile.imageUrl} alt="Seller Image" />
        ) : (
          <Box bgcolor="background.default" />
        )}
      </Box>
      <Grid container>
        <Grid>
          <CardDetails>
            <Typography variant="h5" gutterBottom>
              {sellerProfile.name}
            </Typography>
            <Typography variant="subtitle1">{sellerProfile.about}</Typography>
            <Typography variant="subtitle1">{sellerProfile.phone}</Typography>
            <Typography variant="subtitle1">{sellerProfile.email}</Typography>
          </CardDetails>
        </Grid>
      </Grid>
    </CardGrid>
  );
};

export default SellerCard;
