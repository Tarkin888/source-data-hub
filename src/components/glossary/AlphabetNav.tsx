import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AlphabetNavProps {
  activeLetters: Set<string>;
  activeLetter: string;
  onLetterClick: (letter: string) => void;
}

const AlphabetNav = ({ activeLetters, activeLetter, onLetterClick }: AlphabetNavProps) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {alphabet.map((letter) => {
        const isActive = activeLetters.has(letter);
        const isCurrent = activeLetter === letter;
        
        return (
          <Badge
            key={letter}
            variant={isCurrent ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors w-8 h-8 flex items-center justify-center p-0 text-sm font-semibold",
              isActive
                ? isCurrent
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
                : "opacity-40 cursor-not-allowed"
            )}
            onClick={() => isActive && onLetterClick(letter)}
          >
            {letter}
          </Badge>
        );
      })}
    </div>
  );
};

export default AlphabetNav;
