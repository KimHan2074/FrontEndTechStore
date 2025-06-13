import React, { Component } from 'react';
import BlogSlideBar from '../../components/user/Blog/BlogSlideBar';
import ContentBlog from '../../components/user/Blog/ContentBlog';
import "./Blog.css";
import Header from '../../components/shared/Header/Header';
import Footer from '../../components/shared/Footer/Footer';

export default class Blog extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="blog-wrapper">
          <div className="sidebar-section">
            <BlogSlideBar />
          </div>
          <div className="content-section">
            <ContentBlog />
          </div>
        </div>
        <Footer/>
      </>
    );
  }
}
