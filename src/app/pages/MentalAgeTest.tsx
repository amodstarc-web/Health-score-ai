import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, CheckCircle2, ArrowRight, CreditCard, Smartphone, Wallet, X, Brain, Sparkles, Zap, Target, TrendingUp, Lightbulb, Users, Moon, Coffee, Smile, PartyPopper } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface MentalAgeFormData {
  realAge: string;
  decisionMaking: string;
  socialHabits: string;
  sleepPatterns: string;
  learningHabits: string;
  stressReaction: string;
}

export default function MentalAgeTest() {
  const [formData, setFormData] = useState<MentalAgeFormData>({
    realAge: '',
    decisionMaking: '',
    socialHabits: '',
    sleepPatterns: '',
    learningHabits: '',
    stressReaction: '',
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
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.MENTAL_AGE);
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
    const mentalAge = calculateMentalAge();
    markTestCompleted(TEST_IDS.MENTAL_AGE, 'Mental Age Test', parseFloat(mentalAge.toFixed(0)), isUnlocked);
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
      markTestUnlocked(TEST_IDS.MENTAL_AGE);
      
      // Update the completion with unlocked status
      const mentalAge = calculateMentalAge();
      markTestCompleted(TEST_IDS.MENTAL_AGE, 'Mental Age Test', parseFloat(mentalAge.toFixed(0)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      realAge: '',
      decisionMaking: '',
      socialHabits: '',
      sleepPatterns: '',
      learningHabits: '',
      stressReaction: '',
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

  // Calculate Mental Age
  const calculateMentalAge = () => {
    const realAge = parseInt(formData.realAge) || 30;
    let ageModifier = 0;

    // Decision making style affects age by -10 to +15
    const decisionPoints: { [key: string]: number } = {
      'impulsive': -8,
      'quick-intuitive': -4,
      'balanced': 0,
      'analytical': +6,
      'overthinking': +12,
    };
    ageModifier += decisionPoints[formData.decisionMaking] || 0;

    // Social habits affect age by -8 to +12
    const socialPoints: { [key: string]: number } = {
      'party-lover': -8,
      'active-social': -4,
      'selective': +2,
      'small-groups': +6,
      'prefer-alone': +10,
    };
    ageModifier += socialPoints[formData.socialHabits] || 0;

    // Sleep patterns affect age by -5 to +10
    const sleepPoints: { [key: string]: number } = {
      'night-owl': -5,
      'irregular': 0,
      'regular': +2,
      'early-bird': +8,
      'very-early': +10,
    };
    ageModifier += sleepPoints[formData.sleepPatterns] || 0;

    // Learning habits affect age by -10 to +8
    const learningPoints: { [key: string]: number } = {
      'trendy': -10,
      'digital-first': -6,
      'mixed': 0,
      'traditional': +4,
      'slow-steady': +8,
    };
    ageModifier += learningPoints[formData.learningHabits] || 0;

    // Stress reaction affects age by -6 to +12
    const stressPoints: { [key: string]: number } = {
      'ignore': -6,
      'adapt-quick': -2,
      'take-time': +4,
      'worry-lot': +8,
      'overwhelmed': +12,
    };
    ageModifier += stressPoints[formData.stressReaction] || 0;

    const mentalAge = Math.max(16, Math.min(75, realAge + ageModifier));
    return Math.round(mentalAge);
  };

  const mentalAge = calculateMentalAge();
  const realAge = parseInt(formData.realAge) || 30;
  const ageDifference = mentalAge - realAge;
  
  const getAgeComparison = () => {
    if (ageDifference > 10) {
      return {
        text: 'Your thinking pattern is significantly older than your real age.',
        color: 'text-purple-700',
        emoji: '🧓',
        bgColor: 'bg-purple-100',
      };
    } else if (ageDifference > 3) {
      return {
        text: 'Your thinking pattern is older than your real age.',
        color: 'text-blue-700',
        emoji: '🤔',
        bgColor: 'bg-blue-100',
      };
    } else if (ageDifference < -10) {
      return {
        text: 'Your thinking pattern is much younger than your real age!',
        color: 'text-pink-700',
        emoji: '🎉',
        bgColor: 'bg-pink-100',
      };
    } else if (ageDifference < -3) {
      return {
        text: 'Your thinking pattern is younger than your real age!',
        color: 'text-green-700',
        emoji: '✨',
        bgColor: 'bg-green-100',
      };
    } else {
      return {
        text: 'Your mental age matches your real age perfectly.',
        color: 'text-teal-700',
        emoji: '🎯',
        bgColor: 'bg-teal-100',
      };
    }
  };

  const ageComparison = getAgeComparison();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
            </Link>
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Viral Personality Quiz</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              What Is Your<br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Mental Age?
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your real mental age might surprise you.
            </p>

            <button
              onClick={handleStartTest}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">Take The Test</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Fun Icons */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm transform hover:scale-105 transition-transform">
                <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Thinking Style</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm transform hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Social Patterns</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm transform hover:scale-105 transition-transform">
                <Lightbulb className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Learning Style</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm transform hover:scale-105 transition-transform">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">Quick Results</p>
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
            <div className="text-center mb-8">
              <h2 className="text-3xl mb-3 text-gray-900">
                Answer 5 Quick Questions
              </h2>
              <p className="text-gray-600">This takes less than 2 minutes!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Real Age */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <PartyPopper className="inline h-4 w-4 mr-2 text-purple-600" />
                  Your Real Age
                </label>
                <input
                  type="number"
                  name="realAge"
                  value={formData.realAge}
                  onChange={handleInputChange}
                  required
                  min="10"
                  max="100"
                  placeholder="Enter your age"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Decision Making Style */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Brain className="inline h-4 w-4 mr-2 text-purple-600" />
                  How do you make decisions?
                </label>
                <select
                  name="decisionMaking"
                  value={formData.decisionMaking}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your style</option>
                  <option value="impulsive">Impulsive - I go with my gut instantly</option>
                  <option value="quick-intuitive">Quick & Intuitive - Fast but thoughtful</option>
                  <option value="balanced">Balanced - I weigh pros and cons</option>
                  <option value="analytical">Analytical - I research thoroughly</option>
                  <option value="overthinking">Overthinking - I analyze everything deeply</option>
                </select>
              </div>

              {/* Social Habits */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Users className="inline h-4 w-4 mr-2 text-pink-600" />
                  What are your social habits?
                </label>
                <select
                  name="socialHabits"
                  value={formData.socialHabits}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your habits</option>
                  <option value="party-lover">Party Lover - Always out with friends</option>
                  <option value="active-social">Active Social - Regular hangouts</option>
                  <option value="selective">Selective - Only close friends</option>
                  <option value="small-groups">Small Groups - Prefer intimate gatherings</option>
                  <option value="prefer-alone">Prefer Alone - I enjoy solitude most</option>
                </select>
              </div>

              {/* Sleep Patterns */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Moon className="inline h-4 w-4 mr-2 text-blue-600" />
                  What's your sleep pattern?
                </label>
                <select
                  name="sleepPatterns"
                  value={formData.sleepPatterns}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your pattern</option>
                  <option value="night-owl">Night Owl - Sleep after 2 AM</option>
                  <option value="irregular">Irregular - No fixed schedule</option>
                  <option value="regular">Regular - Consistent sleep times</option>
                  <option value="early-bird">Early Bird - Sleep by 10 PM</option>
                  <option value="very-early">Very Early - Sleep by 9 PM</option>
                </select>
              </div>

              {/* Learning Habits */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Lightbulb className="inline h-4 w-4 mr-2 text-yellow-600" />
                  How do you prefer to learn?
                </label>
                <select
                  name="learningHabits"
                  value={formData.learningHabits}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your preference</option>
                  <option value="trendy">Trendy - TikTok, Reels, short videos</option>
                  <option value="digital-first">Digital First - Online courses, YouTube</option>
                  <option value="mixed">Mixed - Both digital and traditional</option>
                  <option value="traditional">Traditional - Books and structured learning</option>
                  <option value="slow-steady">Slow & Steady - Deep, focused study</option>
                </select>
              </div>

              {/* Reaction to Stress */}
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Coffee className="inline h-4 w-4 mr-2 text-orange-600" />
                  How do you react to stress?
                </label>
                <select
                  name="stressReaction"
                  value={formData.stressReaction}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your reaction</option>
                  <option value="ignore">Ignore It - "It'll work out"</option>
                  <option value="adapt-quick">Adapt Quickly - I handle it fast</option>
                  <option value="take-time">Take Time - I process it gradually</option>
                  <option value="worry-lot">Worry a Lot - It bothers me</option>
                  <option value="overwhelmed">Get Overwhelmed - I struggle with it</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-6 rounded-xl text-lg"
              >
                Reveal My Mental Age 🎯
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <div className="text-6xl mb-4">{ageComparison.emoji}</div>
                    <h2 className="text-2xl text-gray-600 mb-4">Your Mental Age</h2>
                    
                    <div className="relative inline-block">
                      <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        {mentalAge}
                      </div>
                      <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                        <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                      </div>
                    </div>

                    <div className={`inline-block px-6 py-3 ${ageComparison.bgColor} ${ageComparison.color} rounded-full mb-6 text-lg`}>
                      {ageDifference > 0 ? `+${ageDifference}` : ageDifference} years from your real age
                    </div>
                    
                    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                      {ageComparison.text}
                    </p>

                    {/* Age Comparison Visual */}
                    <div className="max-w-md mx-auto mb-8">
                      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-700">{realAge}</div>
                            <div className="text-sm text-gray-600">Real Age</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{mentalAge}</div>
                            <div className="text-sm text-gray-600">Mental Age</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Locked Section */}
                {!isUnlocked && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center">
                      <div className="text-center px-4">
                        <Lock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-2xl mb-4 text-gray-900">Unlock Full Analysis</h3>
                        <p className="text-gray-600 mb-6">Discover your complete personality profile</p>
                        <button
                          onClick={handleUnlockClick}
                          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          Unlock for ₹29 🎉
                        </button>
                      </div>
                    </div>

                    <div className="blur-sm pointer-events-none space-y-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Deep Personality Analysis</h4>
                          <p className="text-gray-600">Detailed breakdown of your psychological profile, cognitive patterns, and behavioral tendencies.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Zap className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Your Mental Strengths</h4>
                          <p className="text-gray-600">Discover your unique cognitive abilities and how your mental age influences your decision-making.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg mb-2 text-gray-900">Cognitive Improvement Tips</h4>
                          <p className="text-gray-600">Personalized strategies to optimize your mental performance and thinking patterns.</p>
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
                        <h3 className="text-xl text-green-900">Full Report Unlocked!</h3>
                      </div>
                      <p className="text-green-700">Your complete mental age analysis is now available.</p>
                    </div>

                    {/* Personality Analysis */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Brain className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Deep Personality Analysis</h4>
                          <div className="space-y-3">
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <Target className="h-4 w-4 text-purple-600" />
                                Decision Making Profile
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.decisionMaking === 'impulsive' || formData.decisionMaking === 'quick-intuitive'
                                  ? "You have a youthful, spontaneous approach to decisions. This keeps you adaptable and quick to seize opportunities, though sometimes you might benefit from deeper analysis."
                                  : formData.decisionMaking === 'analytical' || formData.decisionMaking === 'overthinking'
                                  ? "You exhibit a mature, thoughtful decision-making style. This wisdom helps you avoid mistakes, though it may sometimes slow down your response to time-sensitive situations."
                                  : "You've found a balanced approach to decision-making, combining intuition with analysis. This versatility serves you well across different situations."}
                              </p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <Users className="h-4 w-4 text-pink-600" />
                                Social Personality Type
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.socialHabits === 'party-lover' || formData.socialHabits === 'active-social'
                                  ? "Your vibrant social energy reflects a youthful spirit. You thrive on connections and group dynamics, drawing energy from social interactions."
                                  : formData.socialHabits === 'prefer-alone' || formData.socialHabits === 'small-groups'
                                  ? "You prefer quality over quantity in relationships, showing a mature understanding of meaningful connections. Your introspective nature allows for deep self-reflection."
                                  : "You balance social engagement with personal time effectively, showing emotional intelligence in managing your social energy."}
                              </p>
                            </div>

                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <Moon className="h-4 w-4 text-blue-600" />
                                Lifestyle Rhythm
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.sleepPatterns === 'night-owl' || formData.sleepPatterns === 'irregular'
                                  ? "Your flexible sleep schedule suggests a younger, more spontaneous lifestyle. While this offers freedom, establishing some routine could enhance your wellbeing."
                                  : formData.sleepPatterns === 'early-bird' || formData.sleepPatterns === 'very-early'
                                  ? "Your disciplined sleep routine reflects maturity and self-care awareness. This consistency supports optimal cognitive function and emotional stability."
                                  : "You maintain a healthy balance in your sleep patterns, showing good self-regulation and understanding of your body's needs."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mental Strengths */}
                    <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Zap className="h-6 w-6 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Your Mental Strengths</h4>
                          <div className="space-y-3">
                            {ageDifference < 0 ? (
                              <>
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Sparkles className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Youthful Adaptability</p>
                                    <p className="text-sm text-gray-600">You excel at embracing change and learning new skills quickly.</p>
                                  </div>
                                </div>
                                
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Zap className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">High Energy & Enthusiasm</p>
                                    <p className="text-sm text-gray-600">Your vibrant approach to life keeps you motivated and engaged.</p>
                                  </div>
                                </div>

                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Open-Minded Innovation</p>
                                    <p className="text-sm text-gray-600">You're receptive to new ideas and creative solutions.</p>
                                  </div>
                                </div>
                              </>
                            ) : ageDifference > 0 ? (
                              <>
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Brain className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Wisdom & Experience</p>
                                    <p className="text-sm text-gray-600">You draw on deep insights and learned patterns in your decisions.</p>
                                  </div>
                                </div>
                                
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Target className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Strategic Thinking</p>
                                    <p className="text-sm text-gray-600">Your mature perspective helps you plan effectively for the long-term.</p>
                                  </div>
                                </div>

                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Emotional Stability</p>
                                    <p className="text-sm text-gray-600">You handle challenges with composure and measured responses.</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Target className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Perfect Balance</p>
                                    <p className="text-sm text-gray-600">You blend youthful energy with mature wisdom effectively.</p>
                                  </div>
                                </div>
                                
                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Smile className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Age-Appropriate Thinking</p>
                                    <p className="text-sm text-gray-600">Your mental age alignment suggests authentic self-awareness.</p>
                                  </div>
                                </div>

                                <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                                  <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-gray-900">Versatile Approach</p>
                                    <p className="text-sm text-gray-600">You adapt your thinking style to suit different situations.</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cognitive Improvement Tips */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl mb-3 text-gray-900">Cognitive Improvement Tips</h4>
                          <div className="space-y-3">
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                {ageDifference < -5 ? 'Add Strategic Thinking' : ageDifference > 5 ? 'Embrace Flexibility' : 'Maintain Your Balance'}
                              </h5>
                              <p className="text-sm text-gray-700">
                                {ageDifference < -5
                                  ? "While your youthful approach is energizing, practice taking time to analyze important decisions. Try the '24-hour rule' for major choices."
                                  : ageDifference > 5
                                  ? "Your wisdom is valuable, but don't let analysis lead to paralysis. Set time limits for decisions and trust your intuition more often."
                                  : "Continue balancing spontaneity with reflection. Your current approach is working well across different life situations."}
                              </p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                Optimize Learning Style
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.learningHabits === 'trendy' || formData.learningHabits === 'digital-first'
                                  ? "Complement your digital learning with some deep-dive reading. Spend 20 minutes daily with a book to build sustained focus."
                                  : "Your traditional approach is solid. Consider adding some modern learning tools like podcasts or video courses for variety and efficiency."}
                              </p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                Social-Cognitive Balance
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.socialHabits === 'party-lover' || formData.socialHabits === 'active-social'
                                  ? "Balance your social energy with quiet reflection time. Try 10 minutes of daily journaling to process experiences."
                                  : "Your introspection is valuable. Push yourself to engage socially 1-2 times weekly to stimulate different thinking patterns."}
                              </p>
                            </div>
                            
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                Stress Management
                              </h5>
                              <p className="text-sm text-gray-700">
                                {formData.stressReaction === 'worry-lot' || formData.stressReaction === 'overwhelmed'
                                  ? "Practice mindfulness techniques to reduce stress reactivity. Try the 4-7-8 breathing method when feeling overwhelmed."
                                  : formData.stressReaction === 'ignore'
                                  ? "While your relaxed attitude helps, don't ignore warning signs completely. Regular check-ins with yourself can prevent burnout."
                                  : "Your stress management approach is healthy. Continue using your adaptive strategies and share them with others."}
                              </p>
                            </div>

                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                Brain Health Routine
                              </h5>
                              <p className="text-sm text-gray-700">
                                Keep your brain young: Get 7-9 hours of sleep, exercise 30 minutes daily, eat omega-3 rich foods, learn something new weekly, and maintain social connections. These habits optimize cognitive function at any mental age.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Results CTA */}
                    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-6 text-center">
                      <h4 className="text-xl mb-2 text-gray-900">Share Your Results!</h4>
                      <p className="text-gray-600 mb-4">See how your mental age compares with friends</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <button className="px-6 py-2 bg-white rounded-full text-sm text-gray-700 hover:shadow-md transition-all">
                          📱 Share on WhatsApp
                        </button>
                        <button className="px-6 py-2 bg-white rounded-full text-sm text-gray-700 hover:shadow-md transition-all">
                          📸 Share on Instagram
                        </button>
                        <button className="px-6 py-2 bg-white rounded-full text-sm text-gray-700 hover:shadow-md transition-all">
                          🐦 Share on Twitter
                        </button>
                      </div>
                    </div>
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
                  <Link
                    to="/"
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all text-center"
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
                <h3 className="text-2xl text-gray-900">Unlock Full Analysis</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isProcessing}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Mental Age Report</span>
                  <span className="text-2xl text-gray-900">₹29</span>
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
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  'Pay ₹29'
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
            <NextTestPrompt currentTestId={TEST_IDS.MENTAL_AGE} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}
