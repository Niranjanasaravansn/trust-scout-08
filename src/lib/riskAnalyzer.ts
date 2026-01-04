// Rule-based heuristic risk scoring model for fake account detection

import { AccountData, TriggeredRule, RiskLevel, AnalysisResult } from '@/types/analysis';

// Suspicious username patterns (common in fake accounts)
const SUSPICIOUS_PATTERNS = [
  /^\d+$/, // All numbers
  /^[a-z]+\d{4,}$/i, // Name followed by 4+ digits
  /(.)\1{3,}/, // Same character repeated 4+ times
  /^user\d+$/i, // Generic "user" prefix
  /^[a-z]{1,3}\d{6,}$/i, // Short prefix with many numbers
  /_+\d+_+/, // Underscores around numbers
  /temp|fake|test|bot|spam/i, // Suspicious keywords
];

/**
 * Check if username matches suspicious patterns
 */
function hasSuspiciousUsername(username: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(username));
}

/**
 * Calculate follower/following ratio
 */
function getFollowerRatio(followers: number, following: number): number {
  if (following === 0) return followers > 0 ? Infinity : 0;
  return followers / following;
}

/**
 * Determine risk level based on score
 */
function getRiskLevel(score: number): RiskLevel {
  if (score < 30) return 'Low';
  if (score < 60) return 'Medium';
  return 'High';
}

/**
 * Main analysis function - applies all rules and calculates risk score
 * This is a rule-based heuristic risk scoring model
 */
export function analyzeAccount(data: AccountData): AnalysisResult {
  const triggeredRules: TriggeredRule[] = [];
  let totalScore = 0;

  // Rule 1: Account age < 30 days → +30 points
  if (data.accountAge < 30) {
    const points = 30;
    totalScore += points;
    triggeredRules.push({
      rule: 'New Account',
      points,
      description: `Account is only ${data.accountAge} days old (< 30 days threshold)`,
    });
  }

  // Rule 2: Followers < 50 → +20 points
  if (data.followers < 50) {
    const points = 20;
    totalScore += points;
    triggeredRules.push({
      rule: 'Low Followers',
      points,
      description: `Only ${data.followers} followers (< 50 threshold)`,
    });
  }

  // Rule 3: Followers/Following ratio < 0.2 → +15 points
  const ratio = getFollowerRatio(data.followers, data.following);
  if (ratio < 0.2 && data.following > 0) {
    const points = 15;
    totalScore += points;
    triggeredRules.push({
      rule: 'Suspicious Ratio',
      points,
      description: `Follower/Following ratio is ${ratio.toFixed(2)} (< 0.2 threshold)`,
    });
  }

  // Rule 4: Suspicious username patterns → +15 points
  if (hasSuspiciousUsername(data.username)) {
    const points = 15;
    totalScore += points;
    triggeredRules.push({
      rule: 'Suspicious Username',
      points,
      description: 'Username matches known fake account patterns',
    });
  }

  // Rule 5: No profile photo → +10 points
  if (!data.hasProfilePhoto) {
    const points = 10;
    totalScore += points;
    triggeredRules.push({
      rule: 'No Profile Photo',
      points,
      description: 'Account has no profile photo set',
    });
  }

  // Rule 6: Empty or very short bio → +10 points
  if (data.bioLength < 10) {
    const points = 10;
    totalScore += points;
    triggeredRules.push({
      rule: 'Short/Empty Bio',
      points,
      description: `Bio is only ${data.bioLength} characters (< 10 threshold)`,
    });
  }

  // Cap score at 100
  const finalScore = Math.min(totalScore, 100);

  return {
    username: data.username,
    accountData: data,
    riskScore: finalScore,
    riskLevel: getRiskLevel(finalScore),
    triggeredRules,
    timestamp: new Date().toISOString(),
  };
}
