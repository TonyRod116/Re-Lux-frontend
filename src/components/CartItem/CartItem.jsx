import './CartItem.css'

import { useCart } from '../../Contexts/CartContext';

const CartItem = ({ item }) => {
    console.log(item)

    const { removeItem } = useCart();

    return (
        <div className="bag-item-card">
            <div className="bag-item-main">
                <div className="image-thumbnail">
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="item-info">
                    <h2>{item.name} </h2>
                    <p>by {item.seller}</p>
                    <p>€{item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="page-button">Remove</button>
            </div>
        </div>
    )
}

export default CartItem