import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/forms.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './Contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CheckoutProvider stripe={ stripePromise }>
        <App />
        </CheckoutProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)