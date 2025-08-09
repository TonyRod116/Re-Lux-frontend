import './Navbar.css'

const Navbar = () => {
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
      <a href="/sign-in" class="nav-button">Sign In</a>
      <a href="/sign-up" class="nav-button">Sign Up</a>
      </nav>
    </nav>
  )
}

export default Navbar