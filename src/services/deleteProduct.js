import axios from 'axios'
export const deleteProduct = async (productId) => {
    await axios.delete(`/api/products/${productId}`)
}