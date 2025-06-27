"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import NavBar from "@/components/navBar";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0)
    return <p className="p-4 w-full h-96 text-center mt-18 text-white">Your cart is empty.</p>;

  return (
    
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg space-y-4 mt-18 md:mt-20">
     
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.map((item) => (
        <Card key={item.id} className="flex flex-row items-center justify-between p-4">
          <div className="flex gap-4 items-center">
            <Image
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
              width={80}
              height={80}
              loading="lazy"
            />
            <div>
              <h2 className="text-sm md:text-lg font-semibold">{item.title}</h2>
              <p className="text-muted-foreground">
                ${item.price} x {item.quantity}
              </p>
            </div>
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </Card>
      ))}

      <div className="text-right text-lg font-medium">
        Total: ${total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={clearCart}>
          Clear All
        </Button>
        <Button onClick={() => router.push('/order')}>Checkout</Button>
      </div>
    </div>
  );
}
