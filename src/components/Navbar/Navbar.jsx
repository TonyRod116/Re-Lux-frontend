import { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, signOut } = useContext(UserContext)

  return (
    <nav>
      <nav id="main-pages">
      <Link to="/" className="home-link">Re-Lux</Link>
      <Link to="/items" className="page-link">Men</Link>
      <Link to="/items" className="page-link">Women</Link>
      <Link to="/items" className="page-link">Accessories</Link>
      <Link to="/items" className="page-link">Tech</Link>
      <Link to="/items" className="page-link">Lifestyle</Link>
      </nav>
      <nav id="user-access">
      {user 
      ? (
        <>
          <Link to="/items/create" className="page-link-sell">Sell something special</Link>
          <Link to="/profile" className="page-link">Profile</Link>
          <Link to="#" onClick={(e) => {e.preventDefault(); signOut()}} className="nav-button">Sign Out</Link>
        </>
        ) 
      : (
        <>
          <Link to="/sign-in" className="nav-button">Sign In</Link>
          <Link to="/sign-up" className="nav-button">Sign Up</Link>
        </>
        )}
      </nav>
    </nav>
  )
}

export default Navbar