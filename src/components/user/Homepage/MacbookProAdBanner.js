import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MacbookProAdBanner = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
   const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get("http://localhost:8000/api/user/product/index");
        setProducts(product.data.data);
      } catch (err) {
        console.log("Fetch product of lastHome: ", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < products.length ? prevIndex + 1 : 0
      );
    }, 4000);
    return () => clearInterval(interval); 
  }, [products]);

  const handleShopNow = () => {
     navigate("/shopping-cart");
  };

  const product = products[currentIndex];

  return (
    <div className="macbook-showcase">
      {product && (
        <>
          <div className="content-left">
            {product.old_price > product.price && (
              <div className="save-badge">
                Save up to ${ (product.old_price - product.price).toFixed(2) }
              </div>
            )}
            <h1 className="product-title-macbook">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <button className="promo-button-best-seller" onClick={handleShopNow}>
              SHOP NOW
            </button>
          </div>

          <div className="content-right">
            <span className="price-tag">
              <span>${product.price}</span>
            </span>
            <div className="macbook-single">
              <img
                src={product.image_url || "https://via.placeholder.com/300"}
                alt={product.name}
                className="macbook-image"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MacbookProAdBanner;
