import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}