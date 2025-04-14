import ProductList from "@/app/ui/products/sellerProductList/sellerProductList";
import { Product } from "@/app/lib/definitions";

export default function UserProductSection({
  products,
  onEdit,
  onAdd
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onAdd: () => void;
}) {
  return (
    <div className="user-products-list">
      <div className="user-products-list-header">
        <h2>Your Products</h2>
        <button className="detail-button" onClick={onAdd}>Add New Product</button>
      </div>
      {products.length > 0 ? (
        <ProductList products={products} onDetailClick={onEdit} />
      ) : (
        <p>You don't have any products yet.</p>
      )}
    </div>
  );
}
