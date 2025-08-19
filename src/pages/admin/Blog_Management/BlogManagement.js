import React, { useEffect, useState } from "react";
import "./BlogManagement.css";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 7;

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const emptyForm = {
    category_id: "",
    title: "",
    content: "",
    image_url: "",
    link_url: "",
    status: "active",
    author_id: "",
    publish_date: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setLoading(true);
    fetch("https://backendtechstore1-production.up.railway.app/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setBlogs(data.data);
        } else {
          toast.error("Unexpected response");
        }
      })
      .catch(() => toast.error("Failed to fetch blogs"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog
      ? `https://backendtechstore1-production.up.railway.app/api/admin/blogs/${editingBlog.id}`
      : `https://backendtechstore1-production.up.railway.app/api/admin/blogs`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          if (editingBlog) {
            setBlogs((prev) =>
              prev.map((b) => (b.id === editingBlog.id ? data.data : b))
            );
            toast.success("Blog updated successfully!");
          } else {
            setBlogs((prev) => [...prev, data.data]);
            toast.success("Blog added successfully!");
          }
          setEditingBlog(null);
          setFormData(emptyForm);
          setShowForm(false);
        } else {
          toast.error("Failed to save blog");
        }
      })
      .catch(() => toast.error("Error saving blog"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    fetch(
      `https://backendtechstore1-production.up.railway.app/api/admin/blogs/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setBlogs((prev) => prev.filter((b) => b.id !== id));
          toast.success("Blog deleted successfully.");
        } else {
          toast.error("Failed to delete blog.");
        }
      })
      .catch(() => toast.error("Error deleting blog"));
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="blog-management">
      <div className="header-row">
        <div>
          <h2>Blog Management</h2>
          <p>Manage all blogs in the system.</p>
        </div>
        <button
          className="add-blog-btn"
          onClick={() => {
            setEditingBlog(null);
            setFormData(emptyForm);
            setShowForm(true);
          }}
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <span
              className="close-btn"
              onClick={() => {
                setShowForm(false);
                setEditingBlog(null);
                setFormData(emptyForm);
              }}
            >
              &times;
            </span>
            <h2>{editingBlog ? "Edit Blog" : "Add New Blog"}</h2>
            <form className="blog-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="category_id"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="image_url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={handleChange}
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <input
                type="text"
                name="link_url"
                placeholder="Link URL"
                value={formData.link_url}
                onChange={handleChange}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">active</option>
                <option value="published">lastest new</option>
              </select>
              <input
                type="text"
                name="author_id"
                placeholder="Author ID"
                value={formData.author_id}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleChange}
                required
              />

              <div className="form-actions">
                <button
                  type="submit"
                  className={editingBlog ? "update-btn" : "save-btn"}
                >
                  {editingBlog ? "Update Blog" : "Save Blog"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                    setFormData(emptyForm);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="review-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Category</th>
              <th>Title</th>
              <th>Image</th>
              <th>Status</th>
              <th>Author</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{blog.category_id}</td>
                  <td>{blog.title}</td>
                  <td>
                    {blog.image_url ? (
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#aaa" }}>No Image</span>
                    )}
                  </td>
                  <td>{blog.status}</td>
                  <td>{blog.author_id}</td>
                  <td>{blog.publish_date}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingBlog(blog);
                          setFormData(blog);
                          setShowForm(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No blogs available.
                </td>
              </tr>
            )}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
