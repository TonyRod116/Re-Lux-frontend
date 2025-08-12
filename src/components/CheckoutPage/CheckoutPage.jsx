import './CheckoutPage.css'
import CheckoutForm from './CheckoutForm/CheckoutForm'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { purchaseIntent } from '../../services/stripe'

const stripePromise = loadStripe('pk_test_51RvEnKLg1i0XX0nHB9YGSf3ijavxfPZ5rCxDK4BVRJX0cYwFRz5y1INi4oZbJ1OtTZKB3SZNp73llazJdwpSRJCY00sjvLESC2')


const CheckoutPage = () => {

    // State

    const [clientSecret, setClientSecret] = useState('')

    // Fetch data

    useEffect(() => {
        async function fetchClientSecret() {
            const secret = await purchaseIntent(5000)
            setClientSecret(secret)
        }
        fetchClientSecret()
    }, [])

    if (!clientSecret) return <div>Please wait...</div>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    )


}

export default CheckoutPage