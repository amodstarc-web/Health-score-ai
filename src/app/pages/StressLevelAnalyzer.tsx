import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, CheckCircle2, ArrowRight, CreditCard, Smartphone, Wallet, X, Brain, Moon, Smile, Monitor, Activity, Users, AlertTriangle, Wind, Coffee, Target, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { generatePDFReport as generatePDF } from '../utils/pdfGenerator';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface StressFormData {
  workStress: string;
  sleepQuality: string;
  moodStability: string;
  screenTime: string;
  physicalActivity: string;
  socialInteraction: string;
}

export default function StressLevelAnalyzer() {
  const [formData, setFormData] = useState<StressFormData>({
    workStress: '',
    sleepQuality: '',
    moodStability: '',
    screenTime: '',
    physicalActivity: '',
    socialInteraction: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check if test is already unlocked or user has subscription
  useEffect(() => {
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.STRESS);
    const hasSubscription = hasActiveSubscription();
    if (alreadyUnlocked || hasSubscription) {
      setIsUnlocked(true);
    }
  }, []);

  const handleStartTest = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    
    // Calculate and save the test completion
    const stress = calculateStressScore();
    markTestCompleted(TEST_IDS.STRESS, 'Stress Level', parseFloat(stress.toFixed(0)), isUnlocked);
  };

  const handleUnlockClick = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setIsUnlocked(true);
      
      // Mark test as unlocked
      markTestUnlocked(TEST_IDS.STRESS);
      
      // Update the completion with unlocked status
      const stress = calculateStressScore();
      markTestCompleted(TEST_IDS.STRESS, 'Stress Level', parseFloat(stress.toFixed(0)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      workStress: '',
      sleepQuality: '',
      moodStability: '',
      screenTime: '',
      physicalActivity: '',
      socialInteraction: '',
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Scroll to results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showResults]);

  // Calculate Stress Score
  const calculateStressScore = () => {
    let stressPoints = 0;

    // Work stress level (0-25 points)
    const workStressPoints: { [key: string]: number } = {
      'low': 5,
      'moderate': 12,
      'high': 18,
      'very-high': 25,
    };
    stressPoints += workStressPoints[formData.workStress] || 0;

    // Sleep quality (0-20 points, inverse scoring - poor sleep = high stress)
    const sleepPoints: { [key: string]: number } = {
      'excellent': 2,
      'good': 6,
      'fair': 12,
      'poor': 20,
    };
    stressPoints += sleepPoints[formData.sleepQuality] || 0;

    // Mood stability (0-20 points)
    const moodPoints: { [key: string]: number } = {
      'very-stable': 2,
      'stable': 6,
      'variable': 12,
      'unstable': 20,
    };
    stressPoints += moodPoints[formData.moodStability] || 0;

    // Screen time (0-15 points)
    const screenPoints: { [key: string]: number } = {
      'less-2': 2,
      '2-4': 5,
      '4-6': 9,
      '6-8': 12,
      'more-8': 15,
    };
    stressPoints += screenPoints[formData.screenTime] || 0;

    // Physical activity (0-10 points, inverse - less activity = more stress)
    const activityPoints: { [key: string]: number } = {
      'daily': 1,
      '4-6': 3,
      '2-3': 6,
      '1': 8,
      'none': 10,
    };
    stressPoints += activityPoints[formData.physicalActivity] || 0;

    // Social interaction (0-10 points, inverse - less interaction = more stress)
    const socialPoints: { [key: string]: number } = {
      'daily': 1,
      '4-6': 3,
      '2-3': 6,
      '1': 8,
      'rare': 10,
    };
    stressPoints += socialPoints[formData.socialInteraction] || 0;

    return stressPoints;
  };

  const stressScore = calculateStressScore();
  
  const getStressLevel = () => {
    if (stressScore <= 20) return { level: 'Low Stress', color: 'text-green-600', bgColor: 'bg-green-50', description: 'You are managing stress well.' };
    if (stressScore <= 40) return { level: 'Mild Stress', color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'You are experiencing some stress.' };
    if (stressScore <= 60) return { level: 'Moderate Stress', color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'You may be experiencing moderate stress.' };
    if (stressScore <= 80) return { level: 'High Stress', color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'You are experiencing significant stress.' };
    return { level: 'Very High Stress', color: 'text-red-600', bgColor: 'bg-red-50', description: 'You may be at risk of burnout.' };
  };

  const stressLevel = getStressLevel();

  const generatePDFReport = () => {
    const recommendations = [];
    
    // Add personalized recommendations based on form data
    if (formData.sleepQuality === 'poor' || formData.sleepQuality === 'fair') {
      recommendations.push('Prioritize 7-9 hours of quality sleep each night');
      recommendations.push('Create a consistent bedtime routine');
      recommendations.push('Avoid screens 1 hour before sleep');
    }
    
    if (formData.physicalActivity === 'none' || formData.physicalActivity === '1') {
      recommendations.push('Incorporate 30 minutes of moderate exercise 4-5 times per week');
      recommendations.push('Start with simple activities like walking or yoga');
    }
    
    if (formData.screenTime === '6-8' || formData.screenTime === 'more-8') {
      recommendations.push('Reduce screen time and take regular breaks');
      recommendations.push('Follow the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds');
    }
    
    if (formData.socialInteraction === 'rare' || formData.socialInteraction === '1') {
      recommendations.push('Schedule regular time with friends or family');
      recommendations.push('Join social groups or community activities');
    }
    
    recommendations.push('Practice daily mindfulness or meditation for 10-15 minutes');
    recommendations.push('Maintain a stress journal to identify triggers');
    recommendations.push('Consider professional support if stress persists');
    
    generatePDF({
      testName: 'Stress Level Analysis Report',
      score: `${stressScore}/100 (${stressLevel.level})`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      sections: [
        {
          title: 'Your Stress Assessment',
          content: [
            `Current Stress Score: ${stressScore} out of 100`,
            `Stress Level: ${stressLevel.level}`,
            `${stressLevel.description}`,
          ],
        },
        {
          title: 'Primary Stress Factors',
          content: [
            `Work Stress Level: ${formData.workStress}`,
            `Sleep Quality: ${formData.sleepQuality}`,
            `Mood Stability: ${formData.moodStability}`,
            `Daily Screen Time: ${formData.screenTime} hours`,
            `Physical Activity: ${formData.physicalActivity} times per week`,
            `Social Interaction: ${formData.socialInteraction} times per week`,
          ],
        },
        {
          title: 'Personalized Stress Management Plan',
          content: recommendations,
        },
        {
          title: 'Key Recommendations',
          content: [
            'Sleep Optimization: Maintain 7-9 hours of quality sleep per night',
            'Mindfulness Practice: Start with 10 minutes of daily meditation',
            'Physical Movement: Aim for 30 minutes of moderate exercise 4-5 times weekly',
            'Digital Detox: Set boundaries for screen time and take regular breaks',
            'Social Connection: Prioritize meaningful interactions with friends and family',
          ],
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
            </Link>
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm mb-6">
              <Brain className="h-4 w-4" />
              <span>Mental Wellness Assessment</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Measure Your Stress Level<br />in 90 Seconds
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Understand your mental stress score and hidden burnout risk.
            </p>

            <button
              onClick={handleStartTest}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">Start Stress Test</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Calming Icons */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Mental Health</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                <Moon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Sleep Quality</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                <Wind className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Stress Relief</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl mb-8 text-center text-gray-900">
              Complete Your Stress Assessment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Work Stress Level */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Coffee className="inline h-4 w-4 mr-2 text-purple-600" />
                  Work Stress Level
                </label>
                <select
                  name="workStress"
                  value={formData.workStress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select work stress level</option>
                  <option value="low">Low - Relaxed and comfortable</option>
                  <option value="moderate">Moderate - Some pressure</option>
                  <option value="high">High - Significant pressure</option>
                  <option value="very-high">Very High - Overwhelming</option>
                </select>
              </div>

              {/* Sleep Quality */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Moon className="inline h-4 w-4 mr-2 text-blue-600" />
                  Sleep Quality
                </label>
                <select
                  name="sleepQuality"
                  value={formData.sleepQuality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select sleep quality</option>
                  <option value="excellent">Excellent - 7-9 hours, deep sleep</option>
                  <option value="good">Good - 6-7 hours, mostly restful</option>
                  <option value="fair">Fair - 5-6 hours, some disturbance</option>
                  <option value="poor">Poor - Less than 5 hours or restless</option>
                </select>
              </div>

              {/* Mood Stability */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Smile className="inline h-4 w-4 mr-2 text-yellow-600" />
                  Mood Stability
                </label>
                <select
                  name="moodStability"
                  value={formData.moodStability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select mood stability</option>
                  <option value="very-stable">Very Stable - Consistently positive</option>
                  <option value="stable">Stable - Generally balanced</option>
                  <option value="variable">Variable - Frequent mood changes</option>
                  <option value="unstable">Unstable - Significant fluctuations</option>
                </select>
              </div>

              {/* Daily Screen Time */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Monitor className="inline h-4 w-4 mr-2 text-indigo-600" />
                  Daily Screen Time (hours)
                </label>
                <select
                  name="screenTime"
                  value={formData.screenTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select screen time</option>
                  <option value="less-2">Less than 2 hours</option>
                  <option value="2-4">2-4 hours</option>
                  <option value="4-6">4-6 hours</option>
                  <option value="6-8">6-8 hours</option>
                  <option value="more-8">More than 8 hours</option>
                </select>
              </div>

              {/* Physical Activity */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Activity className="inline h-4 w-4 mr-2 text-green-600" />
                  Physical Activity Frequency (per week)
                </label>
                <select
                  name="physicalActivity"
                  value={formData.physicalActivity}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select activity frequency</option>
                  <option value="daily">Daily - 7 times a week</option>
                  <option value="4-6">Frequent - 4-6 times a week</option>
                  <option value="2-3">Moderate - 2-3 times a week</option>
                  <option value="1">Occasional - Once a week</option>
                  <option value="none">None - No regular exercise</option>
                </select>
              </div>

              {/* Social Interaction */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Users className="inline h-4 w-4 mr-2 text-pink-600" />
                  Social Interaction Frequency (per week)
                </label>
                <select
                  name="socialInteraction"
                  value={formData.socialInteraction}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select interaction frequency</option>
                  <option value="daily">Daily - Regular social contact</option>
                  <option value="4-6">Frequent - 4-6 times a week</option>
                  <option value="2-3">Moderate - 2-3 times a week</option>
                  <option value="1">Occasional - Once a week</option>
                  <option value="rare">Rare - Less than once a week</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl text-lg"
              >
                Calculate My Stress Score
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-4"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Preview Result */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl mb-6 text-gray-900">Your Stress Assessment</h2>
                  
                  {/* Circular Stress Score */}
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="#f0f0f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="url(#stressGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(stressScore / 100) * 552.92} 552.92`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl text-gray-900">{stressScore}</div>
                      <div className="text-gray-500 text-sm">/ 100</div>
                    </div>
                  </div>

                  <div className={`inline-block px-6 py-3 ${stressLevel.bgColor} ${stressLevel.color} rounded-full mb-4`}>
                    {stressLevel.level}
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    {stressLevel.description}
                  </p>
                </div>

                {/* Locked Section */}
                {!isUnlocked && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center">
                      <div className="text-center px-4">
                        <Lock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-2xl mb-4 text-gray-900">Unlock Full Stress Report</h3>
                        <p className="text-gray-600 mb-6">Get personalized insights and recommendations</p>
                        <button
                          onClick={handleUnlockClick}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          Unlock for ₹39
                        </button>
                      </div>
                    </div>

                    <div className="blur-sm pointer-events-none space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Burnout Risk Assessment</h4>
                          <p className="text-gray-600">Detailed analysis of your burnout indicators and warning signs based on your lifestyle patterns.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Stress Triggers Identified</h4>
                          <p className="text-gray-600">Personalized breakdown of your primary stress sources and how they impact your mental wellbeing.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Wind className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Mental Recovery Suggestions</h4>
                          <p className="text-gray-600">Evidence-based recommendations for stress reduction, mindfulness practices, and lifestyle adjustments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unlocked Section */}
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl text-green-900">Report Unlocked Successfully!</h3>
                      </div>
                      <p className="text-green-700">Your complete stress analysis is now available.</p>
                    </div>

                    {/* Burnout Risk */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Burnout Risk Assessment</h4>
                          <div className="space-y-3">
                            <div className="bg-white/60 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Current Risk Level</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                  stressScore >= 70 ? 'bg-red-100 text-red-700' :
                                  stressScore >= 50 ? 'bg-orange-100 text-orange-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {stressScore >= 70 ? 'High Risk' : stressScore >= 50 ? 'Moderate Risk' : 'Low Risk'}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${stressScore}%` }}
                                />
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {stressScore >= 70 
                                ? "Your stress levels indicate a high risk of burnout. It's crucial to take immediate steps to reduce stress and prioritize self-care. Consider consulting a mental health professional."
                                : stressScore >= 50
                                ? "You're showing moderate signs of stress that could lead to burnout if not addressed. Focus on improving sleep quality and incorporating stress-relief activities into your routine."
                                : "Your current stress levels are manageable, but stay mindful of early warning signs. Continue maintaining healthy habits to prevent future stress buildup."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stress Triggers */}
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Target className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Your Primary Stress Triggers</h4>
                          <div className="space-y-3">
                            {formData.workStress === 'high' || formData.workStress === 'very-high' ? (
                              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                <Coffee className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-gray-900">High Work Pressure</p>
                                  <p className="text-sm text-gray-600">Your work stress is a significant contributor to your overall stress levels.</p>
                                </div>
                              </div>
                            ) : null}
                            
                            {formData.sleepQuality === 'poor' || formData.sleepQuality === 'fair' ? (
                              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                <Moon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-gray-900">Poor Sleep Quality</p>
                                  <p className="text-sm text-gray-600">Inadequate sleep is impacting your stress resilience and mental recovery.</p>
                                </div>
                              </div>
                            ) : null}
                            
                            {formData.screenTime === '6-8' || formData.screenTime === 'more-8' ? (
                              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                <Monitor className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-gray-900">Excessive Screen Time</p>
                                  <p className="text-sm text-gray-600">High digital exposure may be contributing to mental fatigue and stress.</p>
                                </div>
                              </div>
                            ) : null}
                            
                            {formData.physicalActivity === 'none' || formData.physicalActivity === '1' ? (
                              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                <Activity className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-gray-900">Limited Physical Activity</p>
                                  <p className="text-sm text-gray-600">Lack of regular exercise reduces your body's natural stress-relief mechanisms.</p>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mental Recovery Suggestions */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Wind className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Personalized Recovery Plan</h4>
                          <div className="space-y-3">
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Sleep Optimization
                              </h5>
                              <p className="text-sm text-gray-700">Aim for 7-9 hours of quality sleep. Create a bedtime routine, avoid screens 1 hour before sleep, and maintain a cool, dark bedroom environment.</p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Mindfulness Practice
                              </h5>
                              <p className="text-sm text-gray-700">Start with 10 minutes of daily meditation or deep breathing exercises. Apps like Headspace or Calm can guide you through beginner-friendly sessions.</p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Physical Movement
                              </h5>
                              <p className="text-sm text-gray-700">Incorporate 30 minutes of moderate exercise 4-5 times per week. Even a brisk walk can significantly reduce stress hormones.</p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Digital Detox
                              </h5>
                              <p className="text-sm text-gray-700">Set boundaries for screen time. Take regular breaks using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.</p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Social Connection
                              </h5>
                              <p className="text-sm text-gray-700">Prioritize meaningful social interactions. Schedule regular time with friends or family, even if virtual, to maintain emotional support networks.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Professional Help Recommendation */}
                    {stressScore >= 60 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                          <Brain className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-lg mb-2 text-gray-900">Consider Professional Support</h4>
                            <p className="text-gray-700 mb-3">
                              Based on your stress levels, speaking with a mental health professional could provide valuable support and coping strategies.
                            </p>
                            <p className="text-sm text-gray-600">
                              Resources: Psychology Today, BetterHelp, or consult your healthcare provider for local therapist recommendations.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Take Test Again
                  </button>
                  {isUnlocked && (
                    <Button
                      onClick={generatePDFReport}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Report
                    </Button>
                  )}
                  <Link
                    to="/"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all text-center"
                  >
                    Explore Other Tests
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isProcessing && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl text-gray-900">Unlock Full Report</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Full Stress Report</span>
                  <span className="text-2xl text-gray-900">₹39</span>
                </div>
                <p className="text-sm text-gray-600">One-time payment • Instant access</p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-900">UPI / QR Code</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-900">Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-900">Paytm / PhonePe</span>
                </button>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </span>
                ) : (
                  'Pay ₹39'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Secure payment • Demo mode for testing
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Test Prompt for Subscribers */}
      {showResults && (
        <div className="px-4 py-8">
          <div className="container mx-auto max-w-5xl">
            <NextTestPrompt currentTestId={TEST_IDS.STRESS} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}