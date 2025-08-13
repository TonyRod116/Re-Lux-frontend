import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import ProfileForm from '../ProfileForm/ProfileForm'
import { updateUserProfile } from '../../services/users'
import { getUserItems, itemDelete } from '../../services/items'
import { getToken } from '../../utils/auth'
import { Link } from 'react-router-dom'
import './ProfilePage.css'
import '../../styles/forms.css'

const ProfilePage = () => {
  const { user, setUser, isLoading: userLoading } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userItems, setUserItems] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [deletingItem, setDeletingItem] = useState(null)

  // Fetch user items when component mounts
  useEffect(() => {
    const fetchUserItems = async () => {
      if (user && user._id) {
        try {
          setItemsLoading(true)
          const response = await getUserItems(user._id)
          setUserItems(response.data)
        } catch (error) {
          console.error('Error fetching user items:', error)
          setUserItems([])
        } finally {
          setItemsLoading(false)
        }
      }
    }

    fetchUserItems()
  }, [user])

  // Show loading while user context is loading
  if (userLoading) return <div>Loading profile...</div>
  
  if (!user) return <div>Please sign in to view profile</div>

  const handleSave = async (formData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = getToken()
      
      const response = await updateUserProfile(user._id, formData, token)
      
      // Update user context with new data
      setUser(response.data.user)
      
      // Close edit mode
      setIsEditing(false)
    } catch (error) {
      const backendError = error.response?.data
      if (backendError && Object.keys(backendError).length > 0) {
        const firstValue = Object.values(backendError)[0]
        setError({ message: firstValue })
      } else {
        setError({ message: 'Error updating profile' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      const token = getToken()
      await itemDelete(itemId)
      
      // Remove item from local state
      setUserItems(prevItems => prevItems.filter(item => item._id !== itemId))
      
      // Close delete confirmation
      setDeletingItem(null)
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item. Please try again.')
    }
  }

  const confirmDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
      handleDeleteItem(item._id)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 
          src={user?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
          alt="Profile Image" 
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>@{user.username}</h1>
          <p className="bio">{user?.bio || 'No bio yet'}</p>
          {user?.location && <p className="location">📍 {user.location}</p>}
        </div>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <ProfileForm 
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <div className="profile-sections">
          <section>
            <h2>Items for Sale ({userItems.length})</h2>
            <div className="items-grid">
              {itemsLoading ? (
                <p>Loading items...</p>
              ) : userItems.length > 0 ? (
                userItems.map((item) => (
                  <div key={item._id} className="item-card">
                    <img 
                      src={item.images?.[0] || "https://via.placeholder.com/200x200?text=No+Image"} 
                      alt={item.title} 
                      className="item-image"
                    />
                    <div className="item-info">
                      <h3>{item.title}</h3>
                      <p className="item-price">€{item.price}</p>
                      <p className="item-description">{item.description}</p>
                      
                      {/* Show offers if any */}
                      {item.offers && item.offers.length > 0 && (
                        <div className="item-offers">
                          <p className="offers-title">Offers received: {item.offers.length}</p>
                          {item.offers.slice(0, 2).map((offer, index) => (
                            <div key={index} className="offer-item">
                              <span className="offer-amount">€{offer.amount}</span>
                              <span className="offer-status">{offer.status}</span>
                            </div>
                          ))}
                          {item.offers.length > 2 && (
                            <p className="more-offers">+{item.offers.length - 2} more offers</p>
                          )}
                        </div>
                      )}
                      
                      <div className="item-actions">
                        <Link 
                          to={`/items/${item._id}/edit`} 
                          className="edit-item-profile"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => confirmDelete(item)}
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
            <h2>Favorites (0)</h2>
            <div className="items-grid">
              <p>No favorites yet</p>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
