import React, { useState } from 'react';
import "./Blog.css";
import BlogSlideBar from '../../../components/user/Blog/BlogSlideBar';
import ContentBlog from '../../../components/user/Blog/ContentBlog';
import Header from '../../../components/user/Header/Header';
import Footer from '../../../components/user/Footer/Footer';
import NoResultsMessageBlog from '../../../components/user/Blog/NoResultsMessageBlog';

const Blog = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [hasResults, setHasResults] = useState(true); 

  return (
    <>
      <Header />
      <div className="blog-wrapper">
        <div className="sidebar-section">
          <BlogSlideBar
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
        </div>
        <div className="content-section">
          {hasResults ? (
            <ContentBlog
              selectedCategoryId={selectedCategoryId}
              onSearchResult={setHasResults}
            />
          ) : (
            <NoResultsMessageBlog onBack={() => setHasResults(true)} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
