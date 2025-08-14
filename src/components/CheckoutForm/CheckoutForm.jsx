
import { useState, useEffect } from 'react'
import { itemUpdate, itemShow, getItemTypes } from '../../services/items'
import { useNavigate, useParams } from 'react-router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#424770',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146'
    }
  }
}

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    }
  });

  // Functions

  const handleSubmit = async (e) => {
    console.log("Is submitting")
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: billingDetails,
        }
      })

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Billing Details */}
        <input
          type="text"
          placeholder="Full Name"
          value={billingDetails.name}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={billingDetails.email}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={billingDetails.phone}
          onChange={(e) => setBillingDetails(prev => ({ ...prev, phone: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Address Line 1"
          value={billingDetails.address.line1}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, line1: e.target.value }
          }))}
          required
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={billingDetails.address.line2}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, line2: e.target.value }
          }))}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={billingDetails.address.city}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, city: e.target.value }
          }))}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={billingDetails.address.state}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, state: e.target.value }
          }))}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={billingDetails.address.postal_code}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, postal_code: e.target.value }
          }))}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={billingDetails.address.country}
          onChange={(e) => setBillingDetails(prev => ({
            ...prev,
            address: { ...prev.address, country: e.target.value }
          }))}
        />

        {/* Card Details */}
        <div>
          <label>
            Card Details
          </label>
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
        </div>


        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading || !cardComplete || !clientSecret}
        >
          {loading ? (
            <>
              <span>Processing...</span>
            </>
          ) : (
            <span>Pay Now</span>
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secured by <span className="font-semibold">Stripe</span>
        </p>
      </div>
    </div>
  );
};


export default CheckoutForm