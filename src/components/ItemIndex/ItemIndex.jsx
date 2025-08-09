import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// import '/components/ItemIndex/ItemIndex.css'

const ItemIndex = () => {
  return (
    <div>
      <h1>Items</h1>
      <div>
        <p>List of items will be displayed here.</p>
        <a href="/Items/create">Create New Item</a>
      </div>
    </div>
  )
}

export default ItemIndex
