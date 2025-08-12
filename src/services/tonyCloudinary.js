const BASE_URL = import.meta.env.VITE_API_URL + '/cloudinary'

export const uploadImage = (file) => {
    return axios.post(`${BASE_URL}/upload`, formData)
}