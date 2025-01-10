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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    description: "",
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically send the data to your backend
      const newTicket = {
        id: `T-${Math.floor(Math.random() * 1000)}`,
        title: formData.description.slice(0, 50) + "...",
        user: formData.name,
        email: formData.email,
        status: "new" as const,
        priority: formData.priority as "low" | "medium" | "high",
        category: formData.category,
        created_at: new Date().toISOString(),
      };
      
      // In a real application, you would save this to a backend
      console.log("New ticket:", newTicket);
      
      toast({
        title: "ტიკეტი წარმატებით გაიგზავნა",
        description: "ჩვენ მალე დაგიკავშირდებით",
      });

      // Navigate to dashboard after successful submission
      navigate("/dashboard");

      setFormData({
        category: "",
        priority: "",
        description: "",
        name: "",
        email: "",
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
          <label className="text-sm font-medium">ელ-ფოსტა</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="თქვენი ელ-ფოსტა"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "იგზავნება..." : "გაგზავნა"}
      </Button>
    </form>
  );
}