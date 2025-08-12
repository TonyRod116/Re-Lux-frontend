import React, { useState, useEffect } from 'react'
import './ProfileForm.css'
import '../../styles/forms.css'
import { uploadImage } from '../../services/tonyCloudinary'

const ProfileForm = ({ user, onSave, onCancel, isLoading, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
    profilePic: ''
  })
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState('')

  // Init form data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        profilePic: user.profilePic || ''
      })
    }
  }, [user]) // Run when user object changes (not just ID)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Reset previous errors
    setImageError('')
    
    // Max file size 5MB
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size must be less than 5MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file')
      return
    }

    try {
      setUploading(true)
      const { data } = await uploadImage(file)
      setFormData(prev => ({
        ...prev,
        profilePic: data.secure_url
      }))
      console.log('Profile image uploaded successfully:', data.secure_url)
    } catch (error) {
      console.error('Error uploading profile image:', error)
      setImageError('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave(formData)
  }

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      bio: user?.bio || '',
      location: user?.location || '',
      profilePic: user?.profilePic || ''
    })
    setImageError('')
    onCancel()
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profilePic: '' }))
    setImageError('')
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
      </div>
      
      <div>
        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept="image/*"
          onChange={handleImageChange}
          disabled={uploading}
        />
        {uploading && <p>Uploading image...</p>}
        {imageError && <div className="error-message">❌ {imageError}</div>}
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="3"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          placeholder="City, Country"
          onChange={handleChange}
        />
      </div>

      {formData.profilePic && (
        <div className="image-preview-container">
          <img src={formData.profilePic} alt="Preview" className="image-preview" />
          <button
            type="button"
            onClick={removeImage}
            className="remove-image-btn"
            >
          </button>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" disabled={isLoading || uploading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel} disabled={isLoading || uploading}>
          Cancel
        </button>
      </div>
      
      {error && (
        <div className="error-message general-error">
          ❌ {error.message || error}
        </div>
      )}
    </form>
  )
}

export default ProfileForm
