import './ItemCreateForm.css'

import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'

import { itemCreate, getItemTypes } from '../../services/items'
import { UserContext } from '../../Contexts/UserContext'
import ImageUpload from '../ImageUpload/ImageUpload'

const ItemCreateForm = () => {

  const { user } = useContext(UserContext)

  // if (!user) return <Navigate to= ''

  // State
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    images: [],
    price: 1,
    sellerUsername: user?.username || '', // Add seller username
  })

  const [uploading, setUploading] = useState(false)
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

const handleSubmit = async (e) => {
  e.preventDefault()
  setUploading(true)
  try {
    // Add seller ID and username to formData
    const itemData = {
      ...formData,
      seller: user._id, // Add seller ID
      sellerUsername: user.username // Add seller username
    }
    console.log('🔍 Creating item with data:', itemData)
    const { data } = await itemCreate(itemData)
    navigate(`/items/${data._id}`)
  } catch (error) {
    console.log(error)
    setErrors(error.response?.data || { general: 'Something went wrong' })
  } finally {
    setUploading(false)
  }
}

return (
  <div>
    <form  onSubmit={handleSubmit}>

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

      <ImageUpload
      labelText="Upload photos"
      fieldName="images"
      setFormData={ setFormData }
      imageURLs={formData.images}
      setUploading={setUploading}
      />


      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" placeholder='Please set your price' value={formData.price} onChange={handleChange} />
      {errors.price && <p className='error-message'>{errors.price}</p>}

      <button type='submit'>{uploading ? 'Please wait...' : 'Create listing'}</button>
    </form>
  </div>
)
}

export default ItemCreateForm
