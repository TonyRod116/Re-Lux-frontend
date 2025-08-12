
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

const CheckoutForm = () => {
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Billing Details */}
        <input
          type="text"
          placeholder="Full Name"
          value={billingDetails.name}
          onChange={(e) => updateBillingField('name', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={billingDetails.email}
          onChange={(e) => updateBillingField('email', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={billingDetails.phone}
          onChange={(e) => updateBillingField('phone', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />

        {/* Address Fields */}
        <input
          type="text"
          placeholder="Address Line 1"
          value={billingDetails.address.line1}
          onChange={(e) => updateAddressField('line1', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="Address Line 2"
          value={billingDetails.address.line2}
          onChange={(e) => updateAddressField('line2', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={billingDetails.address.city}
          onChange={(e) => updateAddressField('city', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={billingDetails.address.state}
          onChange={(e) => updateAddressField('state', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={billingDetails.address.postal_code}
          onChange={(e) => updateAddressField('postal_code', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <select
          value={billingDetails.address.country}
          onChange={(e) => updateAddressField('country', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          {/* Add more countries if needed */}
        </select>

        {/* Card Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-md p-3 bg-white">
            <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading || !cardComplete}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
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