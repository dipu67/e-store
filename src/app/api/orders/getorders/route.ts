import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/orders";

export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
