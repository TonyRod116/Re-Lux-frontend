import './ItemCreateForm.css'

import { useState, useEffect } from 'react'
import { itemCreate, getItemTypes } from '../../services/items'
import { useNavigate } from 'react-router'

const ItemCreateForm = () => {
  // State
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    images: '',
    price: 1,
  })

  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  // Location Variables
  const navigate = useNavigate()

  // Fetch item types for the dropdown
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getItemTypes()
        setTypes(res.data)
      } catch (error) {
        setErrors(error.response?.data || { general: 'Something went wrong' })
      }
    }
    fetchTypes()
  }, [])

// Functions

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setFormData({
    ...formData,
    images: files,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitting(true)
  try {
    const { data } = await itemCreate(formData)
    navigate(`/items/${data._id}`)
  } catch (error) {
    console.log(error)
    setErrors(error.response?.data || { general: 'Something went wrong' })

  } finally {
    setSubmitting(false)
  }
}

return (
  <div>
    <form className='form' onSubmit={handleSubmit}>

      <label htmlFor="title">Product name</label>
      <input type="text" name="title" id="title" placeholder='Enter your product name here' value={formData.title} onChange={handleChange} />
      {errors.title && <p className='error-message'>{errors.title}</p>}

      <label htmlFor="type">Product type</label>
      <select name="type" id="type" value={formData.type} onChange={handleChange}>
        <option value=''>-- Select product type--</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {errors.type && <p className='error-message'>{errors.type}</p>}

      <label htmlFor="description">Product description</label>
      <textarea name="description" id="description" placeholder='Please provide a description of your product, including its condition.' rows="10" value={formData.description} onChange={handleChange}></textarea>
      {errors.description && <p className='error-message'>{errors.description}</p>}

      <label htmlFor="location">Location</label>
      <input type="location" name="location" id="location" value={formData.location} onChange={handleChange} />
      {errors.location && <p className='error-message'>{errors.location}</p>}

      <label htmlFor="images">Photos</label>
      <input type="file" name="images" id="images" multiple accept="image/*" onChange={handleImageChange} />
      {errors.images && <p className='error-message'>{errors.images}</p>}

      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" placeholder='Please set your price' value={formData.price} onChange={handleChange} />
      {errors.price && <p className='error-message'>{errors.price}</p>}

      <button type='submit'>{submitting ? 'Please wait' : 'Create listing'}</button>
    </form>
  </div>
)
}

export default ItemCreateForm
