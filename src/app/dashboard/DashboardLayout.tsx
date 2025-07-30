'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CartSidebar from '../components/cart';
import { usePathname } from 'next/navigation';
import Navbar from '../components/layout/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const closeSidebar = () => setIsSidebarOpen(false);

    const isActive = (link: string) => pathname.startsWith(link);

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <Navbar page={true} />

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Content */}
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
                                    className={`hover:text-gray-300 ${pathname === '/dashboard' ? 'text-gray-300' : ''}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/products"
                                    className={`hover:text-gray-300 ${isActive('/dashboard/products') ? 'text-gray-300' : ''}`}
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/orders"
                                    className={`hover:text-gray-300 ${isActive('/dashboard/orders') ? 'text-gray-300' : ''}`}
                                >
                                    Orders
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
