import React from 'react'
import { useParams } from 'react-router-dom'

const ItemUpdatePage = () => {
  const { ItemId } = useParams()

  return (
    <div>
      <h1>Edit Item</h1>
      <p>Editing Item ID: {ItemId}</p>
      <form>
        <input type="text" placeholder="Item Name" />
        <textarea placeholder="Item Description"></textarea>
        <input type="number" placeholder="Price" />
        <button type="submit">Update Item</button>
      </form>
      <a href={`/Items/${ItemId}`}>Back to Item</a>
    </div>
  )
}

export default ItemUpdatePage
