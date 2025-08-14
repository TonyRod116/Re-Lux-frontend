import './CheckoutPage.css'
import CheckoutForm from '../CheckoutForm/CheckoutForm'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { purchaseIntent } from '../../services/stripe'

const stripePromise = loadStripe('pk_test_51RvEnKLg1i0XX0nHB9YGSf3ijavxfPZ5rCxDK4BVRJX0cYwFRz5y1INi4oZbJ1OtTZKB3SZNp73llazJdwpSRJCY00sjvLESC2')


const CheckoutPage = () => {

    // State

    const [clientSecret, setClientSecret] = useState(null)
    const [loadingSecret, setLoadingSecret] = useState(true);

    // Fetch data

    useEffect(() => {
        async function fetchClientSecret() {
            try {
                const secret = await purchaseIntent(5000);
                setClientSecret(secret);
            } catch (err) {
                console.error("Error fetching client secret:", err);
            } finally {
                setLoadingSecret(false);
            }
        }
        fetchClientSecret();
    }, []);

    if (loadingSecret) {
        return <div>Loading form...</div>;
    }

    if (!clientSecret) {
        return <div>We were unable to take this payment. Please try again later.</div>;
    }

    return (
        <>
            <h1> Checkout </h1>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
            </Elements>
        </>
    )


}

export default CheckoutPage