// Utility functions for tracking health test completions

export interface CompletedTest {
  testId: string;
  testName: string;
  score: number;
  completedDate: string;
  unlocked: boolean;
}

export interface TestCompletionData {
  [testId: string]: CompletedTest;
}

// Test IDs that match the dashboard
export const TEST_IDS = {
  BODY_FAT: 'body-fat',
  LONGEVITY: 'longevity',
  HEART_RISK: 'heart-risk',
  STRESS: 'stress',
  MENTAL_AGE: 'mental-age',
  SLEEP: 'sleep',
} as const;

// Test order and navigation
export interface TestInfo {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
}

export const TEST_ORDER: TestInfo[] = [
  {
    id: TEST_IDS.BODY_FAT,
    name: 'Body Fat Analysis',
    path: '/body-fat-analyzer',
    icon: 'Activity',
    description: 'Calculate your body fat percentage and metabolic age',
  },
  {
    id: TEST_IDS.LONGEVITY,
    name: 'Longevity Score Test',
    path: '/longevity-score',
    icon: 'Heart',
    description: 'Discover your estimated lifespan based on lifestyle factors',
  },
  {
    id: TEST_IDS.HEART_RISK,
    name: 'Heart Risk Checker',
    path: '/heart-risk',
    icon: 'Heart',
    description: 'Assess your cardiovascular health risk level',
  },
  {
    id: TEST_IDS.STRESS,
    name: 'Stress Level Analyzer',
    path: '/stress-level',
    icon: 'Zap',
    description: 'Evaluate your stress levels and mental wellbeing',
  },
  {
    id: TEST_IDS.MENTAL_AGE,
    name: 'Mental Age Test',
    path: '/mental-age',
    icon: 'Brain',
    description: 'Find out if you think younger or older than your age',
  },
  {
    id: TEST_IDS.SLEEP,
    name: 'Sleep Quality Score',
    path: '/sleep-quality',
    icon: 'Moon',
    description: 'Analyze your sleep patterns and quality',
  },
];

// Get next test in sequence
export function getNextTest(currentTestId: string): TestInfo | null {
  const currentIndex = TEST_ORDER.findIndex(test => test.id === currentTestId);
  if (currentIndex === -1 || currentIndex === TEST_ORDER.length - 1) {
    return null; // Last test or not found
  }
  return TEST_ORDER[currentIndex + 1];
}

// Get previous test in sequence
export function getPreviousTest(currentTestId: string): TestInfo | null {
  const currentIndex = TEST_ORDER.findIndex(test => test.id === currentTestId);
  if (currentIndex <= 0) {
    return null; // First test or not found
  }
  return TEST_ORDER[currentIndex - 1];
}

// Get suggested next incomplete test
export function getNextIncompleteTest(currentTestId: string): TestInfo | null {
  const currentIndex = TEST_ORDER.findIndex(test => test.id === currentTestId);
  const completedTests = getCompletedTests();
  
  // Look for next incomplete test starting from current position
  for (let i = currentIndex + 1; i < TEST_ORDER.length; i++) {
    if (!completedTests[TEST_ORDER[i].id]) {
      return TEST_ORDER[i];
    }
  }
  
  // If all subsequent tests are complete, check from beginning
  for (let i = 0; i < currentIndex; i++) {
    if (!completedTests[TEST_ORDER[i].id]) {
      return TEST_ORDER[i];
    }
  }
  
  return null; // All tests completed
}

// Mark a test as completed
export function markTestCompleted(testId: string, testName: string, score: number, unlocked: boolean = false): void {
  const completedTests = getCompletedTests();
  
  completedTests[testId] = {
    testId,
    testName,
    score,
    completedDate: new Date().toISOString(),
    unlocked,
  };
  
  localStorage.setItem('healthScoreCompletedTests', JSON.stringify(completedTests));
}

// Get all completed tests
export function getCompletedTests(): TestCompletionData {
  const data = localStorage.getItem('healthScoreCompletedTests');
  if (!data) {
    return {};
  }
  
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Check if a test is completed
export function isTestCompleted(testId: string): boolean {
  const completedTests = getCompletedTests();
  return !!completedTests[testId];
}

// Check if a test is unlocked
export function isTestUnlocked(testId: string): boolean {
  const completedTests = getCompletedTests();
  return completedTests[testId]?.unlocked || false;
}

// Mark a test as unlocked (after payment)
export function markTestUnlocked(testId: string): void {
  const completedTests = getCompletedTests();
  if (completedTests[testId]) {
    completedTests[testId].unlocked = true;
    localStorage.setItem('healthScoreCompletedTests', JSON.stringify(completedTests));
  }
}

// Get test score
export function getTestScore(testId: string): number | null {
  const completedTests = getCompletedTests();
  return completedTests[testId]?.score ?? null;
}

// Get test completion date
export function getTestCompletionDate(testId: string): string | null {
  const completedTests = getCompletedTests();
  return completedTests[testId]?.completedDate ?? null;
}

// Check if user has active subscription
export function hasActiveSubscription(): boolean {
  const subData = localStorage.getItem('healthScoreSubscription');
  if (!subData) return false;
  
  try {
    const subscription = JSON.parse(subData);
    return subscription.active === true;
  } catch {
    return false;
  }
}

// Get count of completed tests
export function getCompletedTestCount(): number {
  return Object.keys(getCompletedTests()).length;
}

// Get count of unlocked tests
export function getUnlockedTestCount(): number {
  const completedTests = getCompletedTests();
  return Object.values(completedTests).filter(test => test.unlocked).length;
}

// Clear all test data (for testing purposes)
export function clearAllTestData(): void {
  localStorage.removeItem('healthScoreCompletedTests');
}