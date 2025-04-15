'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import "./Cart.css";

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
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  };

  return (
    <div className='wrapper'>
      <button onClick={handleClick}>Add to Cart</button>
      {showMessage && (
        <span className='message'>✔ Added to cart!</span>
      )}
    </div>
  );
}
