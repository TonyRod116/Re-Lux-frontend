import React, { useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import ProfileForm from '../ProfileForm/ProfileForm'
import { updateUserProfile } from '../../services/users'
import { getToken } from '../../utils/auth'
import './ProfilePage.css'
import '../../styles/forms.css'

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!user) return <div>Please sign in to view profile</div>

  const handleSave = async (formData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = getToken()
      
      const response = await updateUserProfile(user._id, formData, token)
      
      // Update user context with new data
      setUser(response.data.user)
      
      // Close edit mode
      setIsEditing(false)
    } catch (error) {
      console.error('❌ Profile update error:', error)
      console.error('❌ Error response:', error.response)
      console.error('❌ Error message:', error.message)
      
      // Handle different types of errors
      if (error.response?.data) {
        setError(error.response.data)
      } else if (error.message) {
        setError({ message: error.message })
      } else {
        setError({ message: 'Error updating profile' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 
          src={user?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
          alt="Profile Image" 
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>@{user.username}</h1>
          <p className="bio">{user?.bio || 'No bio yet'}</p>
          {user?.location && <p className="location">📍 {user.location}</p>}
        </div>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing 
      ? (
        <ProfileForm 
          user={user}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
          error={error}
        />
        ) 
      : (
        <div className="profile-sections">
          <section>
            <h2>Items for Sale (0)</h2>
            <div className="items-grid">
              <p>No items for sale yet</p>
            </div>
          </section>

          <section>
            <h2>Favorites (0)</h2>
            <div className="items-grid">
              <p>No favorites yet</p>
            </div>
          </section>
        </div>
        )}
    </div>
  )
}

export default ProfilePage
