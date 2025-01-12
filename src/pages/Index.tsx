import { TicketForm } from "@/components/TicketForm";
import { FAQ } from "@/components/FAQ";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                IT მხარდაჭერის სისტემა
              </h1>
              <p className="text-muted-foreground">
                შეავსეთ ფორმა ან გაეცანით ხშირად დასმულ კითხვებს
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6 border transition-colors">
            <Tabs defaultValue="new-ticket" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new-ticket">ახალი ტიკეტი</TabsTrigger>
                <TabsTrigger value="faq">ხშირად დასმული კითხვები</TabsTrigger>
              </TabsList>

              <TabsContent value="new-ticket">
                <TicketForm />
              </TabsContent>

              <TabsContent value="faq">
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