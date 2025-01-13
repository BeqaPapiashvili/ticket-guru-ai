import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "როგორ შევცვალო ჩემი პაროლი?",
    answer:
      "პაროლის შესაცვლელად გადადით პარამეტრებში, აირჩიეთ 'უსაფრთხოება' და დააჭირეთ 'პაროლის შეცვლა'. შეიყვანეთ თქვენი ძველი და ახალი პაროლი.",
  },
  {
    question: "რა უნდა გავაკეთო თუ ინტერნეტი არ მუშაობს?",
    answer:
      "1. გადაამოწმეთ ქსელის კაბელი\n2. გადატვირთეთ როუტერი\n3. შეამოწმეთ WiFi-ს სიგნალი\n4. დაუკავშირდით IT მხარდაჭერას",
  },
  {
    question: "როგორ დავაინსტალირო ახალი პროგრამა?",
    answer:
      "ახალი პროგრამის დასაინსტალირებლად საჭიროა IT დეპარტამენტის თანხმობა. გთხოვთ შეავსოთ მოთხოვნის ფორმა და გააგზავნოთ.",
  },
  {
    question: "სად შემიძლია ვნახო ჩემი ტიკეტების ისტორია?",
    answer:
      "ტიკეტების ისტორიის სანახავად შედით თქვენს პროფილში და გადადით 'ჩემი ტიკეტები' განყოფილებაში.",
  },
];

export function FAQ() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <HelpCircle className="h-5 w-5" />
        <h2 className="text-xl font-semibold">ხშირად დასმული კითხვები</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border rounded-lg px-4 mb-2 hover:bg-accent/50 transition-colors"
          >
            <AccordionTrigger className="hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}