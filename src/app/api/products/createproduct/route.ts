import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const id = await Product.find().countDocuments() + 1;
  const { title,discription,price,discountPrice,image,stock } = body;
  try {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const newPost = await Product.create({id, title, slug,discription,price,discountPrice,image,stock });
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
