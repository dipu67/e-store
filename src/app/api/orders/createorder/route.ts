import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/orders";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  await connectDB();
  const orderId = uuidv4(); // 'f64b21d2-88b6-4e4b-8c2e-4f18a231d9f3'
  const body = await req.json();
  const {name,phone, address, items, subtotal, shippingCost, total } = body;
  try {
    const newPost = await Order.create({orderId,name, phone, address, items, subtotal, shippingCost, total,});
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
