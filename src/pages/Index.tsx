import { useState } from 'react';
import { History, Shield } from 'lucide-react';
import Header from '@/components/Header';
import AnalysisForm from '@/components/AnalysisForm';
import ResultsPanel from '@/components/ResultsPanel';
import AnalysisHistory from '@/components/AnalysisHistory';
import { AccountData, AnalysisResult } from '@/types/analysis';
import { analyzeAccount } from '@/lib/riskAnalyzer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Handle form submission and run analysis
  const handleAnalyze = async (data: AccountData) => {
    setIsLoading(true);
    
    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Run the rule-based analysis
    const result = analyzeAccount(data);
    
    // Update state with new result
    setCurrentResult(result);
    setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 analyses
    setIsLoading(false);
    setShowHistory(false);
  };

  // Handle selecting from history
  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentResult(result);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Rule-Based Heuristic Risk Scoring Model
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Detect <span className="gradient-text">Fake Accounts</span> & Impersonation
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Analyze social media account details to identify potential fake or impersonation 
            accounts using our advanced rule-based detection system.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div className="glass-card-elevated p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </span>
                Account Details
              </h3>
              <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full glass-card p-4 flex items-center justify-between hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <History className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Analysis History</p>
                  <p className="text-xs text-muted-foreground">
                    {history.length} {history.length === 1 ? 'analysis' : 'analyses'} stored
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-muted-foreground transition-transform ${showHistory ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* History Panel (Collapsible) */}
            {showHistory && (
              <div className="glass-card p-4 animate-slide-up">
                <AnalysisHistory history={history} onSelect={handleSelectHistory} />
              </div>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="glass-card-elevated p-6 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Analysis Results
            </h3>
            <ResultsPanel result={currentResult} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="px-3 py-1.5 rounded-md bg-secondary/30 border border-border/30">
              No ML • Rule-Based Scoring
            </span>
            <span className="px-3 py-1.5 rounded-md bg-secondary/30 border border-border/30">
              Client-Side Analysis
            </span>
            <span className="px-3 py-1.5 rounded-md bg-secondary/30 border border-border/30">
              Privacy-First Approach
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
