import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items'

// Add item to favorites
export const addToFavorites = async (itemId) => {
  try {
    const token = getToken()
    console.log('🔍 addToFavorites - Item ID:', itemId)
    console.log('🔍 Token exists:', !!token)
    console.log('🔍 Token starts with:', token ? token.substring(0, 20) + '...' : 'No token')
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    console.log('🔍 Request headers:', headers)
    
    const response = await axios.post(`${BASE_URL}/${itemId}/favorite`, {}, { headers })
    console.log('🔍 addToFavorites response:', response)
    return response
  } catch (error) {
    console.error('❌ Error in addToFavorites:', error)
    console.error('❌ Error response:', error.response)
    throw error
  }
}

// Remove item from favorites
export const removeFromFavorites = async (itemId) => {
  try {
    const token = getToken()
    console.log('🔍 removeFromFavorites - Item ID:', itemId)
    console.log('🔍 Token exists:', !!token)
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.delete(`${BASE_URL}/${itemId}/favorite`, { headers })
    console.log('🔍 removeFromFavorites response:', response)
    return response
  } catch (error) {
    console.error('❌ Error in removeFromFavorites:', error)
    console.error('❌ Error response:', error.response)
    throw error
  }
}

// Get user's favorite items
export const getUserFavorites = async () => {
  try {
    const token = getToken()
    console.log('🔍 getUserFavorites - Token exists:', !!token)
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.get(`${BASE_URL}/favorites`, { headers })
    console.log('🔍 getUserFavorites response:', response)
    return response
  } catch (error) {
    console.error('❌ Error in getUserFavorites:', error)
    console.error('❌ Error response:', error.response)
    throw error
  }
}

// Check if item is favorited by user
export const checkIfFavorited = async (itemId) => {
  try {
    const token = getToken()
    console.log('🔍 checkIfFavorited - Item ID:', itemId)
    console.log('🔍 Token exists:', !!token)
    
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    const response = await axios.get(`${BASE_URL}/${itemId}/favorite`, { headers })
    console.log('🔍 checkIfFavorited response:', response)
    return response
  } catch (error) {
    console.error('❌ Error in checkIfFavorited:', error)
    console.error('❌ Error response:', error.response)
    throw error
  }
}
