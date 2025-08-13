import './CartSummary.css'

import { useCart } from '../../Contexts/CartContext';

const CartSummary = () => {

    const { cart } = useCart();
    const orderTotal = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <div className="order-summary">

            {cart.length > 0 ? (
                cart.map((cartItem) => {
                    return (
                        <ul key={cartItem.id}>
                            <li>
                                {cartItem.title}
                            </li>
                            <li>
                                {cartItem.price}
                            </li>
                        </ul>
                    )
                }
                )
            ) : (
                <p></p>
            )
            }
            <p>Total: €{orderTotal.toFixed(2)}</p>

        </div>
    )
}

export default CartSummary