import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items' 

// * New offer
export const createOffer = async (itemId, amount) => {
  const token = getToken()
  
  return axios.post(`${BASE_URL}/${itemId}/offers`, 
    { amount }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

// * Get offers for an item
export const getItemOffers = async (itemId) => {
  const token = getToken()
  
  return axios.get(`${BASE_URL}/${itemId}/offers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// * Update offer status (only seller)
export const updateOfferStatus = async (itemId, offerIndex, status) => {
  const token = getToken()
  
  return axios.put(`${BASE_URL}/${itemId}/${offerIndex}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// * Get user offers
export const getUserOffers = async () => {
  const token = getToken()
  
  return axios.get(`${BASE_URL}/user/offers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
