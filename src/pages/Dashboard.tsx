import { useState } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketStats } from "@/components/TicketStats";
import { TicketFilters } from "@/components/TicketFilters";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticket, BarChart3, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Ticket className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ტიკეტების მართვის პანელი
            </h1>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card hover:bg-card/80 transition-colors rounded-xl shadow-lg p-6 border flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <TicketStats />
          </div>
          <div className="bg-card hover:bg-card/80 transition-colors rounded-xl shadow-lg p-6 border flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <TicketStats />
          </div>
          <div className="bg-card hover:bg-card/80 transition-colors rounded-xl shadow-lg p-6 border flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <TicketStats />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg border p-6 transition-colors space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">ტიკეტების სია</h2>
          </div>
          <TicketFilters filters={filters} setFilters={setFilters} />
          <TicketList filters={filters} />
        </div>
      </div>
    </div>
  );
}