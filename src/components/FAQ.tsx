import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}