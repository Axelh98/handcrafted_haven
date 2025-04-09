'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/app/lib/definitions';

interface CreateProductProps {
  profileId: string;
}

export default function CreateProduct({ profileId }: CreateProductProps) {
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    profile_id: '5f1e13c6-fca5-44f6-9347-fd3a9ff9b05f',
    category_id: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar el producto al servidor
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      // Producto creado exitosamente
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={product.name || ''}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        placeholder="Nombre del producto"
      />
      <input
        type="text"
        value={product.description || ''}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        placeholder="Descripción"
      />
      <select
        value={product.category_id || ''}
        onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={product.image_url || ''}
        onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
        placeholder="URL de la imagen"
      />

      <input
        type="number"
        value={product.price || 0}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
        placeholder="Precio"
      />
      <button type="submit">Crear Producto</button>
    </form>
  );
}
