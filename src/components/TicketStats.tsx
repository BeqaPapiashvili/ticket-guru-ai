import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertCircle, BarChart as BarChartIcon } from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  activeTickets: number;
  resolvedTickets: number;
  avgResolutionTime: string;
  dailyStats: Array<{
    date: string;
    count: number;
  }>;
}

const weekDays: { [key: string]: string } = {
  "0": "კვი",
  "1": "ორშ",
  "2": "სამ",
  "3": "ოთხ",
  "4": "ხუთ",
  "5": "პარ",
  "6": "შაბ",
};

export function TicketStats() {
  const [stats, setStats] = useState<Stats>({
    activeTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: "0",
    dailyStats: []
  });

  const fetchStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">აქტიური ტიკეტები</CardTitle>
          <AlertCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">{stats.activeTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">გადაჭრილი ტიკეტები</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">{stats.resolvedTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">საშუალო გადაჭრის დრო</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">{stats.avgResolutionTime} სთ</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ტიკეტების სტატისტიკა</CardTitle>
          <BarChartIcon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[200px]">
            <BarChart data={stats.dailyStats}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}