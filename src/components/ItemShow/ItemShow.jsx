import './ItemShow.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemShow, itemDelete } from '../../services/items.js'
import { createOffer, getItemOffers } from '../../services/offers.js'
import { addToFavorites, removeFromFavorites, checkIfFavorited } from '../../services/favorites.js'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { useCart } from '../../Contexts/CartContext'
import MakeAnOfferFlashMsg from '../MakeAnOfferFlashMsg/MakeAnOfferFlashMsg'

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

  const isInCart = item ? cart.some(cartItem => cartItem.id === item._id) : false

  const { itemId } = useParams()
  const navigate = useNavigate()

  //Fetch data
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
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getItem()
  }, [itemId, user])

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

      // Mostrar mensaje de éxito
      alert(`Offer of €${offerPrice} submitted successfully!`)

      // If the user is the seller, refresh the offers
      if (user && item.seller._id === user._id) {
        loadOffers()
      }

    } catch (error) {
      throw error
    }
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
              <div className="item-actions">
                {user && user._id !== item.seller._id && (
                  <button 
                    onClick={handleMakeOffer}
                    className="make-offer-btn"
                  >
                    Make an Offer
                  </button>
                )}
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
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="item-info">
              <p className="item-type">Type: {item.type}</p>
              <p className="item-description">{item.description}</p>
              <p className="item-location">📍 {item.location}</p>
              <p className="item-seller">Seller: {item.seller?.username}</p>
              <p className="item-price">€{item.price.toLocaleString()}</p>
            </div>

            {user && user._id === item.seller._id && (
              <div className="seller-actions">
                <Link to={`/items/${item._id}/edit`} className="edit-btn">
                  <MdModeEdit /> Edit
                </Link>
                <button onClick={handleDelete} className="delete-btn">
                  <MdDelete /> Delete
                </button>
              </div>
            )}

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
              {user ? (
                <button onClick={handleAddToCart} className="purchase-button">
                  Buy now
                </button>
              ) : (
                <Link to="/sign-in">
                  <button className="purchase-button">Buy now</button>
                </Link>
              )}
              {user ? (
                user._id !== item.seller._id ? (
                  <button className="offer-button" onClick={handleMakeOffer}>
                    Make an offer
                  </button>
                ) : null
              ) : (
                <Link to="/sign-in">
                  <button className="offer-button">Make an offer</button>
                </Link>
              )}
            </div>
            {message && <p className="cart-message">{message}</p>}
            {message && <div className="message">{message}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemShow
