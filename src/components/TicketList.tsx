import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTickets = [
  {
    id: "T-001",
    title: "ქსელური კავშირი დაკარგულია",
    user: "გიორგი მაისურაძე",
    email: "giorgi@example.com",
    status: "new",
    priority: "high",
    category: "network",
    created_at: "2024-01-10T10:00:00",
  },
  {
    id: "T-002",
    title: "პროგრამა არ იხსნება",
    user: "ანა კვარაცხელია",
    email: "ana@example.com",
    status: "in_progress",
    priority: "medium",
    category: "software",
    created_at: "2024-01-10T09:30:00",
  },
];

const statusColors = {
  new: "bg-blue-500",
  in_progress: "bg-yellow-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500",
};

const priorityColors = {
  low: "bg-gray-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

interface TicketListProps {
  filters: {
    status: string;
    category: string;
    priority: string;
    search: string;
  };
}

export function TicketList({ filters }: TicketListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>სათაური</TableHead>
          <TableHead>მომხმარებელი</TableHead>
          <TableHead>სტატუსი</TableHead>
          <TableHead>პრიორიტეტი</TableHead>
          <TableHead>თარიღი</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>
              <div>{ticket.user}</div>
              <div className="text-sm text-gray-500">{ticket.email}</div>
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  statusColors[ticket.status as keyof typeof statusColors]
                } text-white`}
              >
                {ticket.status === "new"
                  ? "ახალი"
                  : ticket.status === "in_progress"
                  ? "მიმდინარე"
                  : ticket.status === "resolved"
                  ? "გადაჭრილი"
                  : "დახურული"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  priorityColors[ticket.priority as keyof typeof priorityColors]
                } text-white`}
              >
                {ticket.priority === "low"
                  ? "დაბალი"
                  : ticket.priority === "medium"
                  ? "საშუალო"
                  : "მაღალი"}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(ticket.created_at).toLocaleString("ka-GE")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}