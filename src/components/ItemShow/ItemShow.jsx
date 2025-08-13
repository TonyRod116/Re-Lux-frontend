import './ItemShow.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemShow, itemDelete } from '../../services/items.js'
import { createOffer, getItemOffers } from '../../services/offers.js' 
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { useCart } from '../../Contexts/CartContext'
import MakeAnOfferFlashMsg from '../MakeAnOfferFlashMsg/MakeAnOfferFlashMsg'

import { MdModeEdit, MdDelete, MdFavorite } from "react-icons/md"

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
  const [message, setMessage] = useState('');

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
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getItem()
  }, [itemId, user])

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
      
      <div className="item-content">
        <div className="image-grid">
          {item.images?.length > 0 ? (
            item.images.map((url, i) => (
            <img
            key={i}
            src={url}
            alt={`${item.title} image ${i + 1}`}/>
          ))
        ) : (
          <p>No images available</p>
        )}
        </div>
        <div className="item-details">
          {user && item.seller._id === user._id ? (
          <div className="user-controls">
            <Link to={`/items/${itemId}/edit`} className="edit-icon">Edit <MdModeEdit /></Link>
            <button onClick={handleDelete} className="delete-icon">Delete <MdDelete /></button>
          </div>
          ) : (
            <button className="save-icon"><MdFavorite /></button>
          )}
          <div>
            <h1>{item.title}</h1>
            <p> €{item.price}</p>
            <p>Sold by {item.seller.username}</p>
            <p>{item.location}</p>
            <p>{item.description}</p>
            
            {/* Show offers ONLY if the user is the seller */}
            {user && item.seller._id === user._id && offers.length > 0 && (
              <div className="offers-section">
                <h3>Offers Received ({offers.length})</h3>
                <div className="offers-list">
                  {offers.map((offer, index) => (
                    <div key={index} className="offer-item">
                      <span className="offer-amount">€{offer.amount}</span>
                      <span className={`offer-status ${offer.status}`}>{offer.status}</span>
                      <span className="offer-date">
                        {new Date(offer.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="button-row">
              <button onClick={handleAddToCart} className="purchase-button">Buy now</button>
              {/* Only show "Make an offer" if user is logged in and it's not their item */}
              {user && user._id !== item.seller._id && (
                <button className="offer-button" onClick={handleMakeOffer}>Make an offer</button>
              )}
            </div>
            {message && <p className="cart-message">{message}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemShow
