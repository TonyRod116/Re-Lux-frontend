import './CartSummary.css'

import { useCart } from '../../Contexts/CartContext';

const CartSummary = () => {

    const { cart } = useCart();
    const orderTotal = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <div className="order-summary-card">
            {cart.length > 0 ? (
                cart.map((cartItem) => {
                    return (
                        <div key={cartItem.id}>
                            <h2 className="order-item">
                                Order summary
                         
                            </h2>
                            <p className="order-item">
                                {cartItem.name}
                            </p>
                            <p className="order-item">
                                €{cartItem.price.toFixed(2)}
                            </p>
                        </div>
                    )
                })
            ) : (
                <p></p>
            )
            }
            <p>Total: €{orderTotal.toFixed(2)}</p>

        </div>
    )
}

export default CartSummary