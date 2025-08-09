import { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import './Navbar.css'

const Navbar = () => {
  const { user, signOut } = useContext(UserContext)

  return (
    <nav>
      <nav id="main-pages">
      <a href="/" class="home-link">Re-Lux</a>
      <a href="/Items" class="page-link">Men</a>
      <a href="/Items" class="page-link">Women</a>
      <a href="/Items" class="page-link">Accessories</a>
      <a href="/Items" class="page-link">Tech</a>
      <a href="/Items" class="page-link">Lifestyle</a>
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