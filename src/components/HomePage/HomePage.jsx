import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { itemsIndex } from '../../services/items'

import accessoriesImg from '../../assets/accessories-category.jpeg';
import heroImg from '../../assets/hero-image.jpeg';
import techImg from '../../assets/tech-category.jpeg';

const HomePage = () => {
  const navigate = useNavigate()
  const [recentItems, setRecentItems] = useState([])
  const [loading, setLoading] = useState(true)

  const gotoDiscoverAll = () => {
    navigate('/items')  
  }

  // Fetch recent items
  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        setLoading(true)
        const response = await itemsIndex()
                
        // Sort items by creation date (newest first) and get the 4 most recent
        const sortedItems = response.data.sort((a, b) => {
          // Try createdAt first, then updatedAt, then fallback to _id (newer IDs are more recent)
          const dateA = new Date(a.createdAt || a.updatedAt || 0)
          const dateB = new Date(b.createdAt || b.updatedAt || 0)
          
          // If both dates are valid, compare them
          if (dateA.getTime() > 0 && dateB.getTime() > 0) {
            return dateB - dateA // Newest first
          }
          
          // If dates are not available, fallback to _id comparison (newer ObjectIds are more recent)
          if (a._id && b._id) {
            return a._id.localeCompare(b._id) * -1 // Reverse order so newer IDs come first
          }
          
          return 0
        })
        
        const recent = sortedItems.slice(0, 4)
        setRecentItems(recent)
      } catch (error) {
        console.error('Error fetching recent items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentItems()
  }, [])

  return (
    <main>
    <section className="hero">
      <h1>The No #1 Marketplace for Luxury Goods</h1>
      <p>Discover your favourite designers and the latest tech.</p>
    </section>
    <section className="page-content">
      <div id="categories">
        <h2>Categories</h2>
      <p>Browse the latest items for sale in each category.</p>
      <button className="page-button" onClick={gotoDiscoverAll}>Discover all</button>
      <div className="image-row">
    <img src={accessoriesImg} alt="A black luxury watch with a grey background" />
    <img src={heroImg} alt="Temporary img placeholder" />
    <img src={techImg} alt="A woman sitting down wearing a virtual reality headset" />
  </div>
      </div>
          <div id="recent-items">
        <h2>Recent Items</h2>
      <p>Check out the latest items just added to our marketplace.</p>
            <button className="page-button" onClick={gotoDiscoverAll}>View all items</button>
            
            {loading ? (
              <div className="loading-container">
                <p>Loading recent items...</p>
              </div>
            ) : recentItems.length > 0 ? (
              <div className="recent-items-grid">
                {recentItems.map((item) => (
                  <Link key={item._id} to={`/items/${item._id}`} className="recent-item-card">
                    <div className="recent-item-image">
                      <img 
                        src={item.images?.[0] || "https://via.placeholder.com/200x200?text=No+Image"} 
                        alt={item.title} 
                      />
                    </div>
                    <div className="recent-item-info">
                      <h3>{item.title}</h3>
                      <p className="recent-item-price">€{item.price}</p>
                      <p className="recent-item-seller">by {item.seller?.username || 'Unknown'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-items">
                <p>No recent items available.</p>
              </div>
            )}
      </div>
      </section>
    </main>
  )
}

export default HomePage
