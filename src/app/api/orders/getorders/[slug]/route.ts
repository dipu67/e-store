import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/orders";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();
  const { slug } = await params;
  try {
    const newPost = await Order.findOne({ orderId: slug });
    return NextResponse.json(newPost, { status: 200 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
