import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items'

export const itemsIndex = () => {
    const token = getToken()
    if (token) {
        // If user is logged in, include favorites info
        return axios.get(`${BASE_URL}/with-favorites`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    } else {
        // If no user, just get items without favorites
        return axios.get(BASE_URL)
    }
}

export const getItemTypes = () => {
  return axios.get(`${BASE_URL}/types`)
}

export const itemShow = (itemId) => {
    return axios.get(`${BASE_URL}/${itemId}`)
}

export const itemCreate = (formData) => {
    return axios.post(BASE_URL, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const itemUpdate = (itemId, formData) => {
    const token = getToken()
    return axios.put(`${BASE_URL}/${itemId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const itemDelete = (itemId) => {
    return axios.delete(`${BASE_URL}/${itemId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export const getUserItems = (userId) => {
    const token = getToken()
        
    return axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// New function to toggle favorite status
export const toggleFavorite = async (itemId) => {
    const token = getToken()
    if (!token) {
        throw new Error('User must be logged in to toggle favorites')
    }
    
    return axios.post(`${BASE_URL}/${itemId}/toggle-favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
