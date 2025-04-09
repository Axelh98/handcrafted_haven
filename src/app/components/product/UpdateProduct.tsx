'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/app/lib/definitions';

interface UpdateProductProps {
  productId: string;
}

export default function UpdateProduct({ productId }: UpdateProductProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

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

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) {
      console.error('Product data is not loaded');
      return;
    }
    const { id, name, description, image_url, price, profile_id, category_id } = product;
    if (!id || !name || !description || !image_url || !price || !profile_id || !category_id) {
      console.error('All product fields must be defined.');
      return;
    }
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      // Producto actualizado exitosamente
      console.log('Producto actualizado exitosamente');
    } else {
      console.error('Error al actualizar el producto');
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

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
      <input
        type="text"
        value={product.image_url || ''}
        onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
        placeholder="URL de la imagen"
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
        type="number"
        value={product.price || 0}
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
        placeholder="Precio"
      />
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}
