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
import { Loader2, Send, Network, Monitor, HardDrive, Key } from "lucide-react";
import { supabase } from "@/lib/supabase";

const categories = [
  { id: "network", label: "ქსელური პრობლემა", icon: Network },
  { id: "software", label: "პროგრამული უზრუნველყოფა", icon: Monitor },
  { id: "hardware", label: "აპარატურული პრობლემა", icon: HardDrive },
  { id: "access", label: "წვდომის პრობლემა", icon: Key },
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
      
      const { error } = await supabase
        .from('tickets')
        .insert([newTicket]);

      if (error) throw error;
      
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
      console.error('Error inserting ticket:', error);
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
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">კატეგორია</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="აირჩიეთ კატეგორია" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">პრიორიტეტი</label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
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

        <div className="space-y-2">
          <label className="text-sm font-medium">აღწერა</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="პრობლემის დეტალური აღწერა"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">სახელი და გვარი</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="შეიყვანეთ სახელი და გვარი"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">ტელეფონის ნომერი</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="შეიყვანეთ ტელეფონის ნომერი"
          />
        </div>
      </div>

      <Button disabled={loading} type="submit" className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            იგზავნება...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            გაგზავნა
          </>
        )}
      </Button>
    </form>
  );
};
