import React, { Component } from 'react';

export default function ResetPasswordForm({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div className="reset-container">
      <div className="reset-form-card">
        <div className="reset-header">
          <h1 className="reset-title">Reset Password</h1>
          <p className="reset-subtitle">Please choose a strong password and confirm it to reset your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="reset-form-content">
            
            <div className="reset-form-group">
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

          <div className="reset-form-group">
            <label htmlFor="password" className="reset-label">
              Password
            </label>
            <div className="reset-password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your Password..."
                value={formData.password}
                onChange={handleInputChange}
                className="reset-input"
                required
              />
              <button type="button" className="reset-password-toggle" onClick={() => setShowPassword(!showPassword)}>
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

          <div className="reset-form-group">
            <label htmlFor="confirmPassword" className="reset-label">
              Confirm Password
            </label>
            <div className="reset-password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter your Confirm Password..."
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="reset-input"
                required
              />
              <button
                type="button"
                className="reset-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showConfirmPassword ? (
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

          <button type="submit" className="reset-submit-button">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  )
}
