import './CartItem.css'

import { useCart } from '../../Contexts/CartContext';

const CartItem = ({ item }) => {

    const { removeItem } = useCart();

    return (
        <div className="cart-items">
            <h2>{item.title} </h2>
            <div className="image-thumbnail">
                {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <ul>
                <li>
                    {item.seller}
                </li>
                <li>
                    {item.price}
                </li>
            </ul>
            <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
    )
}

export default CartItem