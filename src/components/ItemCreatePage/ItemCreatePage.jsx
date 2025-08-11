import ItemCreateForm from '../ItemCreateForm/ItemCreateForm'
import { Link } from 'react-router-dom'

const ItemCreatePage = () => {
  return (
    <div className="page-content">
      <h1>Sell an item</h1>
      <p>Want to trade in your luxury goods? Create a listing below.</p>
      <section className='form'>
        <ItemCreateForm />
      </section>
      <Link to="/profile">Back to your profile</Link>
    </div>
  )
}

export default ItemCreatePage
