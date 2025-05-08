import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductById } from "@/lib/api";
import Button from "@/components/Button";

// Use Server-Side Rendering (SSR) for product detail pages
export const dynamic = 'force-dynamic';

// This function generates the possible paths at build time
export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage(props) {
    // Await the params object before accessing its properties
    const params = await props.params;

    try {
        // This request happens on every page request (SSR)
        const product = await getProductById(params.id);

        // Get related products (same category)
        const allProducts = await getAllProducts();
        const relatedProducts = allProducts
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);

        return (
            <div className="max-w-7xl mx-auto">
                {/* Product Detail */}
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="relative h-96 bg-white p-8 mt-16">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <div className="text-3xl font-bold text-primary-900 mb-4">
                                ${product.price}
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(product.rating?.rate || 0)
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-gray-600">
                                        {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="mb-2">
                                <span className="inline-block bg-[var(--badgeColor)] text-[var(--primaryHoverColor)] text-sm px-2 py-1 rounded mb-4">
                                    Category: {product.category}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-medium mb-2">Description</h2>
                                <p className="text-gray-600">{product.description}</p>
                            </div>

                            <div className="flex items-center mt-6 gap-4">
                                <div className="flex items-center border rounded-md">
                                    <button className="px-3 py-2 hover:bg-gray-100 transition">-</button>
                                    <span className="mx-3 text-lg w-8 text-center">1</span>
                                    <button className="px-3 py-2 hover:bg-gray-100 transition">+</button>
                                </div>

                                <Button>Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}