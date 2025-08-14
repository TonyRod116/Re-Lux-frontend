import './CategoryAccessoriesPage.css'
import { useNavigate } from 'react-router-dom'

const AccessoriesPage = () => {
  const navigate = useNavigate()

  const gotoDiscoverAll = () => {
    navigate('/items')  
  }

  return (
    <main>
    <section className="hero">
      <h1>Accessories</h1>
      <p>Discover pieces from all your favorite designers.</p>
    </section>
    <section className="page-content">
      </section>
    </main>
  )
}