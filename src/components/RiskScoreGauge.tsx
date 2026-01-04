import { useEffect, useState } from 'react';
import { RiskLevel } from '@/types/analysis';

interface RiskScoreGaugeProps {
  score: number;
  riskLevel: RiskLevel;
}

const RiskScoreGauge = ({ score, riskLevel }: RiskScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animate the score counting up
  useEffect(() => {
    const duration = 1500;
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

  // Calculate SVG circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Get colors based on risk level
  const getColors = () => {
    switch (riskLevel) {
      case 'Low':
        return {
          stroke: 'hsl(142, 76%, 36%)',
          glow: 'hsl(142, 76%, 36%)',
          bg: 'hsl(142, 76%, 36%, 0.1)',
        };
      case 'Medium':
        return {
          stroke: 'hsl(38, 92%, 50%)',
          glow: 'hsl(38, 92%, 50%)',
          bg: 'hsl(38, 92%, 50%, 0.1)',
        };
      case 'High':
        return {
          stroke: 'hsl(0, 72%, 51%)',
          glow: 'hsl(0, 72%, 51%)',
          bg: 'hsl(0, 72%, 51%, 0.1)',
        };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: colors.glow }}
        />
        
        {/* SVG Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(222, 30%, 18%)"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${colors.glow})`,
            }}
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-4xl font-bold font-mono"
            style={{ color: colors.stroke }}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Risk Score
          </span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div 
        className={`
          px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wider
          border transition-all duration-300
          ${riskLevel === 'Low' ? 'risk-badge-low' : ''}
          ${riskLevel === 'Medium' ? 'risk-badge-medium' : ''}
          ${riskLevel === 'High' ? 'risk-badge-high' : ''}
        `}
      >
        {riskLevel} Risk
      </div>
    </div>
  );
};

export default RiskScoreGauge;
