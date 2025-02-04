import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  // Global cart state
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <ProductList addToCart={addToCart} />
            </PrivateRoute>
          } />
          <Route path="/product/:id" element={
            <PrivateRoute>
              <ProductDetails addToCart={addToCart} />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart 
                cartItems={cartItems} 
                updateCartItem={updateCartItem} 
                removeFromCart={removeFromCart} 
                clearCart={clearCart} 
              />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
