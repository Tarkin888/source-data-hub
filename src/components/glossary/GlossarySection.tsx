import { GlossaryTerm } from "@/types/data";
import TermCard from "./TermCard";

interface GlossarySectionProps {
  letter: string;
  terms: GlossaryTerm[];
  searchQuery?: string;
  highlightedTerm?: string;
  onRelatedTermClick: (term: string) => void;
}

const GlossarySection = ({ 
  letter, 
  terms, 
  searchQuery, 
  highlightedTerm,
  onRelatedTermClick 
}: GlossarySectionProps) => {
  return (
    <section id={`letter-${letter}`} className="scroll-mt-32">
      <div className="mb-6">
        <h2 className="text-6xl font-bold text-muted-foreground/20 mb-1">
          {letter}
        </h2>
        <p className="text-sm text-muted-foreground">
          ({terms.length} {terms.length === 1 ? 'term' : 'terms'})
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {terms.map((term) => (
          <TermCard
            key={term.term}
            term={term}
            searchQuery={searchQuery}
            isHighlighted={highlightedTerm === term.term}
            onRelatedTermClick={onRelatedTermClick}
          />
        ))}
      </div>
    </section>
  );
};

export default GlossarySection;
