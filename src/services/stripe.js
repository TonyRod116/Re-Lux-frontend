import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export async function purchaseIntent(amount) {
    const { data } = await axios.post(BASE_URL + '/purchase-intent', { amount })
    return data.clientSecret
}