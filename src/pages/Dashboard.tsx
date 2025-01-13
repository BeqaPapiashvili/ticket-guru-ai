import { useState } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketStats } from "@/components/TicketStats";
import { TicketFilters } from "@/components/TicketFilters";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticket } from "lucide-react";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    search: "",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Ticket className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ტიკეტების მართვის პანელი
            </h1>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TicketStats />
        </div>

        {/* Filters and Ticket List */}
        <div className="bg-card rounded-xl shadow-lg border p-6 space-y-6">
          <TicketFilters filters={filters} setFilters={setFilters} />
          <TicketList filters={filters} />
        </div>
      </div>
    </div>
  );
}