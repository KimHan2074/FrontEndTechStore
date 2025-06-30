import React, { useEffect, useState } from "react";
import "./Product.css";
import ProductSidebar from "../../../components/user/Product/ProductSidebar";
import { FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/products/list?page=${currentPage}&per_page=${itemsPerPage}`;
        if (selectedCategoryId) {
          url += `&category_id=${selectedCategoryId}`;
        } else if (searchQuery) {
          url += `&q=${searchQuery}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.data); 
        setTotalPages(data.last_page); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategoryId, searchQuery]);

 const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) { 
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  

};

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <div className="product-wrapper">
      <div className="sidebar-section">
        <ProductSidebar
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>

      <div className="content-section">
        <div className="product-list max-w-4xl mx-auto p-4">
          {products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="product-card border rounded-md shadow-sm p-4 flex items-center mb-4"
              >
                {product.promotion_type && (
                  <div className="promotion-label">{product.promotion_type}</div>
                )}
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0].image_url
                      : "https://via.placeholder.com/165"
                  }
                  alt={product.name}
                  className="w-24 h-24 object-cover mr-4"
                />

                <div className="product-details flex-1">
                  <h3 className="text-gray-600 text-sm">{product.category}</h3>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>

                <div className="actions">
                  <div className="actions-container">
                    <div className="price-wrapper">
                      <span className="line-through">${product.old_price}</span>
                      <span className="text-red-500">${product.price}</span>
                    </div>
                    <button className="bg-red-500 flex items-center justify-center gap-2">
                      <FaShoppingCart /> ADD TO CART
                    </button>
                    <button className="text-gray-500 flex items-center justify-center gap-2">
                      <FaHeart /> Wishlist
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <FaChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductList;
