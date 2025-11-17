import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface MilestoneModalProps {
  milestone: {
    id: string;
    title: string;
    description: string;
    icon: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const MilestoneModal = ({ milestone, open, onClose }: MilestoneModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [open]);

  if (!milestone) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              >
                🎉
              </div>
            ))}
          </div>
        )}
        
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto text-6xl animate-scale-in">{milestone.icon}</div>
          <DialogTitle className="text-2xl">Milestone Unlocked!</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-lg font-semibold text-foreground">{milestone.title}</p>
            <p>{milestone.description}</p>
          </DialogDescription>
        </DialogHeader>
        
        <Button onClick={onClose} className="w-full mt-4">
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneModal;
