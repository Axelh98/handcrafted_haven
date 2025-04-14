'use client';

import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
// import { useState, useEffect } from 'react';

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

interface SellerCardProps {
  seller: {
    id: string;
    name: string;
    about: string;
    phone: string;
    email: string;
    imageUrl?: string;
    userId: string;
  };
}

const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <CardGrid>
      <Box m={1}>
        {seller.imageUrl ? (
          <img src={seller.imageUrl} alt="Seller Image" />
        ) : (
          <Box bgcolor="background.default" />
        )}
      </Box>
      <Grid container>
        <Grid>
          <CardDetails>
            <Typography variant="h5" gutterBottom>
              {seller.name}
            </Typography>
            <Typography variant="subtitle1">{seller.about}</Typography>
            <Typography variant="subtitle1">{seller.phone}</Typography>
            <Typography variant="subtitle1">{seller.email}</Typography>
          </CardDetails>
        </Grid>
      </Grid>
    </CardGrid>
  );
};

export default SellerCard;



