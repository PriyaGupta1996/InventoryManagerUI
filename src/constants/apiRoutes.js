export const API_ROUTES = {
    DELETE_PRODUCT: productId => `/products/${productId}`,
    FETCH_SHELVES: '/shelves',
    FETCH_CATEGORIES: '/categories',
    FETCH_SEARCH_RESULTS: '/products',
    FETCH_VENDOR: '/vendors',
    UPDATE_PRODUCT: productId => `/products/${productId}`
}