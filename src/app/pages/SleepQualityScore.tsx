import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, CheckCircle2, ArrowRight, CreditCard, Smartphone, Wallet, X, Moon, Sun, Cloud, Star, Coffee, Smartphone as Phone, Clock, Bed, Sparkles, TrendingUp, Target, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface SleepFormData {
  sleepDuration: string;
  sleepTiming: string;
  nightAwakenings: string;
  screenTime: string;
  caffeineIntake: string;
}

export default function SleepQualityScore() {
  const [formData, setFormData] = useState<SleepFormData>({
    sleepDuration: '',
    sleepTiming: '',
    nightAwakenings: '',
    screenTime: '',
    caffeineIntake: '',
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
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.SLEEP);
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
    const sleepScore = calculateSleepScore();
    markTestCompleted(TEST_IDS.SLEEP, 'Sleep Quality', parseFloat(sleepScore.toFixed(0)), isUnlocked);
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
      markTestUnlocked(TEST_IDS.SLEEP);
      
      // Update the completion with unlocked status
      const sleepScore = calculateSleepScore();
      markTestCompleted(TEST_IDS.SLEEP, 'Sleep Quality', parseFloat(sleepScore.toFixed(0)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      sleepDuration: '',
      sleepTiming: '',
      nightAwakenings: '',
      screenTime: '',
      caffeineIntake: '',
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

  // Calculate Sleep Quality Score
  const calculateSleepScore = () => {
    let totalScore = 0;

    // Sleep Duration (0-30 points)
    const durationPoints: { [key: string]: number } = {
      'less-4': 5,
      '4-5': 10,
      '5-6': 18,
      '6-7': 24,
      '7-8': 30,
      '8-9': 28,
      'more-9': 20,
    };
    totalScore += durationPoints[formData.sleepDuration] || 0;

    // Sleep Timing (0-25 points)
    const timingPoints: { [key: string]: number } = {
      'before-10': 25,
      '10-11': 23,
      '11-12': 18,
      '12-1': 12,
      'after-1': 8,
    };
    totalScore += timingPoints[formData.sleepTiming] || 0;

    // Night Awakenings (0-25 points)
    const awakeningsPoints: { [key: string]: number } = {
      'none': 25,
      '1': 20,
      '2': 12,
      '3': 6,
      'more-3': 3,
    };
    totalScore += awakeningsPoints[formData.nightAwakenings] || 0;

    // Screen Time Before Bed (0-10 points)
    const screenPoints: { [key: string]: number } = {
      'none': 10,
      'less-30': 8,
      '30-60': 5,
      '60-120': 2,
      'more-120': 0,
    };
    totalScore += screenPoints[formData.screenTime] || 0;

    // Caffeine Intake (0-10 points)
    const caffeinePoints: { [key: string]: number } = {
      'none': 10,
      'morning': 9,
      'afternoon': 6,
      'evening': 2,
      'night': 0,
    };
    totalScore += caffeinePoints[formData.caffeineIntake] || 0;

    return totalScore;
  };

  const sleepScore = calculateSleepScore();
  
  const getSleepQuality = () => {
    if (sleepScore >= 85) return { 
      level: 'Excellent Sleep', 
      color: 'text-green-400', 
      bgColor: 'bg-green-500/10', 
      description: 'Your sleep quality is optimal for recovery.',
      emoji: '🌟'
    };
    if (sleepScore >= 70) return { 
      level: 'Good Sleep', 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-500/10', 
      description: 'Your sleep is generally healthy with minor improvements possible.',
      emoji: '😊'
    };
    if (sleepScore >= 50) return { 
      level: 'Fair Sleep', 
      color: 'text-yellow-400', 
      bgColor: 'bg-yellow-500/10', 
      description: 'Your sleep quality may be affecting your energy levels.',
      emoji: '😐'
    };
    if (sleepScore >= 30) return { 
      level: 'Poor Sleep', 
      color: 'text-orange-400', 
      bgColor: 'bg-orange-500/10', 
      description: 'Your sleep quality needs significant improvement.',
      emoji: '😟'
    };
    return { 
      level: 'Very Poor Sleep', 
      color: 'text-red-400', 
      bgColor: 'bg-red-500/10', 
      description: 'Your sleep is likely damaging your health.',
      emoji: '😰'
    };
  };

  const sleepQuality = getSleepQuality();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm shadow-lg z-50 border-b border-blue-800/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-white">HealthScore AI</span>
            </Link>
            <Link
              to="/"
              className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Floating Moon Icon */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
                <Moon className="h-10 w-10 text-slate-800" />
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-6 border border-blue-400/30">
              <Bed className="h-4 w-4" />
              <span>Sleep Health Assessment</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Check Your<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sleep Quality Score
              </span>
            </h1>
            
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Discover if your sleep is restoring your body or damaging it.
            </p>

            <button
              onClick={handleStartTest}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">Start Sleep Test</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Sleep Benefits Icons */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-700/30">
                <Moon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-200">Sleep Quality</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-700/30">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-blue-200">Energy Levels</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-700/30">
                <Sun className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-blue-200">Circadian Health</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-700/30">
                <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-blue-200">Recovery Rate</p>
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
            className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-700/30"
          >
            <h2 className="text-3xl mb-8 text-center text-white">
              Answer 5 Sleep Questions
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sleep Duration */}
              <div>
                <label className="block text-sm mb-2 text-blue-200">
                  <Clock className="inline h-4 w-4 mr-2 text-blue-400" />
                  How many hours do you sleep per night?
                </label>
                <select
                  name="sleepDuration"
                  value={formData.sleepDuration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="">Select sleep duration</option>
                  <option value="less-4">Less than 4 hours</option>
                  <option value="4-5">4-5 hours</option>
                  <option value="5-6">5-6 hours</option>
                  <option value="6-7">6-7 hours</option>
                  <option value="7-8">7-8 hours (Ideal)</option>
                  <option value="8-9">8-9 hours</option>
                  <option value="more-9">More than 9 hours</option>
                </select>
              </div>

              {/* Sleep Timing */}
              <div>
                <label className="block text-sm mb-2 text-blue-200">
                  <Moon className="inline h-4 w-4 mr-2 text-indigo-400" />
                  What time do you usually go to bed?
                </label>
                <select
                  name="sleepTiming"
                  value={formData.sleepTiming}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="">Select bedtime</option>
                  <option value="before-10">Before 10 PM (Optimal)</option>
                  <option value="10-11">10 PM - 11 PM</option>
                  <option value="11-12">11 PM - 12 AM</option>
                  <option value="12-1">12 AM - 1 AM</option>
                  <option value="after-1">After 1 AM</option>
                </select>
              </div>

              {/* Night Awakenings */}
              <div>
                <label className="block text-sm mb-2 text-blue-200">
                  <Cloud className="inline h-4 w-4 mr-2 text-purple-400" />
                  How many times do you wake up during the night?
                </label>
                <select
                  name="nightAwakenings"
                  value={formData.nightAwakenings}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="">Select frequency</option>
                  <option value="none">None - Sleep through the night</option>
                  <option value="1">Once</option>
                  <option value="2">Twice</option>
                  <option value="3">Three times</option>
                  <option value="more-3">More than 3 times</option>
                </select>
              </div>

              {/* Screen Time Before Bed */}
              <div>
                <label className="block text-sm mb-2 text-blue-200">
                  <Phone className="inline h-4 w-4 mr-2 text-cyan-400" />
                  Screen time before bed (in minutes)?
                </label>
                <select
                  name="screenTime"
                  value={formData.screenTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="">Select screen time</option>
                  <option value="none">None - No screens before bed</option>
                  <option value="less-30">Less than 30 minutes</option>
                  <option value="30-60">30-60 minutes</option>
                  <option value="60-120">1-2 hours</option>
                  <option value="more-120">More than 2 hours</option>
                </select>
              </div>

              {/* Caffeine Intake */}
              <div>
                <label className="block text-sm mb-2 text-blue-200">
                  <Coffee className="inline h-4 w-4 mr-2 text-amber-400" />
                  When do you have your last caffeine?
                </label>
                <select
                  name="caffeineIntake"
                  value={formData.caffeineIntake}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
                >
                  <option value="">Select caffeine timing</option>
                  <option value="none">No caffeine</option>
                  <option value="morning">Morning only (before 12 PM)</option>
                  <option value="afternoon">Afternoon (12-4 PM)</option>
                  <option value="evening">Evening (4-8 PM)</option>
                  <option value="night">Night (after 8 PM)</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 rounded-xl text-lg shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Calculate My Sleep Score
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
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-700/30">
                {/* Preview Result */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <div className="text-6xl mb-4">{sleepQuality.emoji}</div>
                    <h2 className="text-2xl text-blue-200 mb-6">Your Sleep Quality</h2>
                    
                    {/* Circular Sleep Score */}
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#1e3a5f"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#sleepGradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${(sleepScore / 100) * 552.92} 552.92`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl text-white">{sleepScore}</div>
                        <div className="text-blue-300 text-sm">/ 100</div>
                      </div>
                    </div>

                    <div className={`inline-block px-6 py-3 ${sleepQuality.bgColor} ${sleepQuality.color} rounded-full mb-4 border border-blue-500/30`}>
                      {sleepQuality.level}
                    </div>
                    
                    <p className="text-lg text-blue-200 mb-8">
                      {sleepQuality.description}
                    </p>
                  </motion.div>
                </div>

                {/* Locked Section */}
                {!isUnlocked && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-slate-800 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center">
                      <div className="text-center px-4">
                        <Lock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-2xl mb-4 text-white">Unlock Full Sleep Report</h3>
                        <p className="text-blue-200 mb-6">Get your personalized sleep optimization plan</p>
                        <button
                          onClick={handleUnlockClick}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                          Unlock Full Sleep Report – ₹39
                        </button>
                      </div>
                    </div>

                    <div className="blur-sm pointer-events-none space-y-6 p-6 bg-slate-700/30 rounded-2xl border border-blue-600/20">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                          <Sparkles className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-white">Sleep Recovery Score</h4>
                          <p className="text-blue-200">Detailed analysis of how well your sleep restores your body and mind each night.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                          <Sun className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-white">Circadian Rhythm Analysis</h4>
                          <p className="text-blue-200">Understanding your body clock alignment and optimal sleep-wake schedule.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                          <Target className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-white">Personalized Sleep Plan</h4>
                          <p className="text-blue-200">Custom recommendations to optimize your sleep quality and wake up refreshed.</p>
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
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                        <h3 className="text-xl text-green-300">Report Unlocked Successfully!</h3>
                      </div>
                      <p className="text-green-200">Your complete sleep analysis is now available.</p>
                    </div>

                    {/* Sleep Recovery Score */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/30">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                          <Sparkles className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-white">Sleep Recovery Analysis</h4>
                          <div className="space-y-3">
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-blue-600/20">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-blue-200">Physical Recovery Rate</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                  sleepScore >= 70 ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                  sleepScore >= 50 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                  'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}>
                                  {sleepScore >= 70 ? 'Optimal' : sleepScore >= 50 ? 'Moderate' : 'Poor'}
                                </span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${sleepScore}%` }}
                                />
                              </div>
                            </div>
                            <p className="text-blue-200 leading-relaxed">
                              {sleepScore >= 70 
                                ? "Your sleep provides excellent physical recovery. Your body is getting adequate deep sleep phases needed for muscle repair, immune function, and cellular regeneration."
                                : sleepScore >= 50
                                ? "Your sleep provides moderate recovery. While you're getting some restorative sleep, optimizing your sleep duration and timing could significantly improve your physical recovery."
                                : "Your sleep recovery is suboptimal. Your body isn't getting enough deep sleep for proper physical restoration. This can affect muscle recovery, immune function, and overall health."}
                            </p>
                            
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-blue-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <Moon className="h-4 w-4 text-blue-400" />
                                Sleep Architecture Estimate
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-blue-200">
                                  <span>Deep Sleep (Stage 3-4)</span>
                                  <span className="text-white">{sleepScore >= 70 ? '20-25%' : sleepScore >= 50 ? '12-18%' : '8-12%'}</span>
                                </div>
                                <div className="flex justify-between text-blue-200">
                                  <span>REM Sleep</span>
                                  <span className="text-white">{sleepScore >= 70 ? '22-25%' : sleepScore >= 50 ? '15-20%' : '10-15%'}</span>
                                </div>
                                <div className="flex justify-between text-blue-200">
                                  <span>Light Sleep</span>
                                  <span className="text-white">{sleepScore >= 70 ? '50-55%' : sleepScore >= 50 ? '55-65%' : '60-70%'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Circadian Rhythm Analysis */}
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/30">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-400/30">
                          <Sun className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-white">Circadian Rhythm Assessment</h4>
                          <div className="space-y-3">
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-indigo-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <Clock className="h-4 w-4 text-indigo-400" />
                                Body Clock Alignment
                              </h5>
                              <p className="text-sm text-blue-200">
                                {formData.sleepTiming === 'before-10' || formData.sleepTiming === '10-11'
                                  ? "Excellent! Your sleep timing aligns well with natural circadian rhythms. Going to bed before 11 PM allows your body to maximize melatonin production and deep sleep phases."
                                  : formData.sleepTiming === '11-12'
                                  ? "Good alignment. Your bedtime is acceptable, though going to bed 30-60 minutes earlier could improve sleep quality and morning alertness."
                                  : "Your sleep timing is misaligned with natural circadian rhythms. Late bedtimes reduce deep sleep quality and can cause morning grogginess, affecting daily performance."}
                              </p>
                            </div>
                            
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-indigo-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <Sun className="h-4 w-4 text-yellow-400" />
                                Optimal Sleep Window
                              </h5>
                              <p className="text-sm text-blue-200 mb-3">
                                Based on circadian science, your ideal sleep schedule:
                              </p>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                                  <div className="text-blue-300 mb-1">Bedtime</div>
                                  <div className="text-white text-lg">10:00 PM</div>
                                </div>
                                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                                  <div className="text-blue-300 mb-1">Wake Time</div>
                                  <div className="text-white text-lg">6:00 AM</div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-slate-700/30 rounded-lg p-4 border border-indigo-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-purple-400" />
                                Sleep Disruptors Impact
                              </h5>
                              <div className="space-y-2">
                                {(formData.screenTime === '60-120' || formData.screenTime === 'more-120') && (
                                  <div className="flex items-start gap-2 text-sm text-blue-200">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>High screen time before bed suppresses melatonin by 50-85%, delaying sleep onset by 30-90 minutes.</span>
                                  </div>
                                )}
                                {(formData.caffeineIntake === 'evening' || formData.caffeineIntake === 'night') && (
                                  <div className="flex items-start gap-2 text-sm text-blue-200">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Late caffeine consumption blocks adenosine (sleep chemical) for 6-8 hours, reducing deep sleep by 20-40%.</span>
                                  </div>
                                )}
                                {parseInt(formData.nightAwakenings) >= 2 && (
                                  <div className="flex items-start gap-2 text-sm text-blue-200">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>Frequent night awakenings fragment sleep cycles, preventing deep sleep and REM consolidation.</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Personalized Sleep Plan */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                          <Target className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-white">Your Personalized Sleep Optimization Plan</h4>
                          <div className="space-y-3">
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Sleep Schedule Optimization
                              </h5>
                              <p className="text-sm text-blue-200 mb-2">
                                {formData.sleepDuration === '7-8' || formData.sleepDuration === '8-9'
                                  ? "Maintain your current sleep duration—it's ideal! Focus on consistency: go to bed and wake up at the same time daily, even on weekends."
                                  : formData.sleepDuration === '6-7' || formData.sleepDuration === '5-6'
                                  ? "Gradually increase sleep duration by 15 minutes each week until reaching 7-8 hours. Start by setting a consistent bedtime 15 minutes earlier."
                                  : "Priority action: Increase sleep to at least 7 hours. Short sleep (<6h) increases disease risk by 300%. Start tonight by going to bed 30 minutes earlier."}
                              </p>
                            </div>
                            
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Digital Hygiene Protocol
                              </h5>
                              <p className="text-sm text-blue-200 mb-2">
                                {formData.screenTime === 'none' || formData.screenTime === 'less-30'
                                  ? "Excellent! Continue avoiding screens 1 hour before bed. Consider reading a book or practicing light stretching instead."
                                  : "Implement the 10-3-2-1-0 rule: No caffeine 10h before bed, no food 3h before, no work 2h before, no screens 1h before, 0 times hitting snooze."}
                              </p>
                              <ul className="text-xs text-blue-300 space-y-1 ml-4">
                                <li>• Use blue light filters after sunset (f.lux, Night Shift)</li>
                                <li>• Keep phone outside bedroom or in airplane mode</li>
                                <li>• Replace scrolling with reading physical books</li>
                              </ul>
                            </div>
                            
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Sleep Environment Setup
                              </h5>
                              <ul className="text-sm text-blue-200 space-y-2">
                                <li className="flex items-start gap-2">
                                  <span className="text-purple-400 flex-shrink-0">→</span>
                                  <span><strong className="text-white">Temperature:</strong> Keep bedroom at 16-19°C (60-67°F) for optimal sleep</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-purple-400 flex-shrink-0">→</span>
                                  <span><strong className="text-white">Darkness:</strong> Use blackout curtains or sleep mask—even small light disrupts melatonin</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-purple-400 flex-shrink-0">→</span>
                                  <span><strong className="text-white">Sound:</strong> Use white noise machine or earplugs if needed</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Caffeine Management
                              </h5>
                              <p className="text-sm text-blue-200">
                                {formData.caffeineIntake === 'none' || formData.caffeineIntake === 'morning'
                                  ? "Perfect timing! Morning caffeine supports natural cortisol rhythm without disrupting sleep."
                                  : formData.caffeineIntake === 'afternoon'
                                  ? "Move last caffeine intake to before 2 PM. Caffeine has a 5-6 hour half-life—afternoon coffee can still affect 10 PM sleep."
                                  : "Critical: Stop caffeine after 12 PM. Evening/night caffeine reduces deep sleep by 40% even if you 'fall asleep normally.' Switch to herbal tea after lunch."}
                              </p>
                            </div>

                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Wind-Down Routine (60 min before bed)
                              </h5>
                              <div className="text-sm text-blue-200 space-y-2">
                                <p className="mb-2">Create a consistent pre-sleep ritual to signal your body it's time for rest:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                  <div className="bg-blue-500/10 rounded p-2 border border-blue-500/20">
                                    <strong className="text-white">60 min:</strong> Dim lights, set phone away
                                  </div>
                                  <div className="bg-blue-500/10 rounded p-2 border border-blue-500/20">
                                    <strong className="text-white">45 min:</strong> Light stretching or reading
                                  </div>
                                  <div className="bg-blue-500/10 rounded p-2 border border-blue-500/20">
                                    <strong className="text-white">30 min:</strong> Warm shower (drops body temp)
                                  </div>
                                  <div className="bg-blue-500/10 rounded p-2 border border-blue-500/20">
                                    <strong className="text-white">15 min:</strong> Breathing exercises or meditation
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-slate-700/30 rounded-lg p-4 border border-purple-600/20">
                              <h5 className="text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                Morning Routine for Better Sleep Tonight
                              </h5>
                              <ul className="text-sm text-blue-200 space-y-1">
                                <li>• Get 10-30 min sunlight within 30-60 min of waking (resets circadian clock)</li>
                                <li>• Exercise in morning/afternoon (not within 3h of bedtime)</li>
                                <li>• Avoid naps after 3 PM or limit to 20 minutes</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* When to Seek Help */}
                    {sleepScore < 50 && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-lg mb-2 text-white">Consider Professional Help</h4>
                            <p className="text-red-200 mb-3">
                              Your sleep quality score suggests you may benefit from professional evaluation, especially if you experience:
                            </p>
                            <ul className="text-sm text-red-200 space-y-1 ml-4">
                              <li>• Chronic daytime sleepiness despite adequate time in bed</li>
                              <li>• Loud snoring or gasping during sleep (possible sleep apnea)</li>
                              <li>• Difficulty falling asleep for more than 30 minutes regularly</li>
                              <li>• Persistent insomnia lasting more than 3 months</li>
                            </ul>
                            <p className="text-sm text-red-200 mt-3">
                              Consult a sleep specialist or your primary care physician for a comprehensive sleep study if these issues persist.
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
                    className="px-8 py-3 border border-blue-500/30 rounded-xl hover:bg-slate-700/50 transition-colors text-blue-200"
                  >
                    Take Test Again
                  </button>
                  <Link
                    to="/"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all text-center"
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isProcessing && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-blue-700/30"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl text-white">Unlock Sleep Report</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 mb-6 border border-blue-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200">Full Sleep Analysis</span>
                  <span className="text-2xl text-white">₹39</span>
                </div>
                <p className="text-sm text-blue-300">One-time payment • Instant access</p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-700/30 hover:border-blue-600/50 bg-slate-700/30'
                  }`}
                >
                  <Smartphone className="h-5 w-5 text-blue-400" />
                  <span className="text-white">UPI / QR Code</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-700/30 hover:border-blue-600/50 bg-slate-700/30'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-700/30 hover:border-blue-600/50 bg-slate-700/30'
                  }`}
                >
                  <Wallet className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Paytm / PhonePe</span>
                </button>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

              <p className="text-xs text-blue-300 text-center mt-4">
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
            <NextTestPrompt currentTestId={TEST_IDS.SLEEP} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}
