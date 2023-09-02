import axios from "axios"

export const updateProduct = async (updateItem) => {
    await axios.put(`/api/products/${updateItem.productId}`, { ...updateItem })
}