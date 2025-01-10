import { useState } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketStats } from "@/components/TicketStats";
import { TicketFilters } from "@/components/TicketFilters";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    search: "",
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">ტიკეტების მართვის პანელი</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TicketStats />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <TicketFilters filters={filters} setFilters={setFilters} />
        <TicketList filters={filters} />
      </div>
    </div>
  );
}