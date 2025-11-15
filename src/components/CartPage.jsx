import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import { load } from "@cashfreepayments/cashfree-js";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase"; // your firebase setup file
import { getFirestore, doc, setDoc } from "firebase/firestore";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  // Initialize quantities for each item
  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = quantities[item.id] || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  // Handle checkbox selection
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate selected and total price
  const selectedProducts = cartItems.filter((item) => selectedItems[item.id]);
  const totalPrice = selectedProducts.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

  // Handle Payment Process
  const handlePlaceOrder = async () => {

  try {

    const auth = getAuth(app);

    const user = auth.currentUser;
 
    if (!user) {

      alert("Please log in first");

      return;

    }
 
    // CALL YOUR LOCAL NODE SERVER

    const response = await fetch("http://localhost:7001/createOrder", {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({

        amount: Math.floor(totalPrice * 0.9),   // use real total amount

        customerId: user.uid,

      }),

    });
 
    const data = await response.json();

    console.log("Order response:", data);
 
    if (!data.payment_session_id) {

      alert("Cashfree did not return payment_session_id");

      return;

    }
 
    // Load Cashfree Checkout

    const cashfree = await load({ mode: "sandbox" });
 
    cashfree.checkout({

      paymentSessionId: data.payment_session_id,

      redirectTarget: "_modal",

    });
 
  } catch (err) {

    console.error("PLACE ORDER ERROR:", err);

    alert("Something went wrong");

  }

};

 
  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Bag</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Bag is empty. Start shopping!</p>
      ) : (
        <div className="cart-content">
          {/* Left Section - Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <input
                  type="checkbox"
                  checked={!!selectedItems[item.id]}
                  onChange={() => handleSelectItem(item.id)}
                  className="cart-checkbox"
                />

                <div className="cart-img-container">
                  <img src={item.image} alt={item.title} className="cart-img" />
                </div>

                <div className="cart-info">
                  <h4 className="cart-name">{item.title}</h4>
                  {item.brand && <p className="cart-brand">{item.brand}</p>}
                  <p className="cart-price">₹{item.price}</p>

                  <div className="cart-quantity">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span>{quantities[item.id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Price Summary */}
          <div className="price-summary">
            <h3>PRICE DETAILS</h3>
            <hr />
            <div className="summary-item">
              <span>Selected Items</span>
              <span>{selectedProducts.length}</span>
            </div>
            <div className="summary-item">
              <span>Total MRP</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="summary-item">
              <span>Discount</span>
              <span className="discount">
                - ₹{Math.floor(totalPrice * 0.1)}
              </span>
            </div>
            <hr />
            <div className="summary-item total">
              <span>Total Amount</span>
              <span>₹{Math.floor(totalPrice * 0.9)}</span>
            </div>

            <button
              className="place-order-btn"
              disabled={selectedProducts.length === 0}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPaymentModal(false)}
        >
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Payment Method</h3>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="UPI"
                  checked={selectedPayment === "UPI"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                UPI (Google Pay, PhonePe, Paytm)
              </label>

              <label>
                <input
                  type="radio"
                  value="qr"
                  checked={selectedPayment === "qr"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                QR Code (Scan to Pay)
              </label>

              <label>
                <input
                  type="radio"
                  value="card"
                  checked={selectedPayment === "card"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Debit / Credit Card
              </label>
            </div>

            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button className="btn-pay" onClick={handlePlaceOrder}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
