'use client';
import './ProductDetailPage.css';

const product = {
  name: "Ceramic Vase",
  image: "/objects/vase.svg",
  description: "Vase made of ceramic, perfect for your living room.",
  price: "$95.00",
  rating: 4.5,
  reviews: 10,
};

export default function ProductDetailPage() {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={product.image} alt="product image" />
            </div>
          </div>
        </div>

        <div className="product-content">
          <h2 className="product-title">{product.name}</h2>
          <div className="product-rating">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
            {product.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
            <span>{product.rating} ({product.reviews})</span>
          </div>

          <div className="product-price">
            <p className="new-price">Price: <span>{product.price}</span></p>
          </div>

          <div className="product-detail">
            <h2>About this item:</h2>
            <p>{product.description}</p>
          </div>

          <div className="purchase-info">
            <input type="number" min="1" defaultValue="1" />
            <button type="button" className="btn">
              Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}