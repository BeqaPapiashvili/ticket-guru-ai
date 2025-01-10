import { TicketForm } from "@/components/TicketForm";
import { FAQ } from "@/components/FAQ";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              IT მხარდაჭერის სისტემა
            </h1>
            <p className="text-gray-600">
              შეავსეთ ფორმა ან გაეცანით ხშირად დასმულ კითხვებს
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
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