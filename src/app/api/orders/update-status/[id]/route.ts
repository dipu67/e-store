// src/app/api/orders/update-status/[id]/route.ts
import { connectDB } from "@/lib/db";
import { Order } from "@/models/orders";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

  await connectDB();
  const body = await req.json();
  const { status } = body;

  if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { orderId: id },
    { status },
    { new: true }
  );

  return NextResponse.json(updatedOrder);
}
