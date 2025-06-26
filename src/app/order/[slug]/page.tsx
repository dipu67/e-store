"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Item = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type Order = {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  items: Item[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
};

export default function TrackingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/orders/getorders/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (!order) {
    return <p className="text-center mt-10 text-red-500">Order not found.</p>;
  }

  return (
    <div className="mt-18 p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <ul className="space-y-3">
        {order.items.map((item) => (
            
          <li key={item.id} className="border p-3 rounded">
            <div className="flex items-center gap-4">
                
              <Image src={item.image} alt={item.title} width={64} height={64} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4 text-right space-y-2">
        <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
        <p><strong>Shipping:</strong> ${order.shippingCost.toFixed(2)}</p>
        <p className="text-lg font-bold"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
