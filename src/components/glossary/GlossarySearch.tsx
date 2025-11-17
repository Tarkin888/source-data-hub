import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GlossarySearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  totalCount: number;
}

const GlossarySearch = ({ value, onChange, resultCount, totalCount }: GlossarySearchProps) => {
  return (
    <div className="space-y-2">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search terms or definitions..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 h-12 text-base"
        />
      </div>
      {value && resultCount !== undefined && (
        <p className="text-sm text-muted-foreground text-center">
          {resultCount} of {totalCount} terms match "{value}"
        </p>
      )}
    </div>
  );
};

export default GlossarySearch;
