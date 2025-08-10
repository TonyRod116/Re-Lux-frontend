import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL + '/auth'

export const signUp = async (formData) => {
  return axios.post(BASE_URL + '/sign-up', formData)
}

export const signIn = async (formData) => {
  return axios.post(BASE_URL + '/sign-in', formData)
}

export const updateUserProfile = async (username, formData, token) => {
  return axios.put(
    import.meta.env.VITE_API_URL + `/users/${username}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}