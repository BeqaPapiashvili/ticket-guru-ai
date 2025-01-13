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
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">კატეგორია</label>
          <Select
            value={formData

მოდი გავაუმჯობესოთ ინდექს გვერდის ვიზუალური მხარე და განლაგება.

<lov-code>
Let's update the Index page layout and styling:

<lov-write file_path="src/pages/Index.tsx">
import { TicketForm } from "@/components/TicketForm";
import { FAQ } from "@/components/FAQ";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { HelpCircle, Ticket, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                IT მხარდაჭერის სისტემა
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                შეავსეთ ფორმა ან გაეცანით ხშირად დასმულ კითხვებს
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-xl shadow-lg border transition-all hover:shadow-xl p-6">
            <Tabs defaultValue="new-ticket" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 h-14">
                <TabsTrigger 
                  value="new-ticket"
                  className="data-[state=active]:bg-primary/10 transition-all flex items-center gap-2"
                >
                  <Ticket className="h-4 w-4" />
                  ახალი ტიკეტი
                </TabsTrigger>
                <TabsTrigger 
                  value="faq"
                  className="data-[state=active]:bg-primary/10 transition-all flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  ხშირად დასმული კითხვები
                </TabsTrigger>
              </TabsList>

              <TabsContent 
                value="new-ticket"
                className="border rounded-lg p-6 bg-card/50 shadow-sm"
              >
                <TicketForm />
              </TabsContent>

              <TabsContent 
                value="faq"
                className="border rounded-lg p-6 bg-card/50 shadow-sm"
              >
                <FAQ />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;