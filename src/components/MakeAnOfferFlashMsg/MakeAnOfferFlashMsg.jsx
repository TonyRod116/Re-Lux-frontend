import React, { useState } from 'react'
import './MakeAnOfferFlashMsg.css'

const MakeAnOfferFlashMsg = ({ item, isVisible, onClose, onSubmit }) => {
  const [offerPrice, setOfferPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!offerPrice || parseFloat(offerPrice) < 10) {
      setError('Offer must be at least €10')
      return
    }

    setIsSubmitting(true)
    setError('')
    
    try {
      await onSubmit(parseFloat(offerPrice))
      setOfferPrice('')
      onClose()
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting offer')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setOfferPrice('')
    setError('')
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="make-offer-overlay">
      <div className="make-offer-modal">
        <div className="make-offer-header">
          <h2>Make an Offer</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <div className="make-offer-content">
          <div className="item-preview">
            <img 
              src={item?.images?.[0] || "https://via.placeholder.com/100x100?text=No+Image"} 
              alt={item?.title} 
              className="item-thumbnail"
            />
            <div className="item-info">
              <h3>{item?.title}</h3>
              <p className="item-price">Current price: €{item?.price?.toLocaleString()}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="offer-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="offerPrice">Your Offer (€)</label>
              <input
                type="number"
                id="offerPrice"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="Enter your offer amount (min €10)"
                min="10"
                step="0.01"
                required
                className="offer-input"
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={handleClose}
                className="cancel-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={!offerPrice || parseFloat(offerPrice) < 10 || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Offer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MakeAnOfferFlashMsg
