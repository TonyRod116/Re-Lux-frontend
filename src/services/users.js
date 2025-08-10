import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL + '/auth'

export const signUp = async (formData) => {
  return axios.post(BASE_URL + '/sign-up', formData)
}

export const signIn = async (formData) => {
  return axios.post(BASE_URL + '/sign-in', formData)
}

export const updateUserProfile = async (username, formData, token) => {
  const url = import.meta.env.VITE_API_URL + `/users/${username}`
  console.log('🌐 API URL:', url)
  console.log('📤 Request data:', formData)
  console.log('🔑 Token:', token ? 'Present' : 'Missing')
  
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}