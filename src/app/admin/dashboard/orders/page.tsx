"use client";
import { SectionCards } from "@/components/section-cards";
import * as React from "react";
import DataDabale from "@/components/dataTabale";

export default function page() {
  const [stats, setStats] = React.useState([]);
  async function fetchStats() {
    try {
      const response = await fetch("/api/orders/status");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }
  React.useEffect(() => {
    fetchStats();
  }, []);
 console.log("Stats:", stats);
 
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards stats={stats} />
          <div className="px-4 lg:px-6"></div>
          <DataDabale onUpdateStats={fetchStats} />
        </div>
      </div>
    </div>
  );
}
