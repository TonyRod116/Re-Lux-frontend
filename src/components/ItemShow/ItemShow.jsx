import './ItemShow.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemShow, itemDelete } from '../../services/items.js'
import { createOffer, getItemOffers } from '../../services/offers.js'
import { addToFavorites, removeFromFavorites, checkIfFavorited } from '../../services/favorites.js'
import { getUserReviews, getUserAverageRating, checkIfUserReviewed } from '../../services/reviews.js'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { useCart } from '../../Contexts/CartContext'
import MakeAnOfferFlashMsg from '../MakeAnOfferFlashMsg/MakeAnOfferFlashMsg'
import ReviewForm from '../ReviewForm/ReviewForm'
import ReviewList from '../ReviewList/ReviewList'

import { MdModeEdit, MdDelete, MdFavorite, MdFavoriteBorder } from "react-icons/md"

const ItemShow = () => {

  // Context
  const { user } = useContext(UserContext)
  const { cart, addItem } = useCart()

  // State
  const [item, setItem] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMakeOffer, setShowMakeOffer] = useState(false)
  const [offers, setOffers] = useState([])
  const [message, setMessage] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [sellerReviews, setSellerReviews] = useState([])
  const [sellerAverageRating, setSellerAverageRating] = useState(null)
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [hasReviewedSeller, setHasReviewedSeller] = useState(false)

  const isInCart = item ? cart.some(cartItem => cartItem.id === item._id) : false

  const { itemId } = useParams()
  const navigate = useNavigate()

  // Fetch data
  useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const { data } = await itemShow(itemId)
        console.log("API response:", data);
        setItem(data)

        // If the user is the seller, load the offers
        if (user && data.seller._id === user._id) {
          loadOffers()
        }

        // Check if item is favorited by current user
        if (user) {
          checkFavoriteStatus()
        }

        // Load seller reviews
        loadSellerReviews()
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getItem()
  }, [itemId, user])

  // Load seller reviews when item is available
  useEffect(() => {
    if (item && item.seller && item.seller._id) {
      console.log('Item loaded, now loading reviews for seller:', item.seller._id)
      loadSellerReviews()
    } else {
      console.log('Item not ready yet:', { item: !!item, seller: !!item?.seller, sellerId: item?.seller?._id })
    }
  }, [item])

  // Function to load seller reviews
  const loadSellerReviews = async () => {
    if (!item?.seller?._id) {
      console.log('No seller ID found, skipping reviews load')
      return
    }
    
    console.log('Loading reviews for seller:', item.seller._id)
    
    try {
      setReviewsLoading(true)
      const reviewsResponse = await getUserReviews(item.seller._id)
      
      console.log('Reviews response:', reviewsResponse.data)
      
      setSellerReviews(reviewsResponse.data)
      
      // Calculate average rating locally instead of relying on backend
      if (reviewsResponse.data && reviewsResponse.data.length > 0) {
        const totalRating = reviewsResponse.data.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = totalRating / reviewsResponse.data.length
        setSellerAverageRating({ averageRating })
        console.log('Calculated average rating locally:', averageRating)
      } else {
        setSellerAverageRating({ averageRating: 0 })
      }
      
      // Check if current user has already reviewed this seller
      if (user && user._id !== item.seller._id) {
        try {
          const checkResponse = await checkIfUserReviewed(item.seller._id)
          console.log('Check review response:', checkResponse.data)
          setHasReviewedSeller(checkResponse.data.hasReviewed)
        } catch (error) {
          console.error('Error checking if user reviewed seller:', error)
        }
      }
    } catch (error) {
      console.error('Error loading seller reviews:', error)
      console.error('Error details:', error.response?.data)
    } finally {
      setReviewsLoading(false)
    }
  }

  // Check favorite status
  const checkFavoriteStatus = async () => {
    try {
      const response = await checkIfFavorited(itemId)
      setIsFavorited(response.data.isFavorited)
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  // Function to load offers
  const loadOffers = async () => {
    try {
      const { data } = await getItemOffers(itemId)
      setOffers(data.offers || [])
    } catch (error) {
      console.error('Error loading offers:', error)
    }
  }

  // Functions
  const handleDelete = async () => {
    try {
      await itemDelete(itemId)
      navigate('/items')
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const handleAddToCart = () => {
    console.log('Adding to cart', item, cart);
    if (!item) return; // safeguard

    if (isInCart) {
      setMessage('Item already added');
      setTimeout(() => setMessage(''), 3000);
    } else {
      addItem({
        id: item._id,
        name: item.title,
        seller: item.seller?.username || 'Unknown',
        price: item.price,
        image: item.images[0],
      });
      setMessage("It's in the bag!");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleMakeOffer = () => {
    setShowMakeOffer(true)
  }

  const closeMakeOffer = () => {
    setShowMakeOffer(false)
  }

  const handleSubmitOffer = async (offerPrice) => {
    try {
      await createOffer(itemId, offerPrice)
      setShowMakeOffer(false)
      setMessage('Offer submitted successfully!')
      setTimeout(() => setMessage(''), 3000)
      // Reload offers if user is seller
      if (user && item.seller._id === user._id) {
        loadOffers()
      }
    } catch (error) {
      console.error('Error submitting offer:', error)
      setMessage('Failed to submit offer. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleReviewSubmitted = () => {
    setShowReviewForm(false)
    setHasReviewedSeller(true)
    // Reload seller reviews
    loadSellerReviews()
  }

  const handleToggleFavorite = async () => {
    if (!user) return
    
    setFavoriteLoading(true)
    try {
      if (isFavorited) {
        await removeFromFavorites(itemId)
        setIsFavorited(false)
      } else {
        await addToFavorites(itemId)
        setIsFavorited(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setFavoriteLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <>
      <MakeAnOfferFlashMsg
        item={item}
        isVisible={showMakeOffer}
        onClose={closeMakeOffer}
        onSubmit={handleSubmitOffer}
      />

      <div className="page-content">
        <div className="item-show">
          <div className="item-images">
            {item.images && item.images.length > 0 ? (
              <img 
                src={item.images[0]} 
                alt={item.title} 
                className="main-image"
              />
            ) : (
              <div className="no-image">No image available</div>
            )}
          </div>

          <div className="item-details">
            <div className="item-header">
              <h1>{item.title}</h1>
              <button
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorited ? (
                  <MdFavorite className="favorite-icon filled" />
                ) : (
                  <MdFavoriteBorder className="favorite-icon" />
                )}
              </button>
            </div>

            <div className="item-info">
              <p className="item-type">Type: {item.type}</p>
              <p className="item-description">{item.description}</p>
              <p className="item-location">📍 {item.location}</p>
              <p className="item-seller">Seller: {item.seller?.username}</p>
              <p className="item-price">€{item.price.toLocaleString()}</p>
            </div>

            {offers.length > 0 && (
              <div className="offers-section">
                <h3>Offers Received ({offers.length})</h3>
                <div className="offers-list">
                  {offers.map((offer, index) => (
                    <div key={index} className="offer-item">
                      <div className="offer-info">
                        <span className="offer-buyer">{offer.buyer?.username || 'Unknown'}</span>
                        <span className="offer-amount">€{offer.amount}</span>
                        <span className="offer-status">{offer.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="button-row">
              {user && user._id !== item.seller._id ? (
                // If NOT your item, show Buy now and Make an offer
                <>
                  <button onClick={handleAddToCart} className="purchase-button">
                    Buy now
                  </button>
                  <button className="offer-button" onClick={handleMakeOffer}>
                    Make an offer
                  </button>
                </>
              ) : user && user._id === item.seller._id ? (
                // If IS your item, show Edit and Delete
                <>
                  <Link to={`/items/${item._id}/edit`}>
                    <button className="purchase-button">
                      <MdModeEdit /> Edit
                    </button>
                  </Link>
                  <button onClick={handleDelete} className="offer-button">
                    <MdDelete /> Delete
                  </button>
                </>
              ) : (
                // If not logged in, show sign in buttons
                <>
                  <Link to="/sign-in">
                    <button className="purchase-button">Buy now</button>
                  </Link>
                  <Link to="/sign-in">
                    <button className="offer-button">Make an offer</button>
                  </Link>
                </>
              )}
            </div>
            {message && <p className="cart-message">{message}</p>}
          </div>
        </div>

        {/* Seller Reviews Section */}
        {item && item.seller && (
          <div className="seller-reviews-section">
            <div className="reviews-header">
              <div className="reviews-title-section">
                <h2>Seller Reviews</h2>
                {!reviewsLoading && sellerReviews.length > 0 && (
                  <div className="rating-summary-inline">
                    <span className="rating-number">{sellerAverageRating?.averageRating?.toFixed(1) || '0.0'}</span>
                    <div className="rating-stars-inline">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`rating-star ${star <= (sellerAverageRating?.averageRating || 0) ? 'filled' : 'empty'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="total-reviews-inline">
                      ({sellerReviews.length})
                    </span>
                  </div>
                )}
              </div>
              {user && user._id !== item.seller._id && !hasReviewedSeller && (
                <button 
                  className="write-review-btn"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write a Review
                </button>
              )}
            </div>
            
            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : (
              <ReviewList 
                reviews={sellerReviews} 
                averageRating={sellerAverageRating?.averageRating}
                totalReviews={sellerReviews.length}
              />
            )}
          </div>
        )}

        {showReviewForm && (
          <ReviewForm
            targetUserId={item.seller._id}
            targetUsername={item.seller.username}
            onReviewSubmitted={handleReviewSubmitted}
            onClose={() => setShowReviewForm(false)}
          />
        )}
      </div>
    </>
  )
}

export default ItemShow
