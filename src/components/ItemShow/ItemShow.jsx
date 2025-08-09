import { Link, useNavigate, useParams } from 'react-router-dom'

// import '/components/ItemShow/ItemShow.css'

const ItemShow = () => {
  const { ItemId } = useParams()

  return (
    <div>
      <h1>Item Details</h1>
      <p>Item ID: {ItemId}</p>
      <div>
        <a href={`/Items/${ItemId}/edit`}>Edit Item</a>
        <a href="/Items">Back to Items</a>
      </div>
    </div>
  )
}

export default ItemShow
