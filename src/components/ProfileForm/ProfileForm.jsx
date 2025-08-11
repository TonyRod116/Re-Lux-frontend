import React, { useState, useEffect } from 'react'
import './ProfileForm.css'
import '../../styles/forms.css'

const ProfileForm = ({ user, onSave, onCancel, isLoading, error }) => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    profilePic: ''
  })

  // Init form data
  useEffect(() => {
    setFormData({
      bio: user?.bio || '',
      location: user?.location || '',
      profilePic: user?.profilePic || ''
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store URL
      // TODO: Upload image
      setFormData(prev => ({
        ...prev,
        profilePic: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSave(formData)
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const handleCancel = () => {
    // Reset data
    setFormData({
      bio: user?.bio || '',
      location: user?.location || '',
      profilePic: user?.profilePic || ''
    })
    onCancel()
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      
      <div>
        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept="image/*"
          onChange={handleImageChange}
        />
        {formData.profilePic && (
          <img 
            src={formData.profilePic} 
            alt="Preview" 
            className="image-preview"
          />
        )}
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

      <div className="form-actions">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </button>
      </div>
      
      {/* Show general error message prominently */}
      {error && (
        <div className="error-message general-error">
          ❌ {error.message || error}
        </div>
      )}
    </form>
  )
}

export default ProfileForm
