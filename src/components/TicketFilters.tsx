import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Tag, AlertTriangle } from "lucide-react";

interface TicketFiltersProps {
  filters: {
    status: string;
    category: string;
    priority: string;
    search: string;
  };
  setFilters: (filters: any) => void;
}

export function TicketFilters({ filters, setFilters }: TicketFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Filter className="h-4 w-4" />
          სტატუსი
        </label>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="სტატუსი" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">ახალი</SelectItem>
            <SelectItem value="in_progress">მიმდინარე</SelectItem>
            <SelectItem value="resolved">გადაჭრილი</SelectItem>
            <SelectItem value="closed">დახურული</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Tag className="h-4 w-4" />
          კატეგორია
        </label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            setFilters({ ...filters, category: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="კატეგორია" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="network">ქსელური</SelectItem>
            <SelectItem value="software">პროგრამული</SelectItem>
            <SelectItem value="hardware">აპარატურული</SelectItem>
            <SelectItem value="access">წვდომა</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          პრიორიტეტი
        </label>
        <Select
          value={filters.priority}
          onValueChange={(value) =>
            setFilters({ ...filters, priority: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="პრიორიტეტი" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">დაბალი</SelectItem>
            <SelectItem value="medium">საშუალო</SelectItem>
            <SelectItem value="high">მაღალი</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Search className="h-4 w-4" />
          ძიება
        </label>
        <Input
          placeholder="ძიება..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}