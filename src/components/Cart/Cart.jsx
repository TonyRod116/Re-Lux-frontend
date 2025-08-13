import './Cart.css'

import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdModeEdit, MdDelete, MdFavorite } from 'react-icons/md'

import { UserContext } from '../../Contexts/UserContext'
import { useCart } from '../../Contexts/CartContext';


const Cart = () => {
const { user } = useContext(UserContext)

    // State

    // Location variables

    // Fetching data

    // Functions


    return (
        <div className='bag-content'>
            <div className='bag-header'>
                <h1>Your bag</h1>
            </div>
            <div className='bag-columns'>
                <div className='cart-items'>

            {cart.length > 0 ? (
                    cart.map(cartItem => cartItem )
            ) : (
                    <p>Your bag is empty</p>
        )
}

                    <div className="button-row">
                    <Link to="/items" className="page-button">Continue shopping</Link>
                    </div>
                </div>
                <div className="order-summary">
                    <h3>Order summary</h3>
                    <p> Total will appear here </p>
                    <div className="button-row">
                        <Link to="/checkout" className="page-button">Go to checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart
