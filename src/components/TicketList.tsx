import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Ticket {
  id: string;
  title: string;
  user: string;
  email: string;
  status: "new" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  created_at: string;
  completed_at?: string;
}

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
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(storedTickets);
  }, []);

  const handleComplete = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const completed_at = new Date().toISOString();
        toast({
          title: "ტიკეტი დასრულებულია",
          description: `დასრულების დრო: ${new Date(completed_at).toLocaleString("ka-GE")}`,
        });
        return {
          ...ticket,
          status: "resolved" as const,
          completed_at,
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filters.status && ticket.status !== filters.status) return false;
    if (filters.category && ticket.category !== filters.category) return false;
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.user.toLowerCase().includes(searchLower) ||
        ticket.email.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

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
          <TableHead>მოქმედება</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTickets.map((ticket) => (
          <TableRow key={ticket.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{ticket.id}</TableCell>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>
              <div>{ticket.user}</div>
              <div className="text-sm text-muted-foreground">{ticket.email}</div>
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  statusColors[ticket.status]
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
                  priorityColors[ticket.priority]
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
              <div>{new Date(ticket.created_at).toLocaleString("ka-GE")}</div>
              {ticket.completed_at && (
                <div className="text-sm text-muted-foreground">
                  დასრულდა: {new Date(ticket.completed_at).toLocaleString("ka-GE")}
                </div>
              )}
            </TableCell>
            <TableCell>
              {ticket.status !== "resolved" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComplete(ticket.id)}
                  className="gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  შესრულებულია
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}