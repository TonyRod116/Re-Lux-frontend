import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ItemsIndex.css'

const ItemsIndex = () => {
  // Mockup data to practice until we have the real ones
  const [items] = useState([
    {
      _id: '1',
      title: 'Omega Seamaster',
      type: 'watch',
      description: 'Classic dive watch in excellent condition. Stainless steel bracelet, black dial, automatic movement.',
      seller: 'Tony',
      location: 'Madrid, Spain',
      price: 8500,
      images: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop',
      favourited_by_user: null
    },
    {
      _id: '2',
      title: 'Hermès Birkin Bag',
      type: 'handbag',
      description: 'Authentic Hermès Birkin 30cm in black Togo leather. Gold hardware, pristine condition.',
      seller: 'Maria',
      location: 'Barcelona, Spain',
      price: 12000,
      images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      favourited_by_user: null
    },
          {
        _id: '3',
        title: 'Designer Suit',
        type: 'suit',
        description: 'Premium Italian wool suit in charcoal grey. Perfect fit, excellent condition.',
        seller: 'Mark',
        location: 'London, UK',
        price: 2200,
        images: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
        favourited_by_user: null
      },
    {
      _id: '4',
      title: 'Cartier Love Bracelet',
      type: 'jewelry',
      description: 'Iconic Cartier Love bracelet in 18k yellow gold. Size 17, includes screwdriver.',
      seller: 'Katie',
      location: 'London, UK',
      price: 9800,
      images: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop',
      favourited_by_user: null
    }
  ])

  return <div className="page-content">
      <h1>Pre-owned luxury</h1>
      <p>Browse all the latest items for sale and grab your deal.</p>
      <div className="items-grid">
        <h2>All items</h2>
        {items.length > 0 
        ? (
          <div className="items-container">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-image">
                  <img src={item.images} alt={item.title} />
                </div>
                <div className="item-info">
                  <div className="item-header">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-type">{item.type}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-details">
                    <span className="item-seller">Seller: {item.seller}</span>
                    <span className="item-location">📍 {item.location}</span>
                    <span className="item-price">€{item.price.toLocaleString()}</span>
                  </div>
                  <Link to={`/items/${item._id}`} className="view-item-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          ) 
        : (
          <p>There are currently no items for sale.</p>
          )}
      </div>
      </div>
}


export default ItemsIndex
