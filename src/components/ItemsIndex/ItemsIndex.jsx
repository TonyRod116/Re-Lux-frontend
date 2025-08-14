import './ItemsIndex.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { itemsIndex } from '../../services/items'
import { addToFavorites, removeFromFavorites, checkIfFavorited } from '../../services/favorites'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

const ItemsIndex = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favoriteStates, setFavoriteStates] = useState({})

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await itemsIndex()
        setItems(response.data)
        
        // Check favorite status for each item
        const states = {}
        for (const item of response.data) {
          try {
            const favoriteResponse = await checkIfFavorited(item._id)
            states[item._id] = favoriteResponse.data.isFavorited
          } catch (error) {
            console.error(`Error checking favorite for item ${item._id}:`, error)
            states[item._id] = false
          }
        }
        setFavoriteStates(states)
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
    try {
      const isCurrentlyFavorited = favoriteStates[itemId]
      
      if (isCurrentlyFavorited) {
        await removeFromFavorites(itemId)
        setFavoriteStates(prev => ({ ...prev, [itemId]: false }))
      } else {
        await addToFavorites(itemId)
        setFavoriteStates(prev => ({ ...prev, [itemId]: true }))
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (loading) return <div className="loading">Loading items...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>Pre-owned luxury</h1>
          <p>Browse all the latest items for sale and grab your deal.</p>
        </div>
      </div>
      <div className="items-listing">
        <h2>All items</h2>
        {items.length > 0 ? (
          <div className="items-container">
            {items.map((item) => {
              console.log('Item data:', item)
              return (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    <img src={item.images?.[0]} alt={item.title} />
                    <button
                      className="favorite-button"
                      onClick={() => handleToggleFavorite(item._id)}
                      aria-label={favoriteStates[item._id] ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favoriteStates[item._id] ? (
                        <MdFavorite className="favorite-icon filled" />
                      ) : (
                        <MdFavoriteBorder className="favorite-icon" />
                      )}
                    </button>
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
