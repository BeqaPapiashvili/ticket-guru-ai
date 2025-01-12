import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  user: string;
  phone: string;
  status: "new" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  created_at: string;
  completed_at?: string;
}

interface TicketListProps {
  filters: {
    status: string;
    category: string;
    priority: string;
    search: string;
  };
}

const statusLabels: { [key: string]: string } = {
  new: "ახალი",
  in_progress: "მიმდინარე",
  resolved: "გადაჭრილი",
  closed: "დახურული",
};

const priorityColors: { [key: string]: string } = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export function TicketList({ filters }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const loadTickets = () => {
      const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      let filteredTickets = [...storedTickets];

      if (filters.status) {
        filteredTickets = filteredTickets.filter(
          (ticket) => ticket.status === filters.status
        );
      }

      if (filters.category) {
        filteredTickets = filteredTickets.filter(
          (ticket) => ticket.category === filters.category
        );
      }

      if (filters.priority) {
        filteredTickets = filteredTickets.filter(
          (ticket) => ticket.priority === filters.priority
        );
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTickets = filteredTickets.filter(
          (ticket) =>
            ticket.title.toLowerCase().includes(searchLower) ||
            ticket.description.toLowerCase().includes(searchLower) ||
            ticket.user.toLowerCase().includes(searchLower)
        );
      }

      setTickets(filteredTickets as Ticket[]);
    };

    loadTickets();
    const interval = setInterval(loadTickets, 5000);
    return () => clearInterval(interval);
  }, [filters]);

  const handleStatusChange = (ticketId: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        const updatedTicket: Ticket = {
          ...ticket,
          status: "resolved" as const,
          completed_at: new Date().toISOString(),
        };
        return updatedTicket;
      }
      return ticket;
    });

    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>სათაური</TableHead>
          <TableHead>მომხმარებელი</TableHead>
          <TableHead>ტელეფონი</TableHead>
          <TableHead>სტატუსი</TableHead>
          <TableHead>პრიორიტეტი</TableHead>
          <TableHead>კატეგორია</TableHead>
          <TableHead>მოქმედება</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>{ticket.title}</TableCell>
            <TableCell>{ticket.user}</TableCell>
            <TableCell>{ticket.phone}</TableCell>
            <TableCell>
              <Badge>{statusLabels[ticket.status]}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={priorityColors[ticket.priority]}>
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell>{ticket.category}</TableCell>
            <TableCell>
              {ticket.status !== "resolved" && ticket.status !== "closed" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(ticket.id)}
                >
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