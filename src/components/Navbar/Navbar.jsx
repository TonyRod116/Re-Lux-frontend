import { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import './Navbar.css'

import { Link } from 'react-router-dom'

import { IoBagOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const { user, signOut } = useContext(UserContext)

  return (
    <nav>
      <nav id="main-pages">
      <Link to="/" className="home-link">Re-Lux</Link>
      <Link to="/fashion" className="page-link">Fashion</Link>
      <Link to="/accessories" className="page-link">Accessories</Link>
      <Link to="/tech" className="page-link">Tech</Link>
      <Link to="/lifestyle" className="page-link">Lifestyle</Link>
      </nav>
      <nav id="user-access">
      {user 
      ? (
        <>
          <Link to="/items/new" className="page-link-sell">Sell an item</Link>
          <Link to="/cart" className="page-link"><IoBagOutline /></Link>
          <Link to="/profile" className="page-link"><VscAccount /></Link>
          <Link to="/" onClick={(e) => {e.preventDefault(); signOut()}} className="nav-button">Sign Out</Link>
        </>
        ) 
      : (
        <>
          <Link to="/sign-in" className="nav-button">Sign in</Link>
          <Link to="/sign-up" className="nav-button">Sign up</Link>
        </>
        )}
      </nav>
    </nav>
  )
}

export default Navbar