import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="product-details">Product not found.</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p className="price">Price: ${product.price}</p>
      <p className="description">{product.description}</p>
      <p className="category">
        <strong>Category:</strong> {product.category}
      </p>
      <div className="rating">
        <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
