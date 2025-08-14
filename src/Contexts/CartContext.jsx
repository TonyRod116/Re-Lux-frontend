import { createContext, useContext, useState, useEffect } from 'react'
import { getUser } from '../utils/auth'
import { UserContext } from './UserContext'

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const { user } = useContext(UserContext)

    // State
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Changes when user logs out
     useEffect(() => {
        setCart([])
    }, [user])

    // Local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Functions

    const addItem = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.id === item.id)

            if (existingItem) {
                return currentCart
            } else {
                return [...currentCart, item]
            }
        })
    }

    const removeItem = (itemId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== itemId))
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addItem, removeItem }}>
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

