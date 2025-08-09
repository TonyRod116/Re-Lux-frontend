import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <nav id="main-pages">
      <a href="/">Re-Lux</a>
      <a href="/Items">Men</a>
      <a href="/Items">Women</a>
      <a href="/Items">Accessories</a>
      <a href="/Items">Tech</a>
      <a href="/Items">Lifestyle</a>
      </nav>
      <nav id="user-access">
      <a href="/sign-in">Sign In</a>
      <a href="/sign-up">Sign Up</a>
      </nav>
    </nav>
  )
}

export default Navbar