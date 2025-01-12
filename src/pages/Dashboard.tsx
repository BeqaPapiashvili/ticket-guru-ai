import { useState } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketStats } from "@/components/TicketStats";
import { TicketFilters } from "@/components/TicketFilters";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    search: "",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ტიკეტების მართვის პანელი
          </h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TicketStats />
        </div>

        <div className="bg-card rounded-lg shadow-lg border p-6 transition-colors">
          <TicketFilters filters={filters} setFilters={setFilters} />
          <TicketList filters={filters} />
        </div>
      </div>
    </div>
  );
}