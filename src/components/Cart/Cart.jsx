import './Cart.css'

import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'

import { MdModeEdit, MdDelete, MdFavorite } from "react-icons/md"


const Cart = () => {
    //  const { user } = useContext(UserContext)

    // State

    // Location variables

    // Fetching data

    // Functions


    return (
         <div className="bag-content">
            <h1>Your bag</h1>
              <div className="cart-items">
 
              </div>
              <div className="order-summary">
                <h3>Order summary</h3>
                <p> Total will appear here </p>
                  <div className="button-row">
                  <button className="checkout-button">Go to checkout</button>
                  </div>
                </div>
              </div>
    )
}


export default Cart
