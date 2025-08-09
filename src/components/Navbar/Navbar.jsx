import './Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {
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
      <Link to="/sign-in" class="nav-button">Sign In</Link>
      <Link to="/sign-up" class="nav-button">Sign Up</Link>
      </nav>
    </nav>
  )
}

export default Navbar