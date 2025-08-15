import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/reviews'

// Create a new review
export const createReview = async (reviewData) => {
  const token = getToken()
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  const response = await axios.post(BASE_URL, reviewData, {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  return response
}

// Get reviews for a specific user
export const getUserReviews = async (userId) => {
  const token = getToken()
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  const response = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}

// Get average rating for a user
export const getUserAverageRating = async (userId) => {
  const token = getToken()
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  const response = await axios.get(`${BASE_URL}/user/${userId}/average`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}

// Check if current user has already reviewed a specific user
export const checkIfUserReviewed = async (targetUserId) => {
  const token = getToken()
  if (!token) {
    throw new Error('No authentication token found')
  }
  
  return axios.get(`${BASE_URL}/check/${targetUserId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
