import './CategoryLifestylePage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { itemsIndex, toggleFavorite } from '../../services/items'
import { UserContext } from '../../Contexts/UserContext'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

const LifestylePage = () => {
    // Context
    const { user } = useContext(UserContext)

    // State
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const allowedTypes = ["candle", "fragrance", "vase", "side table", "candle holder", "tray", "lamp", "trunk", "towel", "bathrobe", "rug", "soft furnishing", "coffee table"]

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
    }, [])

    const handleToggleFavorite = async (itemId) => {
        if (!user) {
            navigate('/sign-in')
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

    const filteredItems = items.filter(item => allowedTypes.includes(item.type))

    return (
        <div className="page-content">
            <div className="page-header">
                <h1>Lifestyle</h1>
                <p>Discover luxury lifestyle and home items.</p>
            </div>
            <div className="items-listings">
                {filteredItems.length > 0 ? (
                    <div className="items-container">
                        {filteredItems.map((item) => {
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
                    <p>There are currently no items for sale in this category.</p>
                )}
            </div>
        </div>
    )
}

export default LifestylePage