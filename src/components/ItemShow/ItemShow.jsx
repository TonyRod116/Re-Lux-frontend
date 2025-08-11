import './ItemShow.css'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemShow, itemDelete } from '../../services/items.js'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'

import { MdModeEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"

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
      <div className="image-grid">
        {item.images?.length > 0 ? (
          item.images.map((url, i) => (
          <img
          key={i}
          src={url}
          alt={`${item.title} image ${i + 1}`}/>
        ))
      ) : (
        <p>No images available</p>
      )}
      </div>
      <div className="item-details">
        <div className="user-controls">
          {/* Need to add conditional express depending on logged/ownership status */}
          <Link to={`/items/${itemId}/edit`} className="edit-icon"><MdModeEdit /></Link>
          <button onClick={handleDelete} className="delete-icon"><MdDelete /></button>
          {/* Add icons from react icons package */}
        </div>
        <div>
          <h1>{item.title}</h1>
          <p> {item.price}</p>
          <p>Sold by {item.seller}</p>
          <p>{item.location}</p>
          <p>{item.description}</p>
          <div className="button-row">
          <button className="purchase-button">Buy now</button>
          <button className="offer-button">Make an offer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemShow
