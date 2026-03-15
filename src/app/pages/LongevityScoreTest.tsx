import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Lock, CheckCircle2, TrendingUp, User, Ruler, Weight, ArrowRight, Shield, Zap, Target, CreditCard, Smartphone, Wallet, X, Brain, Sunrise, Moon, Cigarette, AlertCircle, Utensils, Timer } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { generatePDFReport as generatePDF } from '../utils/pdfGenerator';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface LongevityFormData {
  age: string;
  height: string;
  weight: string;
  exercise: string;
  sleep: string;
  smoking: string;
  stress: string;
  diet: string;
}

export default function LongevityScoreTest() {
  const [formData, setFormData] = useState<LongevityFormData>({
    age: '',
    height: '',
    weight: '',
    exercise: '',
    sleep: '',
    smoking: '',
    stress: '',
    diet: '',
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
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.LONGEVITY);
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
    const score = calculateLongevityScore();
    markTestCompleted(TEST_IDS.LONGEVITY, 'Longevity Score', parseFloat(score.toFixed(0)), isUnlocked);
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
      markTestUnlocked(TEST_IDS.LONGEVITY);
      
      // Update the completion with unlocked status
      const score = calculateLongevityScore();
      markTestCompleted(TEST_IDS.LONGEVITY, 'Longevity Score', parseFloat(score.toFixed(0)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      age: '',
      height: '',
      weight: '',
      exercise: '',
      sleep: '',
      smoking: '',
      stress: '',
      diet: '',
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

  // Calculate Longevity Score
  const calculateLongevityScore = () => {
    let score = 50; // Base score
    const age = parseInt(formData.age);

    // Age factor (younger = better baseline)
    if (age < 30) score += 10;
    else if (age < 40) score += 8;
    else if (age < 50) score += 5;
    else if (age < 60) score += 2;
    else if (age >= 70) score -= 5;

    // BMI calculation
    const heightInM = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);
    const bmi = weight / (heightInM * heightInM);
    
    if (bmi >= 18.5 && bmi < 25) score += 12;
    else if (bmi >= 25 && bmi < 30) score += 5;
    else if (bmi < 18.5 || bmi >= 30) score -= 8;

    // Exercise frequency
    const exerciseScore: { [key: string]: number } = {
      'daily': 15,
      '4-6': 12,
      '2-3': 8,
      '1': 4,
      'none': -10,
    };
    score += exerciseScore[formData.exercise] || 0;

    // Sleep hours
    const sleepHours = parseFloat(formData.sleep);
    if (sleepHours >= 7 && sleepHours <= 9) score += 12;
    else if (sleepHours >= 6 && sleepHours < 7) score += 6;
    else if (sleepHours >= 5 && sleepHours < 6) score += 2;
    else score -= 8;

    // Smoking
    const smokingScore: { [key: string]: number } = {
      'never': 15,
      'former': 5,
      'occasional': -5,
      'regular': -20,
    };
    score += smokingScore[formData.smoking] || 0;

    // Stress level
    const stressScore: { [key: string]: number } = {
      'low': 10,
      'moderate': 5,
      'high': -5,
      'very-high': -12,
    };
    score += stressScore[formData.stress] || 0;

    // Diet quality
    const dietScore: { [key: string]: number } = {
      'excellent': 15,
      'good': 10,
      'average': 5,
      'poor': -8,
    };
    score += dietScore[formData.diet] || 0;

    return Math.max(20, Math.min(100, Math.round(score)));
  };

  const longevityScore = showResults ? calculateLongevityScore() : 0;

  const getLongevityStatus = () => {
    if (longevityScore >= 85) return { status: 'Exceptional', color: 'text-green-600', bgColor: 'bg-green-50', message: 'Your lifestyle choices are outstanding!' };
    if (longevityScore >= 75) return { status: 'Excellent', color: 'text-blue-600', bgColor: 'bg-blue-50', message: 'You\'re on a great path to longevity!' };
    if (longevityScore >= 65) return { status: 'Good', color: 'text-cyan-600', bgColor: 'bg-cyan-50', message: 'Your habits support healthy aging.' };
    if (longevityScore >= 50) return { status: 'Average', color: 'text-gray-600', bgColor: 'bg-gray-50', message: 'Room for improvement in key areas.' };
    if (longevityScore >= 35) return { status: 'Below Average', color: 'text-orange-600', bgColor: 'bg-orange-50', message: 'Consider making lifestyle changes.' };
    return { status: 'At Risk', color: 'text-red-600', bgColor: 'bg-red-50', message: 'Immediate lifestyle improvements needed.' };
  };

  const getPercentile = () => {
    // Simple percentile calculation based on score
    return Math.max(15, Math.min(95, Math.round((longevityScore - 20) * 1.2)));
  };

  const longevityStatus = getLongevityStatus();
  const percentile = getPercentile();

  const generatePDFReport = (formData: LongevityFormData, longevityScore: number, longevityStatus: any, percentile: number) => {
    const nutritionRecommendations = getNutritionRecommendations();
    const biologicalAge = Math.max(18, parseInt(formData.age) - Math.floor((longevityScore - 50) / 5));
    
    generatePDF({
      testName: 'Longevity Score Report',
      score: `${longevityScore}/100 (${longevityStatus.status})`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      sections: [
        {
          title: 'Your Longevity Assessment',
          content: [
            `Longevity Score: ${longevityScore}/100`,
            `Health Status: ${longevityStatus.status}`,
            `Percentile: ${percentile}th - Healthier than ${percentile}% of people your age`,
            `Biological Age: ${biologicalAge} years (vs chronological age: ${formData.age} years)`,
          ],
        },
        {
          title: 'Anti-Aging Nutrition Plan',
          content: nutritionRecommendations,
        },
        {
          title: 'Lifestyle Impact Analysis',
          content: [
            `Exercise Frequency: ${formData.exercise} - ${formData.exercise === 'daily' ? 'Excellent! Reduces mortality risk by 30%' : formData.exercise === 'none' ? 'Critical area for improvement' : 'Good, but can be optimized'}`,
            `Sleep Quality: ${formData.sleep} hours - ${parseFloat(formData.sleep) >= 7 && parseFloat(formData.sleep) <= 9 ? 'Optimal for cellular repair' : 'Needs adjustment for longevity'}`,
            `Smoking Status: ${formData.smoking} - ${formData.smoking === 'never' ? 'Major positive factor (+10-15 years)' : 'Significant life-shortening factor'}`,
            `Stress Management: ${formData.stress} - ${formData.stress === 'low' ? 'Excellent stress control' : 'High stress accelerates cellular aging'}`,
            `Diet Quality: ${formData.diet} - ${formData.diet === 'excellent' ? 'Anti-inflammatory diet supports longevity' : 'Dietary improvements needed'}`,
          ],
        },
        {
          title: 'Life-Extension Strategies',
          content: [
            'Exercise: Aim for 150 min moderate aerobic + 75 min vigorous weekly + 2x strength training',
            'Caloric Restriction: Mild calorie restriction (10-15%) may extend lifespan',
            'Intermittent Fasting: 16:8 or 14:10 fasting window supports autophagy (cellular cleanup)',
            'Sleep: Maintain 7-9 hours nightly in complete darkness for optimal melatonin',
            'Stress: Practice daily meditation, yoga, or deep breathing for 20 minutes',
            'Social Connections: Strong relationships add 3-5 years to lifespan',
            'Purpose: Having life purpose associated with 30% lower mortality risk',
            'Regular Health Screenings: Early detection critical for chronic disease prevention',
          ],
        },
      ],
    });
  };

  const getNutritionRecommendations = (): string[] => {
    const recommendations: string[] = [];

    // Anti-aging superfoods to ADD
    recommendations.push('ADD: Leafy greens - Spinach, kale, collards (rich in folate, vitamin K for brain health)');
    recommendations.push('ADD: Berries - Blueberries, strawberries, blackberries (antioxidants fight cellular aging)');
    recommendations.push('ADD: Fatty fish - Salmon, mackerel, sardines (omega-3 for heart and brain longevity)');
    recommendations.push('ADD: Nuts and seeds - Walnuts, almonds, flaxseeds (reduce inflammation, support cognition)');
    recommendations.push('ADD: Olive oil - Extra virgin, cold-pressed (polyphenols for cardiovascular health)');
    recommendations.push('ADD: Cruciferous vegetables - Broccoli, cauliflower, Brussels sprouts (cancer-fighting compounds)');
    recommendations.push('ADD: Green tea - 2-4 cups daily (EGCG antioxidant, anti-aging properties)');
    recommendations.push('ADD: Dark chocolate - 70%+ cocoa (flavonoids for heart and cognitive function)');
    recommendations.push('ADD: Legumes - Lentils, chickpeas, black beans (fiber, protein, longevity staple)');
    recommendations.push('ADD: Turmeric - With black pepper (curcumin reduces inflammation)');
    recommendations.push('ADD: Tomatoes - Cooked with olive oil (lycopene for cellular protection)');
    recommendations.push('ADD: Fermented foods - Yogurt, kefir, kimchi, sauerkraut (gut health = longevity)');

    // Foods to AVOID for longevity
    recommendations.push('AVOID: Processed meats - Bacon, sausages, deli meats (linked to cancer, heart disease)');
    recommendations.push('AVOID: Refined sugars - Candies, sodas, pastries (accelerates aging, glycation)');
    recommendations.push('AVOID: Trans fats - Margarine, fried foods, packaged baked goods (inflammation, heart disease)');
    recommendations.push('AVOID: Excessive red meat - Limit to 1-2 servings weekly (high saturated fat)');
    recommendations.push('AVOID: High-sodium foods - Processed snacks, canned soups (hypertension risk)');
    recommendations.push('AVOID: Artificial sweeteners - Some linked to metabolic issues');
    recommendations.push('AVOID: Excessive alcohol - More than 1 drink/day (women) or 2/day (men)');
    recommendations.push('AVOID: Deep-fried foods - High in AGEs (Advanced Glycation End products = aging)');
    recommendations.push('AVOID: High-fructose corn syrup - Found in sodas, processed foods (metabolic harm)');
    recommendations.push('AVOID: Charred/burnt foods - Contain carcinogens from high-heat cooking');

    // Lifestyle-specific recommendations
    if (formData.exercise === 'none' || formData.exercise === '1') {
      recommendations.push('ADD: Protein timing - 20-30g protein within 2 hours of exercise to build muscle');
      recommendations.push('ADD: Beetroot juice - Improves exercise performance and blood flow');
    }

    if (parseFloat(formData.sleep) < 7) {
      recommendations.push('ADD: Tart cherry juice - Natural melatonin for better sleep');
      recommendations.push('ADD: Magnesium-rich foods - Pumpkin seeds, spinach, dark chocolate for sleep quality');
      recommendations.push('AVOID: Caffeine after 2 PM - Disrupts sleep architecture');
    }

    if (formData.smoking === 'regular' || formData.smoking === 'occasional') {
      recommendations.push('ADD: Vitamin C foods - Oranges, bell peppers, kiwi (repairs smoking damage)');
      recommendations.push('ADD: Cruciferous vegetables - Help detoxify carcinogens from smoking');
    }

    if (formData.stress === 'high' || formData.stress === 'very-high') {
      recommendations.push('ADD: Adaptogenic herbs - Ashwagandha tea, holy basil for stress resilience');
      recommendations.push('ADD: Omega-3 fatty acids - Reduces cortisol and stress-induced inflammation');
      recommendations.push('AVOID: Excessive caffeine - Can amplify stress hormones');
    }

    // General longevity nutrition principles
    recommendations.push('ADD: Hydration - 8-10 glasses water daily, more if active (cellular function)');
    recommendations.push('ADD: Colorful vegetables - "Eat the rainbow" for diverse phytonutrients');
    recommendations.push('ADD: Whole grains - Quinoa, oats, brown rice (fiber for gut and heart health)');
    recommendations.push('AVOID: Late-night eating - Stop eating 3 hours before bedtime (supports autophagy)');
    recommendations.push('ADD: Mediterranean or Okinawan diet patterns - Blue Zone longevity diets');

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-white">
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
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Button
                onClick={handleStartTest}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                Start Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
                <Sunrise className="h-4 w-4" />
                <span className="text-sm">AI-Powered Longevity Analysis</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6">
                Discover Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Longevity Score
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                See how your lifestyle impacts your long-term health and aging.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handleStartTest}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  Check My Longevity Score
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Science-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Instant Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Actionable Insights</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Longevity Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12">
                {/* Longevity Timeline Visualization */}
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  {/* Central Circle - Life Expectancy */}
                  <circle cx="200" cy="200" r="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
                  <text x="200" y="190" textAnchor="middle" fill="#3b82f6" fontSize="24" fontWeight="bold">
                    Longevity
                  </text>
                  <text x="200" y="215" textAnchor="middle" fill="#3b82f6" fontSize="18">
                    Score
                  </text>
                  
                  {/* Surrounding Lifestyle Factors */}
                  {/* Exercise */}
                  <circle cx="320" cy="120" r="40" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  <text x="320" y="125" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">
                    Exercise
                  </text>
                  
                  {/* Sleep */}
                  <circle cx="350" cy="250" r="40" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                  <text x="350" y="255" textAnchor="middle" fill="#4f46e5" fontSize="12" fontWeight="bold">
                    Sleep
                  </text>
                  
                  {/* Diet */}
                  <circle cx="270" cy="340" r="40" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                  <text x="270" y="345" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold">
                    Diet
                  </text>
                  
                  {/* Stress */}
                  <circle cx="130" cy="340" r="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
                  <text x="130" y="345" textAnchor="middle" fill="#db2777" fontSize="12" fontWeight="bold">
                    Stress
                  </text>
                  
                  {/* Smoking */}
                  <circle cx="50" cy="250" r="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                  <text x="50" y="255" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
                    Smoking
                  </text>
                  
                  {/* Weight */}
                  <circle cx="80" cy="120" r="40" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="80" y="125" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="bold">
                    Weight
                  </text>
                  
                  {/* Connection Lines */}
                  <line x1="200" y1="200" x2="320" y2="120" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="350" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="270" y2="340" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="130" y2="340" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="50" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="80" y2="120" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">AI Powered</div>
                    <div className="text-sm text-gray-900">Analysis</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Improve</div>
                    <div className="text-sm text-gray-900">Lifespan</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Discover your longevity potential in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Share Your Lifestyle',
                description: 'Answer questions about exercise, sleep, diet, stress, and daily habits',
                icon: User,
                color: 'blue',
              },
              {
                step: '2',
                title: 'AI Analyzes Your Data',
                description: 'Our algorithm evaluates your lifestyle against longevity research',
                icon: Activity,
                color: 'green',
              },
              {
                step: '3',
                title: 'Get Your Longevity Score',
                description: 'Receive personalized insights to extend your healthy years',
                icon: Target,
                color: 'purple',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                </div>
                <div className="text-sm text-gray-500 mb-2">Step {item.step}</div>
                <h3 className="text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Start Your Longevity Assessment</h2>
            <p className="text-lg text-gray-600">Answer these questions to calculate your longevity score</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Age */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Age (years) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 35"
                  required
                  min="18"
                  max="100"
                />
              </div>

              {/* Height */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Ruler className="h-4 w-4 text-blue-600" />
                  Height (cm) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="e.g., 170"
                  required
                  min="100"
                  max="250"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Weight className="h-4 w-4 text-blue-600" />
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="e.g., 70"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              {/* Exercise Frequency */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  Exercise Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  name="exercise"
                  value={formData.exercise}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="daily">Daily (7 days/week)</option>
                  <option value="4-6">Frequent (4-6 days/week)</option>
                  <option value="2-3">Moderate (2-3 days/week)</option>
                  <option value="1">Occasional (1 day/week)</option>
                  <option value="none">Rarely/Never</option>
                </select>
              </div>

              {/* Sleep Hours */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Moon className="h-4 w-4 text-indigo-600" />
                  Average Sleep Hours <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="sleep"
                  value={formData.sleep}
                  onChange={handleInputChange}
                  placeholder="e.g., 7"
                  required
                  min="2"
                  max="14"
                  step="0.5"
                />
              </div>

              {/* Smoking Habits */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Cigarette className="h-4 w-4 text-red-600" />
                  Smoking Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="never">Never Smoked</option>
                  <option value="former">Former Smoker</option>
                  <option value="occasional">Occasional Smoker</option>
                  <option value="regular">Regular Smoker</option>
                </select>
              </div>

              {/* Stress Level */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Stress Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="stress"
                  value={formData.stress}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="low">Low (Well-managed)</option>
                  <option value="moderate">Moderate (Manageable)</option>
                  <option value="high">High (Frequent stress)</option>
                  <option value="very-high">Very High (Chronic stress)</option>
                </select>
              </div>

              {/* Diet Quality */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Utensils className="h-4 w-4 text-green-600" />
                  Diet Quality <span className="text-red-500">*</span>
                </label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="excellent">Excellent (Mostly whole foods)</option>
                  <option value="good">Good (Balanced, some processed)</option>
                  <option value="average">Average (Mixed quality)</option>
                  <option value="poor">Poor (Mostly processed)</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              Calculate My Longevity Score
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50"
          >
            <div className="container mx-auto max-w-5xl">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl text-gray-900 mb-2 text-center">Your Longevity Score</h2>
                <p className="text-gray-600 text-center mb-12">Based on your lifestyle choices and health data</p>

                {/* Circular Longevity Score Meter */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-72 h-72">
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="16"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="url(#longevityGradient)"
                        strokeWidth="16"
                        strokeDasharray={`${(longevityScore / 100) * 534.07} 534.07`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="longevityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl text-gray-900 mb-1">{longevityScore}</div>
                      <div className="text-gray-500 text-sm">/ 100</div>
                      <div className="text-xs text-gray-400 mt-2">Longevity Score</div>
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                <div className={`${longevityStatus.bgColor} rounded-2xl p-6 mb-8 text-center`}>
                  <div className={`text-2xl ${longevityStatus.color} mb-2`}>{longevityStatus.status}</div>
                  <p className="text-gray-700">{longevityStatus.message}</p>
                </div>

                {/* Percentile Comparison */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl text-gray-900">Comparison</h3>
                  </div>
                  <p className="text-2xl text-blue-600 mb-2">{percentile}th Percentile</p>
                  <p className="text-gray-600">
                    Your lifestyle is healthier than <strong>{percentile}%</strong> of people your age.
                  </p>
                </div>

                {/* Locked Report Section */}
                <div className="relative">
                  <div className={`${!isUnlocked ? 'blur-sm pointer-events-none' : ''}`}>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Longevity Risk Factors */}
                      <div className="bg-red-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Risk Factors</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Cardiovascular health: Moderate risk</li>
                          <li>• Metabolic markers: Good</li>
                          <li>• Inflammation levels: Low-Medium</li>
                          <li>• Sleep quality impact: Significant</li>
                          <li>• Stress-related aging: Elevated</li>
                        </ul>
                      </div>

                      {/* Biological Aging Score */}
                      <div className="bg-purple-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Timer className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Biological Age</h3>
                        </div>
                        <div className="text-3xl text-purple-600 mb-2">
                          {Math.max(18, parseInt(formData.age) - Math.floor((longevityScore - 50) / 5))} years
                        </div>
                        <p className="text-sm text-gray-600">
                          Your body's biological age based on lifestyle factors
                        </p>
                      </div>

                      {/* Lifestyle Improvements */}
                      <div className="bg-green-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Target className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Improvement Areas</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>✓ Increase weekly exercise frequency</li>
                          <li>✓ Optimize sleep duration to 7-9 hours</li>
                          <li>✓ Add more plant-based foods to diet</li>
                          <li>✓ Implement stress management techniques</li>
                          <li>✓ Regular health screenings recommended</li>
                        </ul>
                      </div>

                      {/* Personalized Suggestions */}
                      <div className="bg-blue-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Zap className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Quick Wins</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Daily 30-min walk: +3 years</li>
                          <li>• Mediterranean diet: +5 years</li>
                          <li>• 7-8 hours sleep: +2 years</li>
                          <li>• Quit smoking: +10 years</li>
                          <li>• Stress management: +2 years</li>
                        </ul>
                      </div>
                    </div>

                    {/* Detailed Recommendations */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                      <h3 className="text-xl text-gray-900 mb-6 text-center">Your Personalized Longevity Plan</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Activity className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Movement</h4>
                          <p className="text-sm text-gray-600 mb-3">Aim for 150 minutes of moderate aerobic activity weekly</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Strength training 2-3x/week</li>
                            <li>• Daily 10,000 steps</li>
                            <li>• Flexibility exercises</li>
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                            <Utensils className="h-6 w-6 text-orange-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Nutrition</h4>
                          <p className="text-sm text-gray-600 mb-3">Focus on nutrient-dense, anti-inflammatory foods</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 5+ servings fruits/vegetables</li>
                            <li>• Omega-3 rich foods</li>
                            <li>• Limit processed sugars</li>
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <Brain className="h-6 w-6 text-indigo-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Mental Health</h4>
                          <p className="text-sm text-gray-600 mb-3">Prioritize stress management and quality sleep</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Meditation or mindfulness</li>
                            <li>• 7-9 hours sleep nightly</li>
                            <li>• Social connections</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unlock Button Overlay */}
                  {!isUnlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl text-gray-900 mb-3">Unlock Full Longevity Report</h3>
                        <p className="text-gray-600 mb-6">
                          Get your complete analysis including biological age, risk factors, personalized improvement plan, and life-extending strategies.
                        </p>
                        <div className="text-4xl text-gray-900 mb-6">₹49</div>
                        <Button
                          onClick={handleUnlockClick}
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                        >
                          Unlock Full Longevity Report
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">One-time payment • Instant access • Lifetime report</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  {isUnlocked && (
                    <div className="flex justify-center gap-4 mt-8">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        size="lg"
                      >
                        Take New Test
                      </Button>
                      <Button
                        onClick={() => generatePDFReport(formData, longevityScore, longevityStatus, percentile)}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                      >
                        Download Report
                      </Button>
                    </div>
                  )}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isProcessing && setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
                <h3 className="text-xl text-gray-900">Complete Payment</h3>
                <button
                  onClick={() => !isProcessing && setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Amount Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Longevity Score Report</span>
                    <span className="text-gray-900">₹49</span>
                  </div>
                  <div className="h-px bg-gray-200 my-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-900">Total Amount</span>
                    <span className="text-3xl text-gray-900">₹49</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-700 mb-4">Select Payment Method</h4>
                  <div className="space-y-3">
                    {/* UPI */}
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      disabled={isProcessing}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-gray-900">UPI</div>
                        <div className="text-xs text-gray-500">PhonePe, GPay, Paytm</div>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Card */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      disabled={isProcessing}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-gray-900">Debit/Credit Card</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Wallet */}
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      disabled={isProcessing}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Wallet className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-gray-900">Wallet</div>
                        <div className="text-xs text-gray-500">Paytm, PhonePe, Amazon Pay</div>
                      </div>
                      {paymentMethod === 'wallet' && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!paymentMethod || isProcessing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    `Pay ₹49`
                  )}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>100% Secure Payment • SSL Encrypted</span>
                </div>

                {/* Demo Notice */}
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-xs text-yellow-800 text-center">
                    <strong>Demo Mode:</strong> This is a demonstration. Click "Pay ₹49" to unlock the report instantly without actual payment.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Why Check Your Longevity Score?</h2>
            <p className="text-lg text-gray-600">Science-backed insights to help you live healthier, longer</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Identify Risk Factors',
                description: 'Discover which lifestyle habits are impacting your longevity the most',
                color: 'red',
              },
              {
                icon: TrendingUp,
                title: 'Personalized Action Plan',
                description: 'Get specific recommendations tailored to your unique health profile',
                color: 'blue',
              },
              {
                icon: Shield,
                title: 'Track Your Progress',
                description: 'Retake the test periodically to see how your changes improve your score',
                color: 'green',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Footer */}
      <section className="py-8 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">Health Disclaimer</span>
          </div>
          <p className="text-sm text-gray-600">
            The Longevity Score is an educational tool based on lifestyle factors and should not be considered medical advice. This assessment provides general wellness insights and is not a substitute for professional medical evaluation. For personalized health guidance, please consult with a qualified healthcare provider.
          </p>
        </div>
      </section>

      {/* Next Test Prompt for Subscribers */}
      {showResults && (
        <div className="px-4 py-8">
          <div className="container mx-auto max-w-5xl">
            <NextTestPrompt currentTestId={TEST_IDS.LONGEVITY} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}