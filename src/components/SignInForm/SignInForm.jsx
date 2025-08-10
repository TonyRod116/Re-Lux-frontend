import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../services/users'
import { setToken, getUser } from '../../utils/auth'
import { UserContext } from '../../Contexts/UserContext'
import '../../styles/forms.css'

export default function SignInForm(){
  
  // Context
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})


  // Nav
  const navigate = useNavigate()

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signIn(formData)
      setToken(data.token)
      setUser(getUser())
      navigate('/')
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  }

  const handleChange = (e) => {
    const newFormData = { ...formData }
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome back to <span className='brand-font'>Re-lux</span></h2>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" placeholder='yourname@example.com' value={formData.email} onChange={handleChange} />
      { errors.email && <p className='error-message'>{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='Your password' value={formData.password} onChange={handleChange} />
      {errors.password && <p className='error-message'>{errors.password}</p>}

      <button type="submit">Sign In</button>
    </form>
  )
}