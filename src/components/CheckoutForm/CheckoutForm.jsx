
import { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCart } from '../../Contexts/CartContext';

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

const CheckoutForm = () => { // { clientSecret }
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart } = useCart(); // added

  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
   const [clientSecret, setClientSecret] = useState(''); // added
  const [paymentIntentId, setPaymentIntentId] = useState(''); // added

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

  // Calculate total (matching your CartSummary logic)
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Create payment intent when component mounts or cart changes
  useEffect(() => {
    if (cart.length === 0) return;

    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(calculateTotal() * 100), // Convert to cents
            cartItems: cart,
            currency: 'eur',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (err) {
        setError('Failed to initialize payment. Please try again.');
        console.error('Payment intent creation failed:', err);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [cart]);


  const handleSubmit = async (e) => {
    console.log("Is submitting")
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
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
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setCart([]); // clears cart on successful payment
      } else if (paymentIntent && paymentIntent.status === 'requires_payment_method') {
        setError('Your payment was declined. Please try a different card.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
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

    // Show empty cart message
  if (cart.length === 0 && !success) {
    return (
      <div className="empty-cart-message">
        <h2>Your bag is empty</h2>
        <p>Add some items to your bag before checkout.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="success-message">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <p>Payment ID: {paymentIntentId}</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
<div className="form">
  <form onSubmit={handleSubmit}>
        <div className="billing-details">
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
    </div>
    <div className="payment-details">
      <label>Card Details</label>
      <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />

      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading || !cardComplete || !clientSecret}
        className="submit-button"
      >
        {loading ? "Processing..." : `Pay €${calculateTotal().toFixed(2)}`}
      </button>
    </div>

  </form>

  <div className="stripe-note">
    Secured by <span className="font-semibold">Stripe</span>
  </div>
</div>
</div>

  );
};


export default CheckoutForm