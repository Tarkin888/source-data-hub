import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCount: Record<string, number>;
}

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  categoryCount 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Badge
        variant={activeCategory === "all" ? "default" : "outline"}
        className={cn(
          "cursor-pointer transition-colors px-4 py-2 text-sm",
          activeCategory === "all" && "bg-primary text-primary-foreground"
        )}
        onClick={() => onCategoryChange("all")}
      >
        All Categories ({Object.values(categoryCount).reduce((a, b) => a + b, 0)})
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-colors px-4 py-2 text-sm",
            activeCategory === category && "bg-primary text-primary-foreground"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category} ({categoryCount[category] || 0})
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilter;
