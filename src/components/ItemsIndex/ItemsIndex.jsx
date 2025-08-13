import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { itemsIndex } from '../../services/items'
import './ItemsIndex.css'
import { UserContext } from '../../Contexts/UserContext'



const ItemsIndex = () => {
  // Context
  const { user } = useContext(UserContext)
  
  // State
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const { itemId } = useParams()
  const navigate = useNavigate()


  // Fetch items from API
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
  }, [itemId])

  if (loading) return <div className="loading">Loading items...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>Pre-owned luxury</h1>
          <p>Browse all the latest items for sale and grab your deal.</p>
        </div>
        <Link to="/items/new" className="create-item-btn">
          + Create New Item
        </Link>
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
                  </div>
                  <div className="item-info">
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      <span className="item-type">{item.type}</span>
                    </div>
                    <p className="item-description">{item.description}</p>
                    <div className="item-details">
                      <span className="item-seller">Seller: {item.seller.username}</span>
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
