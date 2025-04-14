"use client";

import "./Cart.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faMinus,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/app/context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  console.log(cart);
  return (
    <section className="cart-section">
      <div className="container">
        <div className="header">
          <h1>Your Cart</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img
                    src={item.image_url? `/images${item.image_url}`: "/objects/vase.svg"}
                    alt={item.name}
                  />
                </div>

                <div className="item-details">
                  <div className="item-info">
                    <div className="item-description">
                      <p className="item-name">{item.name}</p>
                    </div>

                    <div className="item-price-quantity">
                      <p className="item-price">${item.price.toFixed(2)}</p>

                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className="quantity-display">{item.quantity}</div>
                        <button
                          className="quantity-button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="item-remove">
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-item">
              <p className="summary-label">Subtotal</p>
              <p className="summary-value">${subtotal.toFixed(2)}</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Shipping</p>
              <p className="summary-value">${shipping.toFixed(2)}</p>
            </div>
            <div className="summary-total">
              <p className="total-label">Total</p>
              <p className="total-value">
                <span className="currency">USD</span> {total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="checkout-button-container">
            <button type="button" className="checkout-button">
              Checkout
              <FontAwesomeIcon icon={faArrowRight} className="checkout-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
