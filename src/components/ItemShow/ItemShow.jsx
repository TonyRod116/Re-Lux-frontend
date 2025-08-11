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
  const [loading, setLoading] = useState()

  const { itemId } = useParams()
  const navigate = useNavigate()

  //Fetch data
  useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const { data } = await itemShow(itemId)
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

  return (
    <div className="page-content">
      {/* Need to add conditional express depending on logged/ownership status */}
      <button className="seller-button">Edit</button>
      <button className="seller-button">Delete</button>
      {/* Add icons from react icons package */}
      <div>
      <h1>{item.name}</h1>
      <p>Seller: {item.seller}</p>
      <p>Location: {item.location}</p>
      <p>Description: {item.description}</p>
      <p> {item.price}</p>
      <button className="page-button">Buy now</button>
      <button className="page-button">Make an offer</button>
      </div>
      <div className="images"> 
        {/* Need to style this div */}
        {/* {item.images} */}
        </div>

    </div>
  )
}

export default ItemShow
