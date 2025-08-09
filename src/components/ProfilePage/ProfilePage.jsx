import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user } = useContext(UserContext)

  if (!user) return <div>Please sign in to view profile</div>

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
          alt="Profile Image" 
          className="profile-pic"
        />
        <div className="profile-info">
          <h1>@{user.username}</h1>
          <p className="bio"></p>
        </div>
      </div>

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
    </div>
  )
}

export default ProfilePage
