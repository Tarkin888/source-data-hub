import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const EmptyState = ({ searchQuery, onClearSearch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Terms Found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        No terms match "{searchQuery}". Try different keywords or browse all terms.
      </p>
      <div className="flex gap-3">
        <Button onClick={onClearSearch} variant="outline">
          Clear Search
        </Button>
        <Button onClick={onClearSearch}>
          Browse All Terms
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
