import { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, signOut } = useContext(UserContext)

  return (
    <nav>
      <nav id="main-pages">
      <Link to="/" class="home-link">Re-Lux</Link>
      <Link to="/items" class="page-link">Men</Link>
      <Link to="/items" class="page-link">Women</Link>
      <Link to="/items" class="page-link">Accessories</Link>
      <Link to="/items" class="page-link">Tech</Link>
      <Link to="/items" class="page-link">Lifestyle</Link>
      </nav>
      <nav id="user-access">
      {user 
      ? (
        <>
          <a href="/Items/create" class="page-link-sell">Sell something special</a>
          <a href="/profile" class="page-link">Profile</a>
          <a href="#" onClick={(e) => {e.preventDefault(); signOut()}} className="nav-button">Sign Out</a>
        </>
        ) 
      : (
        <>
          <a href="/sign-in" class="nav-button">Sign In</a>
          <a href="/sign-up" class="nav-button">Sign Up</a>
        </>
        )}
      </nav>
    </nav>
  )
}

export default Navbar