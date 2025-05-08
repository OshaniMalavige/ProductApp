'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, categories }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let results = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            results = results.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            results = results.filter(
                product =>
                    product.title.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower)
            );
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                results.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
            case 'name-asc':
                results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                results.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // Default sorting (by id)
                results.sort((a, b) => a.id - b.id);
        }

        setFilteredProducts(results);
    }, [products, selectedCategory, sortBy, searchTerm]);

    return (
        <div>
            <div className="mb-8 bg-[var(--background)] p-4 rounded-lg shadow mt-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 border border-[var(--borderColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--borderHoverColor)] focus:border-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <select
                                className="w-full px-4 py-2 border border-[var(--borderColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--borderHoverColor)] focus:border-primary-500"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                className="w-full px-4 py-2 border border-[var(--borderColor)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--borderHoverColor)] focus:border-primary-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Default Sorting</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Rating</option>
                                <option value="name-asc">Name: A-Z</option>
                                <option value="name-desc">Name: Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-[var(--primaryColor)]">No products found</h3>
                    <p className="mt-2 text-sm text-[var(--primaryHoverColor)]">
                        Please search any other product
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600 text-end">
                Showing {filteredProducts.length} of {products.length} products
            </div>
        </div>
    );
}