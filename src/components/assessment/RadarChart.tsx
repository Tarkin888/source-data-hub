import { useEffect, useState } from 'react';

interface DomainScore {
  name: string;
  score: number;
  maxScore: number;
  color: string;
}

interface RadarChartProps {
  domains: DomainScore[];
}

const RadarChart = ({ domains }: RadarChartProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const size = 400;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 5;

  // Calculate points for each domain
  const calculatePoint = (index: number, value: number, maxValue: number) => {
    const angle = (Math.PI * 2 * index) / domains.length - Math.PI / 2;
    const radius = (value / maxValue) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Create path for the data polygon
  const dataPoints = domains.map((domain, index) =>
    calculatePoint(index, domain.score, domain.maxScore)
  );
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        {/* Background levels */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = maxRadius * ((i + 1) / levels);
          const levelPoints = domains.map((_, index) => {
            const angle = (Math.PI * 2 * index) / domains.length - Math.PI / 2;
            return {
              x: center + levelRadius * Math.cos(angle),
              y: center + levelRadius * Math.sin(angle),
            };
          });
          const levelPath = levelPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          
          return (
            <path
              key={i}
              d={levelPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          );
        })}

        {/* Axis lines */}
        {domains.map((_, index) => {
          const endPoint = calculatePoint(index, domains[0].maxScore, domains[0].maxScore);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          className={`transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="hsl(var(--primary))"
            className={`transition-all duration-1000 delay-${index * 100} ${
              animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          />
        ))}

        {/* Domain labels */}
        {domains.map((domain, index) => {
          const labelPoint = calculatePoint(index, domain.maxScore, domain.maxScore);
          const angle = (Math.PI * 2 * index) / domains.length - Math.PI / 2;
          const labelDistance = maxRadius + 30;
          const labelX = center + labelDistance * Math.cos(angle);
          const labelY = center + labelDistance * Math.sin(angle);
          
          return (
            <text
              key={index}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-sm font-semibold"
            >
              {domain.name.split(' ')[0]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
