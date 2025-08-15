import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items'

// Add item to favorites
export const addToFavorites = async (itemId) => {
  try {
    const token = getToken()
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.post(`${BASE_URL}/${itemId}/favorite`, {}, { headers })
    return response
  } catch (error) {
    console.error('❌ Error in addToFavorites:', error)
    throw error
  }
}

// Remove item from favorites
export const removeFromFavorites = async (itemId) => {
  try {
    const token = getToken()
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.delete(`${BASE_URL}/${itemId}/favorite`, { headers })
    return response
  } catch (error) {
    console.error('❌ Error in removeFromFavorites:', error)
    throw error
  }
}

// Get user's favorite items
export const getUserFavorites = async () => {
  try {
    const token = getToken()
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.get(`${BASE_URL}/favorites`, { headers })
    return response
  } catch (error) {
    console.error('❌ Error response:', error.response)
    throw error
  }
}

// Check if item is favorited by user
export const checkIfFavorited = async (itemId) => {
  try {
    const token = getToken()
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.get(`${BASE_URL}/${itemId}/favorite`, { headers })
    return response
  } catch (error) {
    console.error('❌ Error response:', error.response)
    throw error
  }
}
