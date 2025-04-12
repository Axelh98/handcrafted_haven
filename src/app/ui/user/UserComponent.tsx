"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./UserComponent.css";
import { Product } from "@/app/lib/definitions";
// import icono user from fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// bring modal
import ProductEditModal from "@/app/ui/products/edit-modal/modal-product";
// bring seller product list
import ProductList from "@/app/ui/products/sellerProductList/sellerProductList";

export default function UserComponent() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/products?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status, userId]);

  if (status === "loading" || loading) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <div className="user-component-container">
      <div className="user-component-card">
        <div className="user-info">
          <div className="user-header">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <h1>{session?.user?.name}</h1>
          </div>
          <div className="user-info-text">
            <p>Name: {session?.user?.name}</p>
            <p>Email: {session?.user?.email}</p>{" "}
          </div>
        </div>
        <div className="user-products-list">
          <h2>Your Products</h2>
          {products.length > 0 ? (
            <ProductList
              products={products}
              onDetailClick={(product) => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
            />
          ) : (
            <p>You don't have any products yet.</p>
          )}
        </div>
        {showModal && selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            onClose={() => setShowModal(false)}
            onChange={(updatedProduct) => {
              setSelectedProduct(updatedProduct);
              setProducts((prevProducts) =>
                prevProducts.map((product) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                )
              );
            }}
            onSubmit={async () => {
              try {
                const response = await fetch(
                  `/api/products/${selectedProduct.id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedProduct),
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to update product");
                }

                setShowModal(false);
              } catch (error) {
                console.error("Error updating product:", error);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
