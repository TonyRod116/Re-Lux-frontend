import React from 'react'
import './ReviewList.css'

const ReviewList = ({ reviews, averageRating, totalReviews }) => {
  // Ensure averageRating is always a valid number
  const validAverageRating = typeof averageRating === 'number' && !isNaN(averageRating) ? averageRating : 0
  
  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-section">
        <h3>Reviews</h3>
        <div className="no-reviews">
          <p>No reviews yet</p>
          {validAverageRating > 0 && (
            <div className="rating-summary">
              <div className="average-rating">
                <span className="rating-number">{validAverageRating.toFixed(1)}</span>
                {renderStars(Math.round(validAverageRating))}
              </div>
              <span className="total-reviews">
                {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : 'empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="reviews-section">
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">
                  {review.user_id?.username || 'Anonymous'}
                </span>
                <span className="review-date">
                  {formatDate(review.created_at)}
                </span>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="rating-value">{review.rating}/5</span>
              </div>
            </div>
            
            {review.description && (
              <div className="review-description">
                <p>{review.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewList
