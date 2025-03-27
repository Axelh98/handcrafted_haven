// Import Styles
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import imagen vase
import vase from '/objects/vase.svg';

export default function Cart() {
  return (
    <section className="cart-section">
      <div className="container">
        <div className="header">
          <h1>Your Cart</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-item">
              <div className="item-image">
                <img src="/objects/vase.svg" alt="" />
              </div>

              <div className="item-details">
                <div className="item-info">
                  <div className="item-description">
                    <p className="item-name">Ceramic Vase</p>
                    <p className="item-size">Brown</p>
                  </div>

                  <div className="item-price-quantity">
                    <p className="item-price">$259.00</p>

                    <div className="quantity-controls">
                      <button className="quantity-button">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <div className="quantity-display">1</div>
                      <button className="quantity-button">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item-remove">
                  <button type="button" className="remove-button">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-item">
              <p className="summary-label">Subtotal</p>
              <p className="summary-value">$399.00</p>
            </div>
            <div className="summary-item">
              <p className="summary-label">Shipping</p>
              <p className="summary-value">$8.00</p>
            </div>
            <div className="summary-total">
              <p className="total-label">Total</p>
              <p className="total-value">
                <span className="currency">USD</span> 408.00
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