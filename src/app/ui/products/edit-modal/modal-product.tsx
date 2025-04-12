'use client';

import React from 'react';
import './modal.css'; 
import { Product } from '@/app/lib/definitions';

interface ProductEditModalProps {
  product: Product;
  onClose: () => void;
  onChange: (updatedProduct: Product) => void;
  onSubmit: () => void;
}

export default function ProductEditModal({
  product,
  onClose,
  onChange,
  onSubmit,
}: ProductEditModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Edit Product</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="modal-form"
        >
          <img
            src={`/images${product.image_url}`}
            alt={product.name}
            className="modal-image"
          />

          <label>
            Name:
            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                onChange({ ...product, name: e.target.value })
              }
            />
          </label>

          <label>
            Description:
            <textarea
              value={product.description}
              onChange={(e) =>
                onChange({ ...product, description: e.target.value })
              }
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                onChange({ ...product, price: Number(e.target.value) })
              }
            />
          </label>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
