import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';

const ProductList = ({ addToCart }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Product Listing</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image" 
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.rating.rate}</p>
            <Link to={`/product/${product.id}`}>
              <button>View Details</button>
            </Link>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
