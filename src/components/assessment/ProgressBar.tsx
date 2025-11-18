import { Progress } from '@/components/ui/progress';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  currentDomain: string;
  totalDomains: number;
  onBack: () => void;
  canGoBack: boolean;
}

const ProgressBar = ({
  currentQuestion,
  totalQuestions,
  currentDomain,
  totalDomains,
  onBack,
  canGoBack,
}: ProgressBarProps) => {
  const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={!canGoBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{currentDomain}</span>
              {' • '}
              Domain {totalDomains} of 5
              {' • '}
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
          <div className="w-20"></div>
        </div>
        <Progress value={percentage} className="h-3" />
      </div>
    </div>
  );
};

export default ProgressBar;
