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

      // Sort tickets by creation date (newest first)
      filteredTickets.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">ID</TableHead>
            <TableHead className="font-semibold">სათაური</TableHead>
            <TableHead className="font-semibold">მომხმარებელი</TableHead>
            <TableHead className="font-semibold">ტელეფონი</TableHead>
            <TableHead className="font-semibold">სტატუსი</TableHead>
            <TableHead className="font-semibold">პრიორიტეტი</TableHead>
            <TableHead className="font-semibold">კატეგორია</TableHead>
            <TableHead className="font-semibold">მოქმედება</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.user}</TableCell>
              <TableCell>{ticket.phone}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-medium">
                  {statusLabels[ticket.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`${priorityColors[ticket.priority]} text-white font-medium`}
                >
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>
                {ticket.status !== "resolved" && ticket.status !== "closed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
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
    </div>
  );
}