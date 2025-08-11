import './ItemShow.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemShow, itemDelete } from '../../services/items.js'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'

const ItemShow = () => {

  // Context
  const { user } = useContext(UserContext)

  // State
  const [item, setItem] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { itemId } = useParams()
  const navigate = useNavigate()

  //Fetch data
  useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const { data } = await itemShow(itemId)
        console.log("API response:", data);
        setItem(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getItem()
  }, [itemId])

  // Functions

  const handleDelete = async () => {
    try {
      await itemDelete(itemId)
      navigate('/items')
    } catch (error) {
      setError(error)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!item) return <p>No item found</p>;

  return (
    <div className="item-content">
      <div className="images">
        {/* Need to style this div */}
        {item.images}
      </div>
      <div className="item-details">
        <div className="user-controls">
          {/* Need to add conditional express depending on logged/ownership status */}
          <button className="seller-button">Edit</button>
          <button className="seller-button">Delete</button>
          {/* Add icons from react icons package */}
        </div>
        <div>
          <h1>{item.title}</h1>
          <p> {item.price}</p>
          <p>Seller: {item.seller}</p>
          <p>Location: {item.location}</p>
          <p>Description: {item.description}</p>
          <button className="purchase-button">Buy now</button>
          <button className="offer-button">Make an offer</button>
        </div>
      </div>
    </div>
  )
}

export default ItemShow
