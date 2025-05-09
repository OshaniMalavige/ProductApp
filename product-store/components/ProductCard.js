'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div className="group bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg relative">
            <div>
                <div className="relative h-64 bg-white">
                    {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-contain p-4 transition-opacity duration-300 ${
                            isImageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => setIsImageLoading(false)}
                    />

                    {/* View Details Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <Link href={`/products/${product.id}`} className="flex items-center justify-center bg-white text-[var(--primaryColor)] p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all hover:scale-110">
                            <FaEye className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 flex-grow">
                            {product.title}
                        </h3>
                        <span className="bg-primary-100 text-primary-900 text-sm font-semibold px-2.5 py-0.5 rounded ml-2 whitespace-nowrap">
                            ${product.price}
                        </span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <span className="inline-block bg-[var(--badgeColor)] text-[var(--primaryHoverColor)] text-xs px-2 py-1 rounded">
                            {product.category}
                        </span>

                        <div className="flex items-center">
                            <FaStar className="text-yellow-400 w-4 h-4" />
                            <span className="ml-1 text-xs text-gray-600">
                                {product.rating?.rate || 0} ({product.rating?.count || 0})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}