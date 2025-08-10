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

  return (
    <div>

    </div>
  )
}

export default ItemShow
