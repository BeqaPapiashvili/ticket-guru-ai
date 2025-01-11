import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "network", label: "ქსელური პრობლემა" },
  { id: "software", label: "პროგრამული უზრუნველყოფა" },
  { id: "hardware", label: "აპარატურული პრობლემა" },
  { id: "access", label: "წვდომის პრობლემა" },
  { id: "other", label: "სხვა" },
];

const priorities = [
  { id: "low", label: "დაბალი" },
  { id: "medium", label: "საშუალო" },
  { id: "high", label: "მაღალი" },
];

export function TicketForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    description: "",
    name: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTicket = {
        id: `T-${Math.floor(Math.random() * 1000)}`,
        title: formData.description.slice(0, 50) + (formData.description.length > 50 ? "..." : ""),
        description: formData.description,
        user: formData.name,
        phone: formData.phone,
        status: "new" as const,
        priority: formData.priority as "low" | "medium" | "high",
        category: formData.category,
        created_at: new Date().toISOString(),
      };
      
      const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const updatedTickets = [...existingTickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      
      toast({
        title: "ტიკეტი წარმატებით გაიგზავნა",
        description: "ტიკეტი დამატებულია სისტემაში",
      });

      setFormData({
        category: "",
        priority: "",
        description: "",
        name: "",
        phone: "",
      });
    } catch (error) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადოთ მოგვიანებით",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">კატეგორია</label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="აირჩიეთ კატეგორია" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">პრიორიტეტი</label>
          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="აირჩიეთ პრიორიტეტი" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.id} value={priority.id}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">პრობლემის აღწერა</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="აღწერეთ თქვენი პრობლემა დეტალურად"
            className="h-32"
          />
        </div>

        <div>
          <label className="text-sm font-medium">სახელი</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="თქვენი სახელი"
          />
        </div>

        <div>
          <label className="text-sm font-medium">ტელეფონის ნომერი</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="თქვენი ტელეფონის ნომერი"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "იგზავნება..." : "გაგზავნა"}
      </Button>
    </form>
  );
}