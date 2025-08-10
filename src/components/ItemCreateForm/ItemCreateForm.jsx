import './ItemCreateForm.css'

import { useState } from 'react'
import { itemCreate } from '../../services/items'
import { useNavigate } from 'react-router'

const ItemCreateForm = () => {
// State
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    images: '',
    price: 1,
    seller: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

// Location Variables
const navigate = useNavigate()

// Functions

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const { data } = await itemCreate(formData)
    navigate(`/items/${data._id}`)
  } catch (error) {
    console.log(error)
    setErrors(errors.response.data)
  } finally {
    setSubmitting (false)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>Create New Item</h1>
      <form>
        <input type="text" placeholder="Item Name" />
        <textarea placeholder="Item Description"></textarea>
        <input type="number" placeholder="Price" />
        <button type="submit">Create Item</button>
      </form>
      <a href="/Items">Back to Items</a>
    </div>
  )
}
}

export default ItemCreateForm
