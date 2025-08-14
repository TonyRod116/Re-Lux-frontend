import './CategoryTechPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { itemsIndex } from '../../services/items'

const TechPage = () => {

    // State
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const allowedTypes = ["smart watch", "smart glasses", "fitness tracker", "smart ring", "wireless earbuds", "noise-canceling headphones", "smartphone", "tablet", "latop", "smart speaker", "VR headset"]

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

    if (loading) return <div className="loading">Loading items...</div>
    if (error) return <div className="error">Error: {error}</div>

    const filteredItems = items.filter(item => allowedTypes.includes(item.type))


    return (
        <div className="page-content">
            <div className="page-header">
                <h1>Tech</h1>
                <p>Browse luxury smart watches, smart glasses, fitness trackers and more.</p>
            </div>
            <div className="items-listings">
                {filteredItems.length > 0 ? (
                    <div className="items-container">
                        {filteredItems.map((item) => {
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
                    <p>There are currently no items for sale in this category.</p>
                )}
            </div>
        </div>
    )
}

export default TechPage