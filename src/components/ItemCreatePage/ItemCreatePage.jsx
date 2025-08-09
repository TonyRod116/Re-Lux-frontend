

const ItemCreatePage = () => {
  return (
    <div>
      <h1>Create New Item</h1>
      <form>
        <input type="text" placeholder="Item Name" />
        <textarea placeholder="Item Description"></textarea>
        <input type="number" placeholder="Price" />
        <button type="submit">Create Item</button>
      </form>
      <a href="/Items">Back to Items</a>
    </div>
  )
}

export default ItemCreatePage
