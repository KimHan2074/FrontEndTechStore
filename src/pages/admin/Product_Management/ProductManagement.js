import React, { useEffect, useState } from "react";
import "./ProductManagement.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import EditProductForm from "../../../pages/admin/Product_Management/EditProduct";
import AddProductForm from "../../../pages/admin/Product_Management/AddProductForm";
import { Box, NotebookPen, TriangleAlert, X } from "lucide-react";

const ProductManagement = ({ categoryId = null, categoryName = null }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
  const [categoryStats, setCategoryStats] = useState({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let fetchedProducts = [];
      let stats = {};

      if (categoryId === null) {
        const productsRes = await axios.get(
          "https://backendtechstore1-production.up.railway.app/api/products/list?page=1&per_page=1000"
        );
        fetchedProducts = productsRes.data.data || [];

        const statsRes = await axios.get(
          "https://backendtechstore1-production.up.railway.app/api/admin/products/stock-statistics"
        );
        const statsData = statsRes.data.data;
        stats = {
          total: statsData.total_stock,
          inStock: statsData.in_stock_quantity,
          lowStock: statsData.low_stock_quantity,
          outOfStock: statsData.out_of_stock_quantity,
        };
      } else {
        const res = await axios.get(
          `https://backendtechstore1-production.up.railway.app/api/products/list?category_id=${categoryId}&page=1&per_page=1000`
        );
        fetchedProducts = res.data.data || [];

        const inStock = fetchedProducts.filter(p => p.stock > 10).length;
        const lowStock = fetchedProducts.filter(p => p.stock > 0 && p.stock <= 10).length;
        const outOfStock = fetchedProducts.filter(p => p.stock === 0).length;
        const totalStock = fetchedProducts.reduce((sum, p) => sum + p.stock, 0);

        stats = { total: totalStock, inStock, lowStock, outOfStock };
      }

      setProducts(fetchedProducts);
      setCategoryStats(stats);
      setCurrentPage(1);

    } catch (err) {
      console.error(err);
      setStatsError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  fetchProducts();
}, [categoryId]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(
        `https://backendtechstore1-production.up.railway.app/api/admin/products/${id}`
      );
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete the product");
    }
  };

  const openEditForm = (product) => setEditingId(product.id);
  const closeEditForm = () => setEditingId(null);
  const handleProductUpdate = (updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingId(null);
  };
  const handleProductAdd = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsAdding(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" ||
      (statusFilter === "In Stock" && p.stock > 10) ||
      (statusFilter === "Low Stock" && p.stock > 0 && p.stock <= 10) ||
      (statusFilter === "Out of Stock" && p.stock === 0);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="product-management">
      <div className="header">
        <h1>Product Management</h1>
      </div>

      <div className="category-section">
        <h2>Category: {categoryId ? categoryName : "All"}</h2>
        <p>Overview of products in this category</p>
      </div>

      <div className="stats-grid">
        {statsLoading && <div>Loading statistics...</div>}
        {statsError && <div style={{ color: "red" }}>{statsError}</div>}
        {!statsLoading && !statsError && (
          <>
            <div className="stat-card">
              <div className="stat-content">
                <h3>Total Stock</h3>
                <div className="stat-value">{categoryStats.total}</div>
              </div>
              <div className="stat-icon">
                <Box size={50} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <h3>In Stock</h3>
                <div className="stat-value">{categoryStats.inStock}</div>
              </div>
              <div className="stat-icon">
                <NotebookPen size={50} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <h3>Low Stock</h3>
                <div className="stat-value">{categoryStats.lowStock}</div>
              </div>
              <div className="stat-icon">
                <TriangleAlert size={50} />
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <h3>Out Of Stock</h3>
                <div className="stat-value">{categoryStats.outOfStock}</div>
              </div>
              <div className="stat-icon">
                <X size={50} />
              </div>
            </div>
          </>
        )}
      </div>

            <div className="controls">
        <div className="controls-left">
          <div className="search-container-product">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option>All Statuses</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
              <option>Low Stock</option>
            </select>
          </div>
        </div>
        <button className="add-product-btn" onClick={() => setIsAdding(true)}>+ Add New Product</button>
      </div>
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={(product.images && product.images[0]?.image_url) || "/placeholder.svg"}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category_name || "N/A"}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`status-badge ${
                      product.stock > 10
                        ? "in-stock"
                        : product.stock > 0
                        ? "low-stock"
                        : "out-of-stock"
                    }`}
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </td>
                <td>
                  <FaEdit
                    onClick={() => openEditForm(product)}
                    style={{ cursor: "pointer", color: "#2E4258" }}
                  />
                  <FaTrash
                    onClick={() => handleDelete(product.id)}
                    style={{ marginLeft: 10, cursor: "pointer", color: "#DC3545" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {editingId !== null && (
        <EditProductForm
          id={editingId}
          onCancel={closeEditForm}
          onSave={handleProductUpdate}
        />
      )}

      {isAdding && <AddProductForm onCancel={() => setIsAdding(false)} onSave={handleProductAdd} />}
    </div>
  );
};

export default ProductManagement;
