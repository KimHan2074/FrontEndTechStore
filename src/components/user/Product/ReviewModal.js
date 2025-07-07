"use client"

import { useState, useRef } from "react"
import "../../../pages/user/Product/Product.css";

const ReviewModal = ({ onClose }) => {
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewDetail, setReviewDetail] = useState("")
  const [uploadedImages, setUploadedImages] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleStarClick = (rating) => setOverallRating(rating)
  const handleStarHover = (rating) => setHoverRating(rating)
  const handleStarLeave = () => setHoverRating(0)

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
    }))
    setUploadedImages((prev) => [...prev, ...newImages])
  }

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) handleImageUpload(e.target.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length > 0) handleImageUpload(e.dataTransfer.files)
  }

  const removeImage = (id) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      const removed = prev.find((img) => img.id === id)
      if (removed) URL.revokeObjectURL(removed.url)
      return updated
    })
  }

  const handleSubmit = () => {
    if (overallRating === 0) {
      alert("Please select a star rating!")
      return
    }

    const reviewData = {
      rating: overallRating,
      title: reviewTitle,
      detail: reviewDetail,
      images: uploadedImages,
    }

    console.log("Review submitted:", reviewData)
    alert("Thank you for reviewing the product!")

    setOverallRating(0)
    setReviewTitle("")
    setReviewDetail("")
    setUploadedImages([])
    onClose()
  }

  const handleCancel = () => {
    onClose()
    setOverallRating(0)
    setReviewTitle("")
    setReviewDetail("")
    setUploadedImages([])
  }

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1
      const isFilled = starValue <= (hoverRating || overallRating)
      return (
        <span
          key={i}
          className={`star ${isFilled ? "filled" : ""}`}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </span>
      )
    })

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
             <div className="modal-header">
          <h2 className="modal-title">Review</h2>
          <button className="close-btn" onClick={handleCancel}>
            ×
          </button>
        </div>

          <p className="modal-subtitle">Your experience can help others make smarter choices</p>

          <div className="form-group">
            <label className="form-label">Overall Rating</label>
            <div className="star-rating">{renderStars()}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your review summary..."
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detail</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Share detailed experience about the product..."
              value={reviewDetail}
              onChange={(e) => setReviewDetail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            <div
              className={`image-upload ${isDragOver ? "dragover" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📷</div>
              <div className="upload-text">Add Image</div>
              <input
                ref={fileInputRef}
                type="file"
                className="file-input"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
              />
            </div>

            {uploadedImages.length > 0 && (
              <div className="image-preview">
                {uploadedImages.map((img) => (
                  <div key={img.id} className="preview-item">
                    <img src={img.url} alt="Preview" className="preview-image" />
                    <button className="remove-image" onClick={() => removeImage(img.id)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-send" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
