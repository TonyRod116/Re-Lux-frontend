import './ItemUpdateForm.css'

import { useState, useEffect } from 'react'
import { itemUpdate, itemShow, getItemTypes } from '../../services/items'
import { useNavigate, useParams } from 'react-router'


const ItemUpdateForm = () => {

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

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [prefillError, setPrefillError] = useState('')


// Location variables

const navigate = useNavigate()
const { projectId } = useParams()

// Fetching data

useEffect (() => {
    const getItemData = async () => {
        try {
            const { data } = await itemShow(itemId)
            setFormData(data)
        } catch (error) {
            console.log(error)
            setPrefillError('There was a problem loading this item. Please refresh the page and try again.')
        }
    }
    getItemData()
}, [itemId])

// Functions

const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})
    try {
        const { data } = await itemUpdate(itemId, formData)
        navigate(`/items/${data._id}`)
    } catch (error) {
        console.log(error)
        setErrors(error.response.data)
    } finally {
        setSubmitting(false)
    }
}

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

return (
      <div>
    <form className='form' onSubmit={handleSubmit}>

    {prefillError && <p className="error-message">{prefillError}</p>}


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

export default ItemUpdateForm