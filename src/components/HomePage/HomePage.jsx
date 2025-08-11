import './HomePage.css'
import { useNavigate } from 'react-router-dom'

import accessoriesImg from '../../assets/accessories-category.jpeg';
import heroImg from '../../assets/hero-image.jpeg';
import techImg from '../../assets/tech-category.jpeg';
import placeholderImg from '../../assets/placeholder.jpeg';

const HomePage = () => {
  const navigate = useNavigate()

  const gotoDiscoverAll = () => {
    navigate('/items')  
  }

  return (
    <main>
    <section className="hero">
      <h1>The No #1 Marketplace for Luxury Goods</h1>
      <p>Discover amazing items and experiences.</p>
    </section>
    <section className="page-content">
      <div id="categories">
        <h2>Categories</h2>
      <p>Browse the latest items for sale in each category.</p>
      <button className="page-button" onClick={gotoDiscoverAll}>Discover all</button>
      <div className="image-row">
    <img src={accessoriesImg} alt="A black luxury watch with a grey background" />
    <img src={heroImg} alt="Temporary img placeholder" />
    <img src={techImg} alt="A woman sitting down wearing a virtual reality headset" />
  </div>
      </div>
          <div id="featured-items">
        <h2>Featured</h2>
      <p>Find the best deals and all the latest listings here.</p>
            <button className="page-button">Shop now</button>
                  <div className="image-row">
    <img src={placeholderImg} alt="Text that says Coming soon" />
    <img src={placeholderImg} alt="Text that says Coming soon" />
    <img src={placeholderImg} alt="Text that says Coming soon" />
  </div>
      </div>
      </section>
    </main>
  )
}

export default HomePage
