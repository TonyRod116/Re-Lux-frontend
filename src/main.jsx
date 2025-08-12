import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/forms.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './Contexts/UserContext.jsx'

import { CheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51RvEnKLg1i0XX0nHB9YGSf3ijavxfPZ5rCxDK4BVRJX0cYwFRz5y1INi4oZbJ1OtTZKB3SZNp73llazJdwpSRJCY00sjvLESC2')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)