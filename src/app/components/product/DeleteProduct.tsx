'use client'
import { useState } from 'react';

interface DeleteProductProps {
  productId: string;
}

export default function DeleteProduct({ productId }: DeleteProductProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setIsDeleted(true);
    }
  };

  return (
    <div>
      {isDeleted ? (
        <p>Producto eliminado</p>
      ) : (
        <button onClick={handleDelete}>Eliminar Producto</button>
      )}
    </div>
  );
}
