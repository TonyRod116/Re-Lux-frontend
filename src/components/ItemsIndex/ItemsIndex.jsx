import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { itemsIndex } from '../../services/items.js'

import './ItemsIndex.css'

const ItemsIndex = () => {

  // State
const [items, setItems] = useState([])
const [loading, setLoading] = useState(false)
const [errors, setErrors] = useState(null)

// Fetching data
useEffect(() => {
  const getItems = async () => {
    setLoading(true)
    try {
      const { data } = await itemsIndex()
      setItems(data)
    } catch (error) {
      setErrors(error)
    } finally {
      setLoading(false)
    }
  }
  getItems()
})

  return <div className="page-content">
      <h1>Pre-owned luxury</h1>
      <Link to="/items/new">Sell an item</Link>
      <p>Browse all the latest items for sale and grab your deal.</p>
      <div>
        <h2>All items</h2>
{items.length > 0 ? (
  <ul>
    {items.map((item) => (
      <li key="item._id">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {/* item.seller */}
        <p>{item.location}</p>
        <p>{item.price}</p>
        {/* item.images */}
      </li>
    ))}
  </ul>
) : (
  <p>There are currently no items for sale.</p>
)}
      </div>
      </div>
}


export default ItemsIndex
