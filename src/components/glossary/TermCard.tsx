import { GlossaryTerm } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TermCardProps {
  term: GlossaryTerm;
  searchQuery?: string;
  isHighlighted?: boolean;
  onRelatedTermClick: (term: string) => void;
}

const TermCard = ({ term, searchQuery, isHighlighted, onRelatedTermClick }: TermCardProps) => {
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

  // Create term ID for URL hash
  const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <Card 
      id={termId}
      className={cn(
        "transition-all duration-300 hover:shadow-md scroll-mt-32",
        isHighlighted && "ring-2 ring-primary animate-pulse"
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          {highlightText(term.term, searchQuery)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">
          {highlightText(term.definition, searchQuery)}
        </p>

        {term.example && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm font-semibold mb-1 italic">Example:</p>
            <p className="text-sm text-muted-foreground italic whitespace-pre-line">
              {term.example}
            </p>
          </div>
        )}

        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2">See also:</p>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relatedTerm) => (
                <Badge
                  key={relatedTerm}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => onRelatedTermClick(relatedTerm)}
                >
                  {relatedTerm}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TermCard;
