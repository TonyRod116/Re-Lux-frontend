import React from 'react'
import './SignInPage.css'

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignInPage
