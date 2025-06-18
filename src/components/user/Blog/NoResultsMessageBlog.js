import React, { useEffect, useState } from "react";
import "../../../pages/user/Blog/Blog.css";
import { ArrowRight, ArrowLeft, Archive, AlignJustify } from "lucide-react";
import axios from "axios";

const NoResultsMessageBlog = ({ onBack }) => {
  const [blogs, setBlogs] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRes = await axios.get("http://localhost:8000/api/blogs");
        setBlogs(blogsRes.data);
      } catch (err) {
        console.log("Error fetching blog data:", err);
      }
    };
    fetchBlogs();
  }, []);


  return (
    <div className="no-products-container">
      <div className="empty-state">
        <div className="package-icon">
          <Archive color="#000" size={100} />
        </div>
        <h2 className="empty-title">No products found</h2>
        <p className="empty-description">
          We couldn't find any products matching your search. Try adjusting your search or browse our categories.
        </p>
        <div className="action-buttons">
          <button className="btn-clear-search" onClick={onBack}>
            <ArrowLeft color="#FFFFFF" />
            Back
          </button>
        </div>
        <div className="content-feature">
          <div className="cards-container-blog">
            <h3 className="card-section-title">Featured Products</h3>
            <div className="cards-grid-blogs">
              {blogs.slice(0, 3).map((card) => (
                <div key={card.id} className="card-blogs">
                  <img
                    src={card.image_url || "/placeholder.svg"}
                    alt="Blog"
                    className="card-image-blog"
                  />
                  <div className="card-meta-blog">
                    <div className="card-meta-detail">
                      <i className="fa-solid fa-user icon-outline"></i>
                      <span className="author">{card.author?.name || "Unknown"}</span>
                    </div>
                    <div className="card-meta-detail">
                      <i className="fa-solid fa-calendar icon-outline"></i>
                      <span className="date">
                        {card.created_at
                          ? new Date(card.created_at).toLocaleDateString("vi-VN")
                          : "No date"}
                      </span>
                    </div>
                  </div>

                  <h3 className={`card-title-blog ${expandedCardId === card.id ? "expanded" : ""}`}>
                    {card.title}
                  </h3>
                  <p className={`card-description-blog ${expandedCardId === card.id ? "expanded" : ""}`}>
                    {card.content}
                  </p>
                  <button
                    className="read-more-button"
                    onClick={() => setExpandedCardId(expandedCardId === card.id ? null : card.id)}
                  >
                    {expandedCardId === card.id ? "SHOW LESS" : "READ MORE"}{" "}
                    <span className="arrow-icon">
                      <ArrowRight color="#FF9000" size={16}/>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResultsMessageBlog;
