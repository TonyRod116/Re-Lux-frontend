import './ProfilePage.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import ProfileForm from '../ProfileForm/ProfileForm'
import { getUserItems, itemDelete } from '../../services/items'
import { getUserFavorites } from '../../services/favorites'

const ProfilePage = () => {
  const { user } = useContext(UserContext)
  const [userItems, setUserItems] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [userOffers, setUserOffers] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  const [offersLoading, setOffersLoading] = useState(true)
  const [showEditForm, setShowEditForm] = useState(false)

  // Fetch user's items
  useEffect(() => {
    const fetchUserItems = async () => {
      if (user?._id) {
        try {
          const response = await getUserItems(user._id)
          setUserItems(response.data)
        } catch (error) {
          console.error('Error fetching user items:', error)
        } finally {
          setItemsLoading(false)
        }
      }
    }
    fetchUserItems()
  }, [user])

  // Fetch user's favorites
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user?._id) {
        try {
          const response = await getUserFavorites()
          setUserFavorites(response.data)
        } catch (error) {
          console.error('Error fetching user favorites:', error)
        } finally {
          setFavoritesLoading(false)
        }
      }
    }
    fetchUserFavorites()
  }, [user])

  // Fetch user's offers
  useEffect(() => {
    const fetchUserOffers = async () => {
      if (user?._id) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/items/offers/user/${user._id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('relux-token')}`
            }
          })
          if (response.ok) {
            const offersData = await response.json()
            setUserOffers(offersData)
          }
        } catch (error) {
          console.error('Error fetching user offers:', error)
        } finally {
          setOffersLoading(false)
        }
      }
    }
    fetchUserOffers()
  }, [user])

  // Handle delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await itemDelete(itemId)
      // Remove item from local state
      setUserItems(prevItems => prevItems.filter(item => item._id !== itemId))
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item. Please try again.')
    }
  }

  // Handle offer actions (accept/reject)
  const handleOfferAction = async (itemId, offerId, action) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${itemId}/offers/${offerId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('relux-token')}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        // Refresh user items to show updated offer status
        const updatedResponse = await getUserItems(user._id)
        setUserItems(updatedResponse.data)
        
        // Show success message
        const actionText = action === 'accepted' ? 'accepted' : 'rejected'
        alert(`Offer ${actionText} successfully!`)
      } else {
        throw new Error('Failed to update offer')
      }
    } catch (error) {
      console.error('Error updating offer:', error)
      alert(`Error ${action === 'accepted' ? 'accepting' : 'rejecting'} offer. Please try again.`)
    }
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="page-content">
      <div className="profile-header">
        <div className="profile-pic-container">
          <img 
            src={user.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
            alt="Profile" 
            className="profile-pic"
          />
        </div>
        <div className="profile-details">
          <h1>{user.username}</h1>
          <p className="profile-bio">{user.bio || 'No bio yet'}</p>
          <p className="profile-location">{user.location || 'No location set'}</p>
        </div>
        <button 
          onClick={() => setShowEditForm(!showEditForm)}
          className="edit-profile-btn"
        >
          {showEditForm ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {showEditForm && (
        <ProfileForm 
          user={user} 
          onClose={() => setShowEditForm(false)}
        />
      )}

      <section>
        <h2>Items for Sale ({userItems.length})</h2>
        <div className="items-grid">
          {itemsLoading ? (
            <p>Loading items...</p>
          ) : userItems.length > 0 ? (
            userItems.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-image">
                  <img 
                    src={item.images?.[0] || "https://via.placeholder.com/200x200?text=No+Image"} 
                    alt={item.title} 
                  />
                </div>
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="item-price">€{item.price}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="item-seller">Seller: {item.seller?.username}</p>
                  
                  {item.offers && item.offers.length > 0 && (
                    <div className="item-offers">
                      <div className="offers-title">Offers ({item.offers.length})</div>
                      {item.offers.map((offer, index) => (
                        <div key={index} className="offer-item">
                          <div className="offer-info">
                            <span className="offer-buyer">{offer.buyer?.username || 'Unknown'}</span>
                            <span className="offer-amount">€{offer.amount}</span>
                            <span className={`offer-status ${offer.status}`}>{offer.status}</span>
                          </div>
                          {offer.status === 'pending' && (
                            <div className="offer-actions">
                              <button 
                                onClick={() => handleOfferAction(item._id, offer._id, 'accepted')}
                                className="accept-offer-btn"
                              >
                                Accept
                              </button>
                              <button 
                                onClick={() => handleOfferAction(item._id, offer._id, 'rejected')}
                                className="reject-offer-btn"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="item-actions">
                    <Link 
                      to={`/items/${item._id}`} 
                      className="view-item-profile"
                    >
                      View
                    </Link>
                    <Link 
                      to={`/items/${item._id}/edit`} 
                      className="edit-item-profile"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
                          handleDeleteItem(item._id)
                        }
                      }}
                      className="delete-item-profile"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items for sale yet</p>
          )}
        </div>
      </section>

      <section>
        <h2>Favorites ({userFavorites.length})</h2>
        <div className="items-grid">
          {favoritesLoading ? (
            <p>Loading favorites...</p>
          ) : userFavorites.length > 0 ? (
            userFavorites.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-image">
                  <img 
                    src={item.images?.[0] || "https://via.placeholder.com/200x200?text=No+Image"} 
                    alt={item.title} 
                  />
                </div>
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="item-price">€{item.price}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="item-seller">Seller: {item.seller?.username}</p>
                  
                  <div className="item-actions">
                    <Link 
                      to={`/items/${item._id}`} 
                      className="view-item-profile"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites yet</p>
          )}
        </div>
      </section>

      <section>
        <h2>My Offers ({userOffers.length})</h2>
        <div className="offers-grid">
          {offersLoading ? (
            <p>Loading offers...</p>
          ) : userOffers.length > 0 ? (
            userOffers.map((offer) => (
              <div key={offer._id} className="offer-card">
                <div className="offer-item-image">
                  <img 
                    src={offer.item.images?.[0] || "https://via.placeholder.com/150x150?text=No+Image"} 
                    alt={offer.item.title} 
                  />
                </div>
                <div className="offer-info">
                  <h3>{offer.item.title}</h3>
                  <p className="offer-item-price">€{offer.item.price}</p>
                  <p className="offer-item-seller">Seller: {offer.item.seller?.username}</p>
                  
                  <div className="offer-details">
                    <div className="offer-amount">
                      <strong>Your Offer:</strong> €{offer.amount}
                    </div>
                    <div className={`offer-status ${offer.status}`}>
                      {offer.status}
                    </div>
                    <div className="offer-date">
                      {new Date(offer.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="offer-actions">
                    <Link 
                      to={`/items/${offer.item._id}`} 
                      className="view-item-profile"
                    >
                      View Item
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No offers made yet</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
