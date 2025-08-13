import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/index.css'
import './styles/forms.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Contexts/UserContext.jsx'
import { CartProvider } from './Contexts/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)