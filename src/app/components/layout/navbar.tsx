"use client";

import { useCart } from "@/context/CartContext";
import { Search, ShoppingCart, UserRound, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartToggle from "../CartToggle";
import CartSidebar from "../cart";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();


  return (
    <nav className="bg-blue-900 text-gray-200 px-4 py-5  lg:px-8 relative z-50">
      <div className="flex justify-between items-center">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} className="cursor-pointer" />
          </button>

          {/* Logo */}
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

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-x-10 *:hover:text-yellow-400 *:uppercase *:font-medium *:text-lg">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="#">Pages</Link>
          <Link href="/contact-us">Contact us</Link>
        </ul>

        {/* Icons */}
        <div className="flex gap-x-5 items-center">
          <UserRound size={20} />
          <CartToggle />
          <Search size={20} />
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-xl transition-transform duration-300 z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20 ">
          {/* <span className="font-bold text-xl">Menu</span> */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer"
          >
            <X size={32} />
          </button>
        </div>
        <ul className="flex flex-col gap-y-4 p-6 *:uppercase *:font-medium *:text-md *:hover:text-yellow-400">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link href="#" onClick={() => setIsMenuOpen(false)}>
            Pages
          </Link>
          <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
            Contact us
          </Link>
        </ul>
      </div>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <CartSidebar />
    </nav>
  );
}
