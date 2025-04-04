"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from "@/app/lib/definitions";

const AddProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    profile_id: '',
    category_id: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to create product.');
      }

      const data = await response.json();
      console.log('Product created:', data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Profile ID:</label>
        <input type="text" name="profile_id" value={product.profile_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Category ID:</label>
        <input type="text" name="category_id" value={product.category_id} onChange={handleChange} required />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
