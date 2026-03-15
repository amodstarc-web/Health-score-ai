import { useState, useRef, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { HealthMetrics } from '../components/HealthMetrics';
import { HealthTestForm } from '../components/HealthTestForm';
import { HealthResults } from '../components/HealthResults';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { BestFoodsCTA } from '../components/BestFoodsCTA';
import { DietPlanCTA } from '../components/DietPlanCTA';
import { SubscriptionCTA } from '../components/SubscriptionCTA';
import { CredentialsSection } from '../components/CredentialsSection';
import { TrustBadges } from '../components/TrustBadges';
import { DailyHealthTools } from '../components/DailyHealthTools';
import { SEO } from '../components/SEO';
import { Chatbot } from '../components/Chatbot';
import { LiveNotifications } from '../components/LiveNotifications';
import { addUserNotification } from '../utils/notificationTracking';
import { Heart, Apple, Activity, Sunrise, HeartPulse, ChevronDown, Brain, Sparkles, Moon, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';

interface FormData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  activityLevel: string;
  sleepHours: string;
  smoking: string;
  state: string;
}

export default function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showTestsDropdown, setShowTestsDropdown] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStartTest = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowResults(true);
    
    // Add user notification with name and state
    addUserNotification(data.name, data.state, 'Health Score Assessment');
  };

  // Scroll to results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTestsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleReset = () => {
    setShowResults(false);
    setFormData(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
            </Link>
            <div className="flex items-center gap-6">
              {/* Health Tests Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowTestsDropdown(!showTestsDropdown)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Activity className="h-4 w-4" />
                  <span>Health Tests</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showTestsDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showTestsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                    >
                      <Link
                        to="/body-fat-analyzer"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Body Fat Test</div>
                          <div className="text-xs text-gray-500">Analyze body composition</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/longevity-score"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Sunrise className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">Longevity Score</div>
                          <div className="text-xs text-gray-500">Check lifespan potential</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/heart-risk"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <HeartPulse className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium">Heart Risk Checker</div>
                          <div className="text-xs text-gray-500">Assess cardiovascular health</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/stress-level"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Brain className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium">Stress Level Analyzer</div>
                          <div className="text-xs text-gray-500">Check mental wellness</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/mental-age"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <div className="font-medium">Mental Age Test</div>
                          <div className="text-xs text-gray-500">Discover your mental age</div>
                        </div>
                      </Link>
                      
                      <Link
                        to="/sleep-quality"
                        onClick={() => setShowTestsDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                          <Moon className="h-4 w-4 text-blue-300" />
                        </div>
                        <div>
                          <div className="font-medium">Sleep Quality Score</div>
                          <div className="text-xs text-gray-500">Optimize your sleep</div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/best-foods"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Apple className="h-4 w-4" />
                <span className="hidden sm:inline">Best Foods</span>
              </Link>
              <a
                href="#daily-tools"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('daily-tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Daily Tools</span>
              </a>
              <Link
                to="/subscription"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                <Sunrise className="h-4 w-4" />
                <span>Subscribe</span>
              </Link>
              <button
                onClick={handleStartTest}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection onStartTest={handleStartTest} />
        <TrustBadges />
        <HowItWorks />
        <DailyHealthTools />
        <DietPlanCTA />
        <BestFoodsCTA />
        <HealthMetrics />
        <div ref={formRef}>
          <HealthTestForm onSubmit={handleFormSubmit} />
        </div>
        
        {/* Results Section - Appears Below Form */}
        <AnimatePresence>
          {showResults && formData && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <HealthResults formData={formData} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <SubscriptionCTA />
        <Testimonials />
        <CredentialsSection />
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Chatbot */}
      <Chatbot />
      <LiveNotifications />
    </div>
  );
}