'use client';

import { Product } from "@/app/lib/definitions";

interface ProductListProps {
  products: Product[];
  onDetailClick: (product: Product) => void;
}

export default function ProductList({ products, onDetailClick }: ProductListProps) {
  return (
    <>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <button
                className="detail-button"
                onClick={() => onDetailClick(product)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>You don't have a Seller profile.</p>
          <button>Create it</button>
        </>
      )}
    </>
  );
}
