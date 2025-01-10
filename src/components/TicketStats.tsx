import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const mockData = [
  { name: "ორშ", tickets: 4 },
  { name: "სამ", tickets: 3 },
  { name: "ოთხ", tickets: 7 },
  { name: "ხუთ", tickets: 2 },
  { name: "პარ", tickets: 5 },
];

export function TicketStats() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>აქტიური ტიკეტები</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>გადაჭრილი ტიკეტები</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>საშუალო გადაჭრის დრო</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.5 სთ</div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>ტიკეტების სტატისტიკა</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={mockData}>
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