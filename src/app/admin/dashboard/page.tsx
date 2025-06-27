import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";


export default function Page() {
  const stats = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    change: "+12.5%",
    direction: "up",
    summary: "Trending up this month",
    detail: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "-20%",
    direction: "down",
    summary: "Down 20% this period",
    detail: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    direction: "up",
    summary: "Strong user retention",
    detail: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    direction: "up",
    summary: "Steady performance increase",
    detail: "Meets growth projections",
  },
];
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards stats={stats} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
