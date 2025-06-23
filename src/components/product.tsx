"use client";
import { use, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/cartStore";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function product() {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();
    const params = useParams();
  const slug = params.slug;

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      quantity,
      thumbnail: product.thumbnail,
    });

    toast.success(`${product.title} added to cart!`, {
      description: `Quantity: ${quantity}`,
    });
  };

  const orderNow = () => {
    if (!product) return;

    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      quantity,
      thumbnail: product.thumbnail,
    });

    router.push("/order");
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col gap-8 bg-white shadow-lg rounded-lg p-2">
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-3xl mx-auto">
        <Card className="border-0 shadow-none w-full  ">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="rounded-md w-full h-full object-cover"
            width={300}
            height={300}
          />
        </Card>

        <div className="flex-1 flex flex-col  p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold text-primary">${product.price}</p>

          {/* ✅ Stock Status */}
          <p
            className={`text-sm font-medium mt-1 ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Quantity Section */}
          <div className="">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-2 mt-1">
              <Button variant="outline" size="icon" onClick={decrease}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-2">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increase}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button onClick={handleAddToCart} disabled={product.stock === 0}>
              Add to Cart
            </Button>
            <Button variant="outline" onClick={orderNow}>
              Order Now
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        {/* Additional Product Details */}
        <Card className="border-0 shadow-none">
          <h2 className="text-lg font-semibold mb-2">Product Details</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Brand: {product.brand}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Rating: {product.rating} ({product.stock} in stock)
          </p>
          <p className="text-sm text-muted-foreground">
            Discount: {product.discountPercentage}%
          </p>

          <p className="text-muted-foreground mb-4">{product.description}</p>
        </Card>
      </div>
    </div>
  );
}
