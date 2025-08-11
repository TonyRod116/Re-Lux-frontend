import axios from 'axios'

const BASE_URL = import.meta.env.VITE_CLOUDINARY_URL

export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)

  return axios.post(BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// Creates an axios call to your cloud on Cloudinary