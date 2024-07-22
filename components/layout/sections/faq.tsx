import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How does the voice bot enhance customer support?",
    answer: "Our voice bot provides quick and accurate responses to customer inquiries, available 24/7, improving customer satisfaction and reducing response times.",
    value: "item-1",
  },
  {
    question: "Can the chat application handle multiple languages?",
    answer: "Yes, our chat application supports multiple languages, allowing you to engage with a diverse customer base more effectively.",
    value: "item-2",
  },
  {
    question: "What kind of analytics does the system provide?",
    answer: "The system offers AI-powered analytics that give insights into user interactions, helping you to understand customer behavior and preferences better.",
    value: "item-3",
  },
  {
    question: "Is it easy to integrate the voice bot with existing systems?",
    answer: "Yes, our voice bot is designed for easy integration with various existing systems, ensuring a seamless addition to your current setup.",
    value: "item-4",
  },
  {
    question: "What support options are available after implementation?",
    answer: "We offer comprehensive support, including troubleshooting, updates, and training to ensure your team can maximize the benefits of the voice bot and chat application.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
