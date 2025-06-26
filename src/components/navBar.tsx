"use client";
import React, { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { usePathname } from "next/navigation";

export default function navBar() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const pathname = usePathname();

  // Show NavBar & Footer only if NOT under /admin
  const isAdminRoute = pathname?.startsWith("/admin");
  if (!isAdminRoute) {
    return (
      <div className="fixed top-0 z-50 w-full flex items-center justify-between h-16 md:px-60 bg-neutral-900 shadow text-emerald-50">
        <div className="flex items-center  ">
          <Link href="/" className="mr-4">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={50}
              className="p-5 "
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:block space-x-4">
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>
            <Link href="/products" className="hover:text-green-400">
              Products
            </Link>
            <Link href="#contact" className="hover:text-green-400">
              Contact
            </Link>
          </nav>
          {
            //create cart icon with 0 items
          }
          <div className="relative cursor-pointer">
            <Link href="/cart" className="flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-0.5">
                {items.length}
              </span>
            </Link>
          </div>
          {/* create resposive navbar */}
          {/* when click togle open mobile menu left side*/}
          <nav>
            <div
              className={`md:hidden fixed top-16 left-0 w-56 h-[100vh] bg-neutral-900 text-emerald-50 z-1 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Link
                href="/"
                onClick={toggleMenu}
                className="block px-4 py-2 hover:bg-green-700"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={toggleMenu}
                className="block px-4 py-2 hover:bg-green-700"
              >
                Products
              </Link>
              <Link
                href="#contact"
                onClick={toggleMenu}
                className="block px-4 py-2 hover:bg-green-700"
              >
                Contact
              </Link>
            </div>
          </nav>

          <div>
            <div
              onClick={toggleMenu}
              className="md:hidden p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    ); // Don't render NavBar for admin routes
  }
}
