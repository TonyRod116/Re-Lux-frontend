import axios from 'axios'

export async function purchaseIntent(amount) {
    const { data } = await axios.post('/purchase-intent', { amount })
    return data.clientSecret
}