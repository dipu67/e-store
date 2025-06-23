"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";


export default function Page() {
  const { items, addToCart, removeFromCart, clearCart } = useCartStore();
  const [shippingCost, setShippingCost] = useState(60);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      toast.warning(" আপনার নাম, ফোন নাম্বার, ঠিকানা দিতে হবে।");
      return;
    }

    const order = {
      name,
      phone,
      address,
      items,
      shippingCost,
      total,
    };

    console.log("Placing order:", order);

    // TODO: Send to backend here
    toast.success("✅ Order placed!");
    clearCart();
  };

  const updateQuantity = (id: string, change: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      removeFromCart(id);
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  return (
    <div className=" w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-8 mt-18 md:mt-20 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        🛒 Complete Your Order
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Section */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Billing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
            />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="আপনার ফোন নাম্বার লিখুন"
            />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="আপনার ঠিকানা লিখুন"
            />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            {/* Product List */}
            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 items-center"
                >
                  <div>
                    <div className="text-gray-500">{item.title} <span>x {item.quantity}</span></div> 
                   
                  </div>
                  <div className="font-medium">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between font-semibold pt-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping Selection */}
            <div>
              <span className="font-semibold block mb-1">Shipping</span>
              <Select
                onValueChange={(value) => setShippingCost(parseInt(value))}
                defaultValue="60"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">Inside Dhaka – ৳60</SelectItem>
                  <SelectItem value="120">Outside Dhaka – ৳120</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold border-t pt-4 text-lg text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Place Order Button */}
            <Button className="mt-4 w-full" onClick={handlePlaceOrder}>
              ✅ Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
