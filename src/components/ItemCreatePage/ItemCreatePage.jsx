import ItemCreateForm from '../ItemCreateForm/ItemCreateForm'
import { Link } from 'react-router-dom'

const ItemCreatePage = () => {
  return (
    <div>
      <h1>Sell an item</h1>
      <p>Create your listing below. Please provide as many details as you can about the product, including its dimensions, condition, origin, and brand.</p>
      <section className='form'>
        <ItemCreateForm />
      </section>
      <Link to="/items">Back to Items</Link>
    </div>
  )
}

export default ItemCreatePage
