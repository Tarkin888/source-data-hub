import { FAQ } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
  faq: FAQ;
  searchQuery?: string;
}

const FAQItem = ({ faq, searchQuery }: FAQItemProps) => {
  const highlightText = (text: string, query?: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Format answer with line breaks
  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, idx) => {
      if (line.trim().startsWith('•')) {
        return (
          <li key={idx} className="ml-4">
            {line.trim().substring(1).trim()}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      return <p key={idx} className="mb-2">{line}</p>;
    });
  };

  return (
    <AccordionItem value={faq.id} id={faq.id}>
      <AccordionTrigger className="text-left hover:no-underline">
        <div className="flex items-start gap-3 flex-1 pr-4">
          <div className="flex-1">
            <h4 className="font-semibold text-base mb-1">
              {highlightText(faq.question, searchQuery)}
            </h4>
            <Badge variant="secondary" className="text-xs">
              {faq.category}
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pt-2 pb-4 px-1 text-sm text-muted-foreground prose prose-sm max-w-none">
          {formatAnswer(faq.answer)}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
