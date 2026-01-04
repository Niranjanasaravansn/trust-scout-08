import { Clock, User, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AnalysisResult, RiskLevel } from '@/types/analysis';
import { formatDistanceToNow } from 'date-fns';

interface AnalysisHistoryProps {
  history: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
}

const getRiskIcon = (level: RiskLevel) => {
  switch (level) {
    case 'Low':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'Medium':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'High':
      return <XCircle className="w-4 h-4 text-destructive" />;
  }
};

const AnalysisHistory = ({ history, onSelect }: AnalysisHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No analysis history yet</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Analyzed accounts will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((result, index) => (
        <button
          key={index}
          onClick={() => onSelect(result)}
          className="w-full p-4 rounded-lg bg-secondary/20 hover:bg-secondary/40 border border-border/30 hover:border-primary/30 transition-all duration-200 text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  @{result.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  {getRiskIcon(result.riskLevel)}
                  <span className={`
                    text-sm font-medium
                    ${result.riskLevel === 'Low' ? 'text-success' : ''}
                    ${result.riskLevel === 'Medium' ? 'text-warning' : ''}
                    ${result.riskLevel === 'High' ? 'text-destructive' : ''}
                  `}>
                    {result.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  Score: {result.riskScore}
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnalysisHistory;
