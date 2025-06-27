import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/admin";

export async function GET() {
  await connectDB();
  try {
    const admins = await Admin.find();
    return NextResponse.json(admins, { status: 200 });
  } catch (err) {
    console.error("Error fetching admins:", err);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}