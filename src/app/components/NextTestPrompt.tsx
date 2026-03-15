import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Activity, Heart, Zap, Brain, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { getNextTest, getNextIncompleteTest, hasActiveSubscription, getCompletedTestCount, TestInfo, TEST_ORDER } from '../utils/testTracking';

interface NextTestPromptProps {
  currentTestId: string;
  showResults: boolean;
}

const iconMap: { [key: string]: any } = {
  Activity,
  Heart,
  Zap,
  Brain,
  Moon,
};

export function NextTestPrompt({ currentTestId, showResults }: NextTestPromptProps) {
  // Only show for subscribers
  const hasSubscription = hasActiveSubscription();
  if (!hasSubscription || !showResults) {
    return null;
  }

  const nextTest = getNextTest(currentTestId);
  const nextIncompleteTest = getNextIncompleteTest(currentTestId);
  const completedCount = getCompletedTestCount();
  const totalTests = TEST_ORDER.length;
  const allTestsCompleted = completedCount >= totalTests;

  // If all tests are completed, show dashboard link
  if (allTestsCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 p-8 mb-8"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">🎉 All Tests Completed!</h3>
          <p className="text-gray-700 mb-6">
            Congratulations! You've completed all {totalTests} health assessments. View your complete health dashboard now.
          </p>
          <Link to="/subscriber-dashboard">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
              View Dashboard & Download Full Report
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // Show next test suggestion
  const suggestedTest = nextIncompleteTest || nextTest;
  if (!suggestedTest) {
    return null;
  }

  const Icon = iconMap[suggestedTest.icon] || Activity;
  const isNextInSequence = nextTest?.id === suggestedTest.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-2 border-blue-200 p-6 mb-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg text-gray-900">
              {isNextInSequence ? 'Next Test' : 'Suggested Test'}
            </h3>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              {completedCount}/{totalTests} Complete
            </span>
          </div>
          <p className="text-2xl text-gray-900 mb-2">{suggestedTest.name}</p>
          <p className="text-sm text-gray-600 mb-4">{suggestedTest.description}</p>
          <Link to={suggestedTest.path}>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
              Start {suggestedTest.name}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Overall Progress</span>
          <span className="text-xs text-gray-900">{Math.round((completedCount / totalTests) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500"
            style={{ width: `${(completedCount / totalTests) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}