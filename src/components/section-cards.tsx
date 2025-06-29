// SectionCards.tsx

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatItem = {
  title: string;
  value: string;
  change: string;
  direction: string; // "up" or "down"
  summary: string;
  detail: string;
};

type SectionCardsProps = {
  stats: StatItem[];
};

export function SectionCards({ stats }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((item, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {item.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" {...item.direction === "up" ? { className: "text-green-500" } : { className: "text-red-500" }}>
                {item.direction === "up" ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {item.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {item.summary}{" "}
              {item.direction === "up" ? (
                <IconTrendingUp className="size-4 text-green-400" />
              ) : (
                <IconTrendingDown className="size-4 text-red-500" />
              )}
            </div>
            <div className="text-muted-foreground">{item.detail}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
