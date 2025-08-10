import ItemCreateForm from '../ItemCreateForm/ItemCreateForm'
import { Link } from 'react-router-dom'

const ItemCreatePage = () => {
  return (
    <div className="page-content">
      <h1>List your item</h1>
      <p>Please enter your product details, including its dimensions, condition, origin, and brand.</p>
      <section className='form'>
        <ItemCreateForm />
      </section>
      <Link to="/profile">Back to your profile</Link>
    </div>
  )
}

export default ItemCreatePage
