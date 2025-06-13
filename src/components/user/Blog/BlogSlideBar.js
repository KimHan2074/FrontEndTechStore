import React from "react";
import "../../../pages/Blog/Blog.css"
const BlogSlideBar = () => {
    const categories = [
        { id: 1, name: "All", active: true },
        { id: 2, name: "Computer & Laptop", active: false },
        { id: 3, name: "Smartphone", active: false },
        { id: 4, name: "Headphones", active: false },
        { id: 5, name: "Accessories", active: false },
        { id: 6, name: "Camera & Photo", active: false },
        { id: 7, name: "TV & Homes", active: false },
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Curabitur pulvinar aliquam lectucnon blandit erat mattis vitae",
            date: "28 Nov, 2015",
            image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png",
        },
        {
            id: 2,
            title: "Curabitur pulvinar aliquam lectucnon blandit erat mattis vitae",
            date: "28 Nov, 2015",
            image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png",
        },
        {
            id: 3,
            title: "Curabitur pulvinar aliquam lectucnon blandit erat mattis vitae",
            date: "28 Nov, 2015",
            image: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png",
        },
    ];

    const galleryImages = [
        { id: 1, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
        { id: 2, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
        { id: 3, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
        { id: 4, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
        { id: 5, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
        { id: 6, src: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482759uMk/anh-mo-ta.png" },
    ];

    return (
        <div className="mobile-interface">
            <div className="section">
                <h2 className="section-title">CATEGORIES</h2>
                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category.id} className="category-item">
                            <label className="category-label">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={category.active}
                                    readOnly
                                    className="radio-category-list"
                                />
                                <span>{category.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>

            </div>

            <div className="section">
                <h2 className="section-title">LATEST BLOG</h2>
                <div className="blog-list">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="blog-item">
                            <img src={post.image} alt={post.title} className="blog-image" />
                            <div className="blog-content">
                                <p className="blog-title">{post.title}</p>
                                <p className="blog-date">{post.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">GALLERY</h2>
                <div className="gallery-grid">
                    {galleryImages.map((image) => (
                        <div key={image.id} className="gallery-item">
                            <img src={image.src} alt="Gallery" className="gallery-image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSlideBar;
