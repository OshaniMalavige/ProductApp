const API_URL = 'https://fakestoreapi.com';

export async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch product with id: ${id}`);
    }

    return response.json();
}

export async function getProductCategories() {
    const response = await fetch(`${API_URL}/products/categories`);

    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }

    return response.json();
}