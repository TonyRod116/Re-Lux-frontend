import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <nav id="main-pages">
      <a href="/">Home</a>
      <a href="/Items">Items</a>
      </nav>
      <nav id="user-access">
      <a href="/sign-in">Sign In</a>
      <a href="/sign-up">Sign Up</a>
      </nav>
    </nav>
  )
}

export default Navbar