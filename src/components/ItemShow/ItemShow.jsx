import React from 'react'
import { useParams } from 'react-router-dom'

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
