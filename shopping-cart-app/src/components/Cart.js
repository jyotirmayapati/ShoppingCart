import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";

const Cart = ({ cartItems, updateCartItem, removeFromCart, clearCart }) => {
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateCartItem(id, quantity);
  };

  const handlePurchase = async () => {
    setPurchaseError(null);
    setPurchaseSuccess(false);

    const purchaseData = {
      user: user || "Guest",
      items: cartItems,
      totalPrice: totalPrice.toFixed(2),
    };

    try {
      const response = await fetch("https://webhook.site/e39339ea-ff00-465c-b17c-a17ac5e510f8", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Purchase failed. Please try again.");
      }

      setPurchaseSuccess(true);
      localStorage.removeItem("cart");
      clearCart();
    } catch (error) {
      setPurchaseError(error.message || "An error occurred during purchase.");
    }
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>
                  Quantity:{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          {purchaseError && <p style={{ color: "red" }}>{purchaseError}</p>}
          {purchaseSuccess && <p style={{ color: "green" }}>Purchase successful!</p>}
          <button className="buy-button" onClick={handlePurchase}>Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
