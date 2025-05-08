import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products" className="btn">
                Return to Products
            </Link>
        </div>
    );
}