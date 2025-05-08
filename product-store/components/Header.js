"use client"
import { useState, useEffect } from 'react';
import { FaShoppingBag, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--headerBackground)] shadow-md' : 'bg-[var(--headerBackground)]'}`}>
            <div className="mx-auto px-8 sm:px-6 lg:px-20">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/assests/logo.png"
                                alt="Company Logo"
                                width={180}
                                height={45}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] px-3 py-2 font-bold">
                            Home
                        </Link>
                        <Link href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] px-3 py-2 font-bold">
                            Products
                        </Link>
                        <Link href="/contact" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] px-3 py-2 font-bold">
                            Contact Us
                        </Link>
                    </nav>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">
                            <FaShoppingBag className="h-6 w-6" />
                        </Link>
                        <Link href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">
                            <FaUser className="h-6 w-6" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--headerBackground)] shadow-lg">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] hover:bg[var(--badgeColor)] font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/"
                            className="block px-3 py-2 text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] hover:bg[var(--badgeColor)] font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)] hover:bg[var(--badgeColor)] font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact Us
                        </Link>

                        <div className="flex justify-around pt-4">
                            <Link
                                href="/"
                                className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaShoppingBag className="h-6 w-6" />
                            </Link>
                            <Link
                                href="/"
                                className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaUser className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}