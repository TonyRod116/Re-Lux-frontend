import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items'

export const itemsIndex = () => {
    return axios.get(BASE_URL)
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
    return axios.put(`${BASE_URL}/${itemId}`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
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
