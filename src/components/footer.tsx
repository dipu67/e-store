"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");
  if (!isAdminRoute) {
     return (
    <footer id="contact" className="bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-sm flex justify-center items-center">
          Follow us on
          <a
            href="https://facebook.com"
            className="text-blue-400 hover:underline ml-1"
          >
            Facebook
          </a>
        </p>
        <p className="text-sm">© 2025 Your Company. All rights reserved.</p>
      </div>
      <div className="bg-gray-900 text-white text-center py-2">
        <p className="text-xs">Made with Beauty Organic Ghor</p>
      </div>
    </footer>
  );
  }
}
