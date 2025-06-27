"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export default function Page() {
  const { items, addToCart, removeFromCart, clearCart } = useCartStore();
  const [shippingCost, setShippingCost] = useState(60);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const router = useRouter();
   console.log(items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    if (!name || !phone || !address) {
      toast.warning(" আপনার নাম, ফোন নাম্বার, ঠিকানা দিতে হবে।");
      return;
    }
    if (items.length === 0) {
      toast.warning("আপনার কার্টে কোন পণ্য নেই।");
      return;
    }
    if (shippingCost <= 0) {
      toast.warning("দয়া করে শিপিং খরচ সিলেক্ট করুন।");
      return;
    }
    if (total <= 0) {
      toast.warning("আপনার অর্ডার মোট শূন্য।");
      return;
    }
    // Prepare order data
    const orderItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    // Create order object
    const res = await fetch("/api/orders/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: orderItems,
        subtotal,
        shippingCost,
        total,
      }),
    });
    if (!res.ok) {
      toast.error("❌ Order failed. Please try again.");
      return;
    }
    await res.json().then((data) => {
      setOrderId(data.orderId);
      toast.success("✅ Order placed successfully!");
    });
  };
  useEffect(() => {
    if (orderId) {
      setTimeout(() => {
        clearCart();
        router.push(`/order/${orderId}`);
      }, 2000);
    }
  }, [orderId]);

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
            <Label htmlFor="name" className="block mb-2">
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
            />
            <Label htmlFor="phone" className="block mb-2">
              Phone Number
            </Label>
            <Input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="আপনার ফোন নাম্বার লিখুন"
              required
            />
            <Label htmlFor="address" className="block mb-2">
              Address
            </Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="আপনার ঠিকানা লিখুন"
              required
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
                    <div className="text-gray-500">
                      {item.title} <span>x {item.quantity}</span>
                    </div>
                  </div>
                  <div className="font-medium">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between font-semibold pt-2">
              <span>Subtotal</span>
              <span>৳{subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping Selection */}
            <div>
              <span className="font-semibold block mb-3">Shipping Cost</span>

              <RadioGroup
                onValueChange={(value) => setShippingCost(parseInt(value))}
                defaultValue="60"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="60" />
                  <Label htmlFor="60">Inside Dhaka – ৳60</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="120" id="120" />
                  <Label htmlFor="120">Outside Dhaka – ৳120</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Payment Types */}
            <div>
              <span className="font-semibold block mb-3">Payment Type</span>

              <RadioGroup defaultValue="cash-on-delivery">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="cash-on-delivery"
                    id="cash-on-delivery"
                  />
                  <Label htmlFor="cash-on-delivery">Cash On Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold border-t pt-4 text-lg text-gray-900 dark:text-white">
              <span>Total</span>
              <span>৳{total.toFixed(2)}</span>
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
