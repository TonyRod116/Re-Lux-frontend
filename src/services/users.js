import axios from 'axios'

export const signUp = async (formData) => {
  return axios.post(import.meta.env.VITE_API_URL + '/api/auth/sign-up', formData)
}

export const signIn = async (formData) => {
  return axios.post(import.meta.env.VITE_API_URL + '/api/auth/sign-in', formData)
}

export const updateUserProfile = async (username, formData, token) => {
  const url = import.meta.env.VITE_API_URL + `/api/auth/users/${username}`
  
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}