import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuestionOption {
  text: string;
  points: number;
}

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedValue: string | undefined;
  onSelect: (value: string, points: number) => void;
  domainName: string;
  domainColor: string;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  options,
  selectedValue,
  onSelect,
  domainName,
  domainColor,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <Card className="p-6 md:p-8">
      <div className="mb-6">
        <Badge 
          variant="secondary" 
          className="mb-4"
          style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
        >
          {domainName}
        </Badge>
        <p className="text-sm text-muted-foreground mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h3 className="text-2xl font-bold">{question}</h3>
      </div>

      <RadioGroup value={selectedValue} onValueChange={(value) => {
        const selectedOption = options.find((_, index) => index.toString() === value);
        if (selectedOption) {
          onSelect(value, selectedOption.points);
        }
      }}>
        <div className="space-y-3">
          {options.map((option, index) => (
            <Label
              key={index}
              htmlFor={`option-${index}`}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50",
                selectedValue === index.toString()
                  ? "border-primary bg-primary/5"
                  : "border-border"
              )}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="mt-0.5"
              />
              <span className="text-base flex-1">{option.text}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
};

export default QuestionCard;
