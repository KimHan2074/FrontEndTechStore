import React, { Component } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function SignInForm({
  showPassword,
  setShowPassword,
  formData,
  handleInputChange,
  handleSubmit,
  handleForgotPassword,
  handleGoogleSignIn,
  handleAppleSignIn,
}) {

  const location = useLocation();

  return (
    <div className="signin-container">
      <div className="signin-form-card">
        <div className="signin-tab-container">
          <Link
            to="/signin"
            className={`signin-tab ${
              location.pathname === "/signin" ? "signin-tab-active" : ""
            }`}
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className={`signin-tab ${
              location.pathname === "/signup" ? "signin-tab-active" : ""
            }`}
          >
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="signin-form-content">
          <div className="signin-form-group">
            <label htmlFor="name" className="signin-label">
              FullName
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Fullname..."
              value={formData.name}
              onChange={handleInputChange}
              className="signin-input"
              required
            />
          </div>

          <div className="signin-form-group">
            <div className="signin-password-label-container">
              <label htmlFor="password" className="signin-label">
                Password
              </label>
              <button type="button" className="signin-forgot-password-link" onClick={handleForgotPassword}>
                Forget Password
              </button>
            </div>
            <div className="signin-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your Password..."
                value={formData.password}
                onChange={handleInputChange}
                className="signin-input"
                required
              />
              <button type="button" className="signin-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showPassword ? (
                    <>
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                      />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="signin-submit-button">
            SIGN IN
          </button>

          <div className="signin-divider">
            <span>Or</span>
          </div>

          <button type="button" className="signin-social-button signin-google-button" onClick={handleGoogleSignIn}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}
