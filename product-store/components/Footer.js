import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[var(--headerBackground)] text-[var(--primaryColor)]">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Link href="/">
                            <Image
                                src="/assests/logo.png"
                                alt="Company Logo"
                                width={180}
                                height={180}
                                priority
                            />
                        </Link>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">Home</a></li>
                            <li><a href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">Products</a></li>
                            <li><a href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">About Us</a></li>
                            <li><a href="/" className="text-[var(--primaryColor)] hover:text-[var(--primaryHoverColor)]">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-[var(--primaryColor)]">
                            <li>436 Malwaththa Road, Rose 100</li>
                            <li>Millennium City, 10200</li>
                            <li>info@logo.com</li>
                            <li>(+94) 777123456</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[var(--primaryHoverColor)] mt-8 pt-6 text-center text-[var(--primaryColor)]">
                    <p>&copy; {new Date().getFullYear()} <i>Logo</i>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}