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
      <Card>
        <CardHeader>
          <CardTitle>აქტიური ტიკეტები</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeTickets}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>გადაჭრილი ტიკეტები</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resolvedTickets}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>საშუალო გადაჭრის დრო</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResolutionTime} სთ</div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>ტიკეტების სტატისტიკა</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={dailyStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Bar dataKey="tickets" fill="#4f46e5" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}