import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa'; 
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <img
                    src="https://www.toponseek.com/wp-content/uploads/2024/07/nguyen-nhan-cach-khac-phuc-loi-404-not-found-0-1200x675.png"
                    alt="404 Illustration"
                    className="not-found-image"
                />
                <p className="not-found-message">
                    Something went wrong. It looks like your request could not be found. 
                    The link might be broken or the page has been removed.
                </p>
                <div className="button-group">
                    <button
                        className="not-found-button"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft /> Go back
                    </button>
                    <button
                        className="not-found-button"
                        onClick={() => navigate('/user/homepage')}
                    >
                        <FaHome /> Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
