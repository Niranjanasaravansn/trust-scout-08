import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { TriggeredRule } from '@/types/analysis';

interface TriggeredRulesProps {
  rules: TriggeredRule[];
}

const TriggeredRules = ({ rules }: TriggeredRulesProps) => {
  if (rules.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
        <p className="text-success font-medium">No risk indicators detected</p>
        <p className="text-sm text-muted-foreground mt-1">
          This account passed all security checks
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="font-semibold">Triggered Rules ({rules.length})</h3>
      </div>
      
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-secondary/30 border border-border/30 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{rule.rule}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rule.description}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive font-mono text-sm font-semibold">
                  +{rule.points}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Total Score Breakdown */}
      <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total Points Added</span>
        <span className="font-mono font-bold text-lg">
          {rules.reduce((sum, rule) => sum + rule.points, 0)} pts
        </span>
      </div>
    </div>
  );
};

export default TriggeredRules;
