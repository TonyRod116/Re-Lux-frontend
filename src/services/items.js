import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/items'

export const itemsIndex = () => {
    return axios.get(BASE_URL)

}

export const getItemTypes = () => {
  return axios.get(`${BASE_URL}/types`)
}

export const itemShow = () => {
    return axios.get(`${BASE_URL}/${projectId}`)
}

export const itemCreate = (formData) => {
    console.log('Posting to:', BASE_URL + '/new')
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
