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

  useEffect(() => {
    const calculateStats = () => {
      const tickets: Ticket[] = JSON.parse(localStorage.getItem("tickets") || "[]");
      
      // აქტიური და გადაჭრილი ტიკეტების რაოდენობა
      const active = tickets.filter(t => t.status !== "resolved" && t.status !== "closed").length;
      const resolved = tickets.filter(t => t.status === "resolved" || t.status === "closed").length;
      
      // საშუალო გადაჭრის დრო
      const resolvedTicketsWithTime = tickets.filter(t => (t.status === "resolved" || t.status === "closed") && t.completed_at);
      let totalResolutionTime = 0;
      
      resolvedTicketsWithTime.forEach(ticket => {
        const startTime = new Date(ticket.created_at).getTime();
        const endTime = new Date(ticket.completed_at!).getTime();
        totalResolutionTime += endTime - startTime;
      });

      const avgTime = resolvedTicketsWithTime.length > 0
        ? (totalResolutionTime / resolvedTicketsWithTime.length) / (1000 * 60 * 60)
        : 0;

      // ბოლო 7 დღის სტატისტიკა
      const last7Days = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d;
      }).reverse();

      const dailyData = last7Days.map(date => {
        const dayTickets = tickets.filter(t => {
          const ticketDate = new Date(t.created_at);
          return ticketDate.getDate() === date.getDate() &&
                 ticketDate.getMonth() === date.getMonth() &&
                 ticketDate.getFullYear() === date.getFullYear();
        });

        return {
          name: weekDays[date.getDay().toString()],
          tickets: dayTickets.length
        };
      });

      setActiveTickets(active);
      setResolvedTickets(resolved);
      setAvgResolutionTime(avgTime.toFixed(1));
      setDailyStats(dailyData);
    };

    calculateStats();
    const interval = setInterval(calculateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">აქტიური ტიკეტები</CardTitle>
          <AlertCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">გადაჭრილი ტიკეტები</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resolvedTickets}</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">საშუალო გადაჭრის დრო</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResolutionTime} სთ</div>
        </CardContent>
      </Card>

      <Card className="bg-card hover:bg-card/80 transition-colors">
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