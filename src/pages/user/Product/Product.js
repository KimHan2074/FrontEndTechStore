import React from "react";
import "./Product.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import ProductSidebar from '../../../components/user/Product/ProductSidebar';

const products = [
  {
    id: 1,
    category: "Cameras",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphone",
    description: "TOZO T6 True Wireless With others products specification Earbuds Bluetooth Headphone...",
    oldPrice: "2,499,000",
    newPrice: "1,999,000",
    imageUrl: "https://i.pinimg.com/736x/bf/d9/56/bfd9563b5a7277df5ca476b4e90a06cb.jpg",
  },
  {
    id: 2,
    category: "Cameras",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphone",
    description: "TOZO T6 True Wireless With others products specification Earbuds Bluetooth Headphone...",
    oldPrice: "2,499,000",
    newPrice: "1,999,000",
    imageUrl: "https://i.pinimg.com/736x/bf/d9/56/bfd9563b5a7277df5ca476b4e90a06cb.jpg",
  },
  {
    id: 3,
    category: "Cameras",
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphone",
    description: "TOZO T6 True Wireless With others products specification Earbuds Bluetooth Headphone...",
    oldPrice: "2,499,000",
    newPrice: "1,999,000",
    imageUrl: "https://i.pinimg.com/736x/bf/d9/56/bfd9563b5a7277df5ca476b4e90a06cb.jpg",
  },
];

const ProductCard = ({ product }) => (
  <div className="product-card border rounded-md shadow-sm p-4 flex items-center mb-4">
    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mr-4" />
    <div className="product-details flex-1">
      <h3 className="text-gray-600 text-sm">{product.category}</h3>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
    </div>
    <div className="actions">
      <div className="price-wrapper">
        <div className="price">
          <span className="line-through">{product.oldPrice}₫</span>
          <span className="text-red-500">{product.newPrice}₫</span>
        </div>
      </div>
      <button className="bg-red-500 flex items-center justify-center gap-2">
        <FaShoppingCart /> ADD TO CART
      </button>
      <button className="text-gray-500 flex items-center justify-center gap-2">
        <FaHeart /> Wishlist
      </button>
    </div>
  </div>
);

const ProductList = () => (
  <div className="product-wrapper">
    <div className="sidebar-section">
      <ProductSidebar />
    </div>
    <div className="content-section">
      <div className="product-list max-w-4xl mx-auto p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);

export default ProductList;
