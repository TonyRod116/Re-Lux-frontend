import { createContext, useContext, useState } from 'react'
import { getUser } from '../utils/auth'

const CartContext = createContext()

const CartProvider = ({ children }) => {

    // State
    const [cart, setCart] = useState([]) // empty array for the initial cart

    // Functions

    const addItem = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id)

            if (existingItem) {
                return <p>Item already added to bag</p>
            } else {
                return [...currentCart, item] // Direct reference, not a copy of the item, so if the product becomes unavailable or price changes etc. this appears in the cart.
            }
        })
    }

    const removeItem = (itemId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== itemId)) // Searches by id and keeps everything except that item
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}


const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


export { CartProvider, useCart }

