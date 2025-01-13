import { TicketForm } from "@/components/TicketForm";
import { FAQ } from "@/components/FAQ";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Headphones, TicketIcon, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  IT მხარდაჭერა
                </h1>
                <p className="text-muted-foreground mt-1">
                  შეავსეთ ფორმა ან გაეცანით ხშირად დასმულ კითხვებს
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <Card className="backdrop-blur-sm bg-card/95 shadow-lg border-primary/10 p-6">
            <Tabs defaultValue="new-ticket" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 h-14">
                <TabsTrigger 
                  value="new-ticket" 
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2"
                >
                  <TicketIcon className="w-4 h-4" />
                  ახალი ტიკეტი
                </TabsTrigger>
                <TabsTrigger 
                  value="faq"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  ხშირად დასმული კითხვები
                </TabsTrigger>
              </TabsList>

              <TabsContent 
                value="new-ticket"
                className="mt-6 [&>form]:animate-in [&>form]:fade-in-50"
              >
                <TicketForm />
              </TabsContent>

              <TabsContent 
                value="faq"
                className="mt-6 animate-in fade-in-50"
              >
                <FAQ />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;