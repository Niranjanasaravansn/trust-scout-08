import { User, Calendar, Users, FileText } from 'lucide-react';
import { AnalysisResult } from '@/types/analysis';
import RiskScoreGauge from './RiskScoreGauge';
import TriggeredRules from './TriggeredRules';

interface ResultsPanelProps {
  result: AnalysisResult | null;
}

const ResultsPanel = ({ result }: ResultsPanelProps) => {
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-primary/40" />
        </div>
        <h3 className="text-lg font-medium text-muted-foreground">No Analysis Yet</h3>
        <p className="text-sm text-muted-foreground/70 mt-2 max-w-xs">
          Enter account details and click "Analyze Account" to see risk assessment results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Account Header */}
      <div className="text-center pb-6 border-b border-border/30">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/30 mb-4">
          <User className="w-4 h-4 text-primary" />
          <span className="font-mono font-medium">@{result.username}</span>
        </div>
        
        {/* Risk Score Gauge */}
        <RiskScoreGauge score={result.riskScore} riskLevel={result.riskLevel} />
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Calendar className="w-3 h-3" />
            Account Age
          </div>
          <p className="font-mono font-semibold">
            {result.accountData.accountAge} days
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Users className="w-3 h-3" />
            Followers
          </div>
          <p className="font-mono font-semibold">
            {result.accountData.followers.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Users className="w-3 h-3" />
            Following
          </div>
          <p className="font-mono font-semibold">
            {result.accountData.following.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <FileText className="w-3 h-3" />
            Bio Length
          </div>
          <p className="font-mono font-semibold">
            {result.accountData.bioLength} chars
          </p>
        </div>
      </div>

      {/* Triggered Rules */}
      <div className="pt-4 border-t border-border/30">
        <TriggeredRules rules={result.triggeredRules} />
      </div>
    </div>
  );
};

export default ResultsPanel;
