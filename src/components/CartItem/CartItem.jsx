import './CartItem.css'

import { useCart } from '../../Contexts/CartContext';

const CartItem = ({ item }) => {

    const { removeItem } = useCart();

    return (
        <div className="cart-items">
            <h2>{ item.title } </h2>
            <div className="image-preview">{item.image[0]}
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