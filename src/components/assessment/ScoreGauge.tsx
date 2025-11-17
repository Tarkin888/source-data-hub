import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
}

const ScoreGauge = ({ score, maxScore }: ScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  
  // Determine status based on score
  const getStatus = () => {
    if (score < 40) return { label: 'Not Ready', color: 'text-red-500', bg: 'bg-red-100', ring: 'ring-red-500' };
    if (score < 80) return { label: 'Partially Ready', color: 'text-amber-500', bg: 'bg-amber-100', ring: 'ring-amber-500' };
    return { label: 'Ready', color: 'text-green-500', bg: 'bg-green-100', ring: 'ring-green-500' };
  };

  const getMessage = () => {
    if (score < 40) return 'Significant work needed to achieve P29 compliance';
    if (score < 80) return 'Foundation in place, but gaps remain';
    return 'Strong position for P29 compliance';
  };

  const status = getStatus();

  // Animate score counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Calculate stroke dash for circular progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-80 h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="currentColor"
            strokeWidth="16"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="currentColor"
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${status.color} transition-all duration-2000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-foreground">{animatedScore}</div>
          <div className="text-2xl text-muted-foreground">out of {maxScore}</div>
          <div className="text-4xl font-semibold text-muted-foreground mt-2">{Math.round(percentage)}%</div>
        </div>
      </div>

      <div className={`${status.bg} ${status.color} px-6 py-3 rounded-full font-semibold text-lg`}>
        {status.label}
      </div>

      <p className="text-center text-xl text-muted-foreground max-w-2xl">
        {getMessage()}
      </p>
    </div>
  );
};

export default ScoreGauge;
