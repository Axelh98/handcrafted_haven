'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string; 
  };
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product); 
    alert(`${product.name} added to the cart!`);
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
