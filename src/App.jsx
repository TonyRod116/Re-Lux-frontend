import './App.css';

import { useState } from 'react'
import { Routes, Route } from 'react-router'

// Global
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Pages
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import ItemsIndex from './components/ItemsIndex/ItemsIndex'
import ItemShow from './components/ItemShow/ItemShow'
import ItemCreatePage from './components/ItemCreatePage/ItemCreatePage'
import ItemUpdatePage from './components/ItemUpdatePage/ItemUpdatePage'
import ProfilePage from './components/ProfilePage/ProfilePage'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/items" element={<ItemsIndex />} />
        <Route path="/items/new" element={<ItemCreatePage />} />
        <Route path="/items/:itemId/edit" element={<ItemUpdatePage />} />
        <Route path="/items/:itemId" element={<ItemShow />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App