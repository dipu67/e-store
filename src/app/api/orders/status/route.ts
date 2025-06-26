import { connectDB } from "@/lib/db";
import { Order } from "@/models/orders";
import { NextResponse } from "next/server";

// Helper to calculate change %
function getPercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return {
      change: current === 0 ? "0%" : "+100%",
      direction: "up",
    };
  }

  const diff = current - previous;
  const percent = Math.abs((diff / previous) * 100);

  return {
    change: `${diff >= 0 ? "+" : "-"}${percent.toFixed(1)}%`,
    direction: diff >= 0 ? "up" : "down",
  };
}

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    // Today counts
    const [
      totalOrders,
      todayOrders,
      totalPending,
      totalProcessing,
      totalCompleted,
      totalCancelled,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "processing" }),
      Order.countDocuments({ status: "completed" }),
      Order.countDocuments({ status: "cancelled" }),
    ]);

    // Past 30 days (excluding today)
    const [
      pastOrders,
      pastPending,
      pastProcessing,
      pastCompleted,
      pastCancelled,
      pastTotal,
    ] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo, $lt: today } }),
      Order.countDocuments({
        createdAt: { $gte: thirtyDaysAgo, $lt: today },
        status: "pending",
      }),
      Order.countDocuments({
        createdAt: { $gte: thirtyDaysAgo, $lt: today },
        status: "processing",
      }),
      Order.countDocuments({
        createdAt: { $gte: thirtyDaysAgo, $lt: today },
        status: "completed",
      }),
      Order.countDocuments({
        createdAt: { $gte: thirtyDaysAgo, $lt: today },
        status: "cancelled",
      }),
      Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo, $lt: today } }),
    ]);

    const stats = [
      {
        title: "Today's Orders",
        value: todayOrders.toString(),
        ...getPercentageChange(todayOrders, pastOrders / 30),
        summary: "Orders placed today",
        detail: "Compared to daily average of last 30 days",
      },
      {
        title: "Pending Orders",
        value: totalPending.toString(),
        ...getPercentageChange(totalPending, pastPending / 30),
        summary: "Pending today",
        detail: "Compared to daily avg (last 30 days)",
      },
      {
        title: "Processing Orders",
        value: totalProcessing.toString(),
        ...getPercentageChange(totalProcessing, pastProcessing / 30),
        summary: "processing today",
        detail: "Compared to daily avg (last 30 days)",
      },
      {
        title: "Completed Orders",
        value: totalCompleted.toString(),
        ...getPercentageChange(totalCompleted, pastCompleted / 30),
        summary: "Completed today",
        detail: "Compared to daily avg (last 30 days)",
      },
      {
        title: "Cancelled Orders",
        value: totalCancelled.toString(),
        ...getPercentageChange(totalCancelled, pastCancelled / 30),
        summary: "Cancelled today",
        detail: "Compared to daily avg (last 30 days)",
      },
      {
        title: "Total Orders (Today)",
        value: totalOrders.toString(),
        ...getPercentageChange(totalOrders, pastTotal / 30),
        summary: "Overall total today",
        detail: "Compared to daily avg (last 30 days)",
      },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load order stats", details: error },
      { status: 500 }
    );
  }
}
