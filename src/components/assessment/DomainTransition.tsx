import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface DomainTransitionProps {
  previousDomain: string;
  nextDomain: {
    name: string;
    icon: string;
  };
  onComplete: () => void;
}

const DomainTransition = ({
  previousDomain,
  nextDomain,
  onComplete,
}: DomainTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center gap-3 text-primary">
          <CheckCircle2 className="h-8 w-8" />
          <h2 className="text-2xl font-bold">{previousDomain} Complete</h2>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground">Next domain:</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{nextDomain.icon}</span>
            <h3 className="text-xl font-semibold">{nextDomain.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainTransition;
