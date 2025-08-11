import './ItemUpdatePage.css'

import ItemUpdateForm from '../ItemUpdateForm/ItemUpdateForm'
import { Link } from 'react-router-dom'

const ItemUpdatePage = () => {
  const { ItemId } = useParams()

  return (
    <div className="page-content">
      <h1>Edit an item</h1>
      <p>Update your details below and click save.</p>
      <section className='form'>
        <ItemUpdateForm />
      </section>
      <Link to='/:itemID'>Back to your item</Link> 
    </div>
  )
}

export default ItemUpdatePage
