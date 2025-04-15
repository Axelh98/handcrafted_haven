'use client';

import { useCart } from '@/app/context/CartContext';
import './checkbutton.css'


export default function CheckoutButton() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems: cart }) // Asegúrate de que cart esté bien estructurado
    });
  
    const data = await response.json();
    console.log("Respuesta del servidor:", data); // Ver la respuesta del servidor
  
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert('Ocurrió un error al iniciar el pago');
    }
  };
  

  return (
    <button onClick={handleCheckout} className="checkout-btn">
      Finalizar compra
    </button>
  );
}
