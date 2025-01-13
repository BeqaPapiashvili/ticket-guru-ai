import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { Ticket } from "./TicketList";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DailyStats {
  name: string;
  tickets: number;
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
  const [activeTickets, setActiveTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const [avgResolutionTime, setAvgResolutionTime] = useState("0");
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  const calculateStats = async () => {
    // აქტიური და გადაჭრილი ტიკეტების რაოდენობა
    const { data: activeData } = await supabase
      .from('tickets')
      .select('count', { count: 'exact' })
      .not('status', 'in', ['resolved', 'closed']);

    const { data: resolvedData } = await supabase
      .from('tickets')
      .select('count', { count: 'exact' })
      .in('status', ['resolved', 'closed']);

    setActiveTickets(activeData?.count || 0);
    setResolvedTickets(resolvedData?.count || 0);

    // საშუალო გადაჭრის დრო
    const { data: resolvedTickets } = await supabase
      .from('tickets')
      .select('created_at, completed_at')
      .in('status', ['resolved', 'closed'])
      .not('completed_at', 'is', null);

    if (resolvedTickets && resolvedTickets.length > 0) {
      let totalTime = 0;
      resolvedTickets.forEach(ticket => {
        const startTime = new Date(ticket.created_at).getTime();
        const endTime = new Date(ticket.completed_at!).getTime();
        totalTime += endTime - startTime;
      });
      const avgTime = (totalTime / resolvedTickets.length) / (1000 * 60 * 60);
      setAvgResolutionTime(avgTime.toFixed(1));
    }

    // ბოლო 7 დღის სტატისტიკა
    const last7Days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }).reverse();

    const dailyData = await Promise.all(last7Days.map(async (date) => {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const { data: dayTickets } = await supabase
        .from('tickets')
        .select('count', { count: 'exact' })
        .gte('created_at', startOfDay.toISOString())
        .lte('created_at', endOfDay.toISOString());

      return {
        name: weekDays[date.getDay().toString()],
        tickets: dayTickets?.count || 0
      };
    }));

    setDailyStats(dailyData);
  };

  useEffect(() => {
    calculateStats();
    const interval = setInterval(calculateStats, 30000);
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
          <div className="text-xl font-bold">{activeTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">გადაჭრილი ტიკეტები</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">{resolvedTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">საშუალო გადაჭრის დრო</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">{avgResolutionTime} სთ</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ტიკეტების სტატისტიკა</CardTitle>
          <BarChart className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[200px]">
            <BarChart data={dailyStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="tickets" fill="hsl(var(--primary))" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}