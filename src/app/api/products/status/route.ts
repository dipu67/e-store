import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/products";

export async function GET(req: Request) {
  await connectDB();

  try {
    const totalProducts = await Product.countDocuments();
    const totalInStock = await Product.countDocuments({ stock: { $gt: 0 } });
    const totalOutOfStock = await Product.countDocuments({ stock: 0 });
    const totalStockResult = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);

    const totalStock = totalStockResult[0]?.totalStock || 0;

    const stats = [
      {
        title: "Total Products",
        value: totalProducts,
        change: "0%",
        direction: "up",
      },
      {
        title: "In Stock",
        value: totalStock,
        change: "0%",
        direction: "up",
      },
      {
        title: "Out of Stock",
        value: totalOutOfStock,
        change: "0%",
        direction: "down",
      },
    ];

    return NextResponse.json(stats, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
