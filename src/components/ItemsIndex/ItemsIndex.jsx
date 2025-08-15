import './ItemsIndex.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { itemsIndex, toggleFavorite } from '../../services/items'
import { UserContext } from '../../Contexts/UserContext'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

const ItemsIndex = () => {
  const { user } = useContext(UserContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await itemsIndex()
        setItems(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
        setError('Failed to load items')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const handleToggleFavorite = async (itemId) => {
    if (!user) {
      // Redirect to sign in if user is not logged in
      window.location.href = '/sign-in'
      return
    }

    try {
      // Optimistic update for better UX
      setItems(prevItems => 
        prevItems.map(item => 
          item._id === itemId 
            ? { ...item, isFavorited: !item.isFavorited }
            : item
        )
      )

      // Call backend to toggle favorite
      await toggleFavorite(itemId)
      
      // The backend will confirm the change on the next page refresh
      
    } catch (error) {
      console.error('Error toggling favorite:', error)
      
      // Revert optimistic update on error
      setItems(prevItems => 
        prevItems.map(item => 
          item._id === itemId 
            ? { ...item, isFavorited: !item.isFavorited }
            : item
        )
      )
    }
  }

  if (loading) return <div className="loading">Loading items...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header">
          <h1>Pre-owned luxury</h1>
          <p>Browse all the latest items for sale and grab your deal.</p>
        </div>
      </div>
      <div className="items-listing">
        {items.length > 0 ? (
          <div className="items-container">
            {items.map((item) => {
              return (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    <img src={item.images?.[0]} alt={item.title} />
                    {user && (
                      <button
                        className="favorite-button"
                        onClick={() => handleToggleFavorite(item._id)}
                        aria-label={item.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {item.isFavorited ? (
                          <MdFavorite className="favorite-icon filled" />
                        ) : (
                          <MdFavoriteBorder className="favorite-icon" />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="item-info">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      <span className="item-type">{item.type}</span>
                    </div>
                    <p className="item-description">{item.description}</p>
                    <div className="item-details">
                      <span className="item-seller">Seller: {item.seller?.username}</span>
                      <span className="item-location">📍 {item.location}</span>
                      <span className="item-price">€{item.price.toLocaleString()}</span>
                    </div>
                    <Link to={`/items/${item._id}`} className="view-item-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p>There are currently no items for sale.</p>
        )}
      </div>
    </div>
  )
}

export default ItemsIndex
