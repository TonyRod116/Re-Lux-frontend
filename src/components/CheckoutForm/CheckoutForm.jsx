
import { useState, useEffect } from 'react'
import { itemUpdate, itemShow, getItemTypes } from '../../services/items'
import { useNavigate, useParams } from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    // Functions

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        try {
            const card = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            })
        }

        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    )

}


export default CheckoutForm