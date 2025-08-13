import '/CartItem.css'

import { useCart } from '../Contexts/CartContext';

const { removeItem } = useCart();

const CartItem = ({ item }) => {

    return (
        <div className="cart-item">
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