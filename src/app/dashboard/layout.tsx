'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import CartToggle from '../components/CartToggle';
import CartSidebar from '../components/cart';
import Image from 'next/image';
import { usePathname } from 'next/navigation';  // Import the usePathname hook

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();  // Get the current pathname

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    const isActive = (link: string) => pathname.startsWith(link);  // Check if the link is active

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-blue-900 shadow px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar} className="md:hidden text-white">
                        <AlignJustify />
                    </button>

                    <Link href="/">
                        <Image
                            src="https://timzee-demo.myshopify.com/cdn/shop/files/logo_1.png?v=1645517921&width=500"
                            width={120}
                            height={120}
                            alt="logo"
                            className="w-auto h-10"
                        />
                    </Link>
                </div>
                <CartToggle color='white' />
            </header>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Content below header */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white p-6
                        transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                >
                    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`hover:text-gray-300 ${isActive('/dashboard') ? 'text-gray-300 underline' : ''}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/products"
                                    className={`hover:text-gray-300 ${isActive('/dashboard/products') ? 'text-gray-300 underline' : ''}`}
                                >
                                    Manage Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/orders"
                                    className={`hover:text-gray-300 ${isActive('/dashboard/orders') ? 'text-gray-300 underline' : ''}`}
                                >
                                    Manage Orders
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </main>
            </div>
            <CartSidebar />
        </div>
    );
}
