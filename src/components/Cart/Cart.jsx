import './Cart.css'

import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'

import { UserContext } from '../../Contexts/UserContext'
import { useCart } from '../../Contexts/CartContext'
import CartItem from '../CartItem/CartItem'
import CartSummary from '../CartSummary/CartSummary'


const Cart = () => {

    const { user } = useContext(UserContext)
    const { cart, setCart } = useCart()

    useEffect(() => {
    setCart([])
}, [user])

    return (
        <div className='bag-content'>
            <div className='bag-header'>
                <h1>Your bag</h1>
            </div>
            <div className='bag-columns'>
                <div className='content-section'>
                    {cart.length > 0 ? (
                        cart.map((cartItem) => {
                            return (
                                <CartItem key={cartItem.id} item={cartItem}/>
                            )
                        }
                        )
                    ) : (
                        <p>Your bag is empty</p>
                    )
                    }
                    <div className="button-row">
                        <Link to="/items" className="page-button">Continue shopping</Link>
                    </div>
                </div>
                <div className="content-section order-summary">
                    <h2>Order summary</h2>
                    <CartSummary />
                    <div className="button-row">
                        <Link to="/checkout" className="page-button">Go to checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart
