import './CheckoutPage.css'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51RvEnKLg1i0XX0nHB9YGSf3ijavxfPZ5rCxDK4BVRJX0cYwFRz5y1INi4oZbJ1OtTZKB3SZNp73llazJdwpSRJCY00sjvLESC2')


const CheckoutPage = () => {
    return (
        <div className="page-content">
            <h1> Checkout </h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )


}

export default CheckoutPage