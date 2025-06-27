"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Product = {
  id: String;
  title: String;
  slug: String;
  discription: String;
  price: Number;
  discountPrice: Number;
  category: String;
  brand: String;
  image: String;
  stock: Number;
};

export default function card() {
  const [products, setProducts] = useState<Product[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const handleAddToCart = (product: any) => {
    if (!product) return;

    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      quantity,
      image: product.thumbnail,
    });

    return router.push("/order");
  };
  useEffect(() => {
    const product = async () => {
      fetch("/api/products/get-products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };
    //    setTimeout(products, 1000);
    product();
  }, []);
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No products available</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 md:mx-4 md:mt-4  p-2">
      {products.map((product:any) => (
         <Card key={product.id} className="w-full h-full gap-2 shadow-md ">
          <CardHeader className="p-4">
            <Link href={`/products/${product.slug}`} className="block">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-t-lg"
                width={400}
                height={400}
                loading="lazy"
              />
            </Link>
            <CardTitle className="text-md md:text-lg font-semibold">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="text-lg text-gray-800">Price: ৳{product.price}</p>
          </CardContent>
          <CardFooter className="mt-4">
            <CardAction className="flex justify-end">
              <Button
                onClick={() => handleAddToCart(product)}
                className="px-4 py-2  text-white bg-green-900 rounded cursor-pointer  transition-colors duration-300"
              >
                Order Now
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      
       
      ))}
    </div>
  );
}
