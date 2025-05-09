import ProductList from "@/components/ProductList";

export const dynamic = 'force-static';

// Revalidate page every hour (3600 seconds)
export const revalidate = 3600;

async function getAllProducts() {
    try {
        const response = await fetch(`${process.env.API_URL}/products`);

        if (!response.ok) {
            return { error: `Failed to fetch products: ${response.status}` };
        }

        return { data: await response.json() };
    } catch (error) {
        return { error: error.message || 'Failed to fetch products' };
    }
}

async function getProductCategories() {
    try {
        const response = await fetch(`${process.env.API_URL}/products/categories`);

        if (!response.ok) {
            return { error: `Failed to fetch categories: ${response.status}` };
        }

        return { data: await response.json() };
    } catch (error) {
        return { error: error.message || 'Failed to fetch categories' };
    }
}

export default async function Home() {
    const productsResult = await getAllProducts();
    const categoriesResult = await getProductCategories();

    // If either request has an error
    const hasErrors = productsResult.error || categoriesResult.error;

    return (
        <div className="max-w-7xl mx-auto bg-[var(--background)] p-4">
            {hasErrors ? (
                <div className="bg-red-50 border-t-4 rounded-md p-4 text-center border-red-400 mt-4">
                    <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Content</h2>
                    <div className="text-red-700">
                        {productsResult.error && (
                            <p></p>
                        )}
                        {categoriesResult.error && (
                            <p></p>
                        )}
                        <p className="mt-4">Please try refreshing the page or contact support if the issue persists.</p>
                    </div>
                </div>
            ) : (
                <ProductList
                    products={productsResult.data}
                    categories={categoriesResult.data}
                />
            )}
        </div>
    );
}