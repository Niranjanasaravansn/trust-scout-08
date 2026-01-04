// Type definitions for Trust-Scout analysis system

export interface AccountData {
  username: string;
  accountAge: number; // in days
  followers: number;
  following: number;
  bioLength: number;
  hasProfilePhoto: boolean;
}

export interface TriggeredRule {
  rule: string;
  points: number;
  description: string;
}

export interface AnalysisResult {
  id?: string;
  username: string;
  accountData: AccountData;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  triggeredRules: TriggeredRule[];
  timestamp: string;
}

export type RiskLevel = 'Low' | 'Medium' | 'High';
