import './App.css';

import { useState } from 'react'
import { Routes, Route } from 'react-router'

// Global components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Page components
import HomePage from './components/HomePage/HomePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import ItemIndex from './components/ItemIndex/ItemIndex'
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
        <Route path="/Items" element={<ItemIndex />} />
        <Route path="/Items/create" element={<ItemCreatePage />} />
        <Route path="/Items/:ItemId/edit" element={<ItemUpdatePage />} />
        <Route path="/Items/:ItemId" element={<ItemShow />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App