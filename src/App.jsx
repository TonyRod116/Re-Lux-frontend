import './App.css';

import { useState, useContext } from 'react'
import { Routes, Route } from 'react-router'

// Global
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import FooterBar from './components/FooterBar/FooterBar'

// Pages
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import ItemsIndex from './components/ItemsIndex/ItemsIndex'
import AccessoriesPage from './components/CategoryAccessoriesPage/CategoryAccessoriesPage'
import FashionPage from './components/CategoryFashionPage/CategoryFashionPage'
import TechPage from './components/CategoryTechPage/CategoryTechPage'
import LifestylePage from './components/CategoryLifestylePage/CategoryLifestylePage'
import ItemShow from './components/ItemShow/ItemShow'
import ItemCreatePage from './components/ItemCreatePage/ItemCreatePage'
import ItemUpdatePage from './components/ItemUpdatePage/ItemUpdatePage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Cart from './components/Cart/Cart'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'

// Contexts



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/items" element={<ItemsIndex />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/fashion" element={<FashionPage />} />
        <Route path="/tech" element={<TechPage />} />
        <Route path="/lifestyle" element={<LifestylePage />} />
        <Route path="/items/new" element={<ItemCreatePage />} />
        <Route path="/items/:itemId/edit" element={<ItemUpdatePage />} />
        <Route path="/items/:itemId" element={<ItemShow />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <FooterBar />
    </>
  )
}

export default App