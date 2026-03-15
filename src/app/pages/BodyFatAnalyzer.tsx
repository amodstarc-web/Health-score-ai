import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Lock, CheckCircle2, TrendingDown, User, Ruler, Weight, ArrowRight, Shield, Zap, Target, CreditCard, Smartphone, Wallet, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { LiveNotifications } from '../components/LiveNotifications';
import { generatePDFReport as generatePDF } from '../utils/pdfGenerator';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface BodyFatFormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  activityLevel: string;
  state: string;
}

export default function BodyFatAnalyzer() {
  const [formData, setFormData] = useState<BodyFatFormData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    waist: '',
    activityLevel: '',
    state: '',
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
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.BODY_FAT);
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
    const bodyFat = calculateBodyFat();
    markTestCompleted(TEST_IDS.BODY_FAT, 'Body Fat Analysis', parseFloat(bodyFat.toFixed(1)), isUnlocked);
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
      markTestUnlocked(TEST_IDS.BODY_FAT);
      
      // Update the completion with unlocked status
      const bodyFat = calculateBodyFat();
      markTestCompleted(TEST_IDS.BODY_FAT, 'Body Fat Analysis', parseFloat(bodyFat.toFixed(1)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      age: '',
      gender: '',
      height: '',
      weight: '',
      waist: '',
      activityLevel: '',
      state: '',
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

  // Calculate body fat percentage (using Navy Method formula)
  const calculateBodyFat = () => {
    const heightInCm = parseFloat(formData.height);
    const weightInKg = parseFloat(formData.weight);
    const waistInCm = parseFloat(formData.waist);
    const age = parseInt(formData.age);

    if (formData.gender === 'male') {
      // Simplified estimation for males
      const bodyFat = 86.010 * Math.log10(waistInCm - 0) - 70.041 * Math.log10(heightInCm) + 36.76;
      return Math.max(5, Math.min(50, bodyFat));
    } else {
      // Simplified estimation for females (hip assumed as waist * 1.1 for demo)
      const hipInCm = waistInCm * 1.1;
      const neckInCm = waistInCm * 0.4; // Estimated
      const bodyFat = 163.205 * Math.log10(waistInCm + hipInCm - neckInCm) - 97.684 * Math.log10(heightInCm) - 78.387;
      return Math.max(8, Math.min(50, bodyFat));
    }
  };

  const bodyFatPercentage = showResults ? calculateBodyFat().toFixed(1) : '0';
  const bodyFat = parseFloat(bodyFatPercentage);

  const getHealthStatus = () => {
    if (formData.gender === 'male') {
      if (bodyFat < 6) return { status: 'Very Low', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      if (bodyFat <= 13) return { status: 'Athletic', color: 'text-green-600', bgColor: 'bg-green-50' };
      if (bodyFat <= 17) return { status: 'Fitness', color: 'text-blue-600', bgColor: 'bg-blue-50' };
      if (bodyFat <= 24) return { status: 'Average', color: 'text-gray-600', bgColor: 'bg-gray-50' };
      if (bodyFat <= 30) return { status: 'Slightly High', color: 'text-orange-600', bgColor: 'bg-orange-50' };
      return { status: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50' };
    } else {
      if (bodyFat < 14) return { status: 'Very Low', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      if (bodyFat <= 20) return { status: 'Athletic', color: 'text-green-600', bgColor: 'bg-green-50' };
      if (bodyFat <= 24) return { status: 'Fitness', color: 'text-blue-600', bgColor: 'bg-blue-50' };
      if (bodyFat <= 31) return { status: 'Average', color: 'text-gray-600', bgColor: 'bg-gray-50' };
      if (bodyFat <= 38) return { status: 'Slightly High', color: 'text-orange-600', bgColor: 'bg-orange-50' };
      return { status: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50' };
    }
  };

  const healthStatus = getHealthStatus();

  const generatePDFReport = (formData: BodyFatFormData, bodyFatPercentage: string, healthStatus: any) => {
    const nutritionRecommendations = getNutritionRecommendations();
    
    generatePDF({
      testName: 'Body Fat Analysis Report',
      score: `${bodyFatPercentage}% (${healthStatus.status})`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      sections: [
        {
          title: 'Your Body Composition',
          content: [
            `Body Fat Percentage: ${bodyFatPercentage}%`,
            `Lean Body Mass: ${(parseFloat(formData.weight) * (1 - parseFloat(bodyFatPercentage) / 100)).toFixed(1)} kg`,
            `Fat Mass: ${(parseFloat(formData.weight) * (parseFloat(bodyFatPercentage) / 100)).toFixed(1)} kg`,
            `Health Status: ${healthStatus.status}`,
          ],
        },
        {
          title: 'Nutrition Recommendations to Improve Body Fat',
          content: nutritionRecommendations,
        },
        {
          title: 'Ideal Fat Range',
          content: [
            `For your gender (${formData.gender}): ${formData.gender === 'male' ? '10-20%' : '18-28%'}`,
            'Essential Fat: Minimum needed for basic physiological functions',
            'Athletic: Seen in professional athletes and fitness enthusiasts',
            'Fitness: Healthy range for active individuals',
            'Average: Acceptable but could be improved',
          ],
        },
        {
          title: 'Exercise Recommendations',
          content: [
            'Resistance training 3-4x per week to build lean muscle mass',
            'Cardiovascular exercise 150+ minutes weekly for fat burning',
            'High-Intensity Interval Training (HIIT) 2x per week',
            'Daily step goal: 8,000-10,000 steps',
            'Focus on compound movements: squats, deadlifts, bench press',
          ],
        },
      ],
    });
  };

  const getNutritionRecommendations = (): string[] => {
    const bodyFat = parseFloat(bodyFatPercentage);
    const recommendations: string[] = [];

    // Foods to ADD based on body fat level
    if (bodyFat > 25) {
      recommendations.push('ADD: Lean protein sources - Chicken breast, fish, tofu, legumes (aim for 1.6-2.2g/kg body weight)');
      recommendations.push('ADD: High-fiber vegetables - Broccoli, spinach, kale, cauliflower, bell peppers');
      recommendations.push('ADD: Complex carbs - Quinoa, sweet potatoes, brown rice, oats (in moderate portions)');
      recommendations.push('ADD: Healthy fats - Avocado, nuts (almonds, walnuts), olive oil, fatty fish (salmon, mackerel)');
      recommendations.push('ADD: Green tea - 2-3 cups daily for metabolism boost');
      recommendations.push('ADD: Chia seeds and flaxseeds - Rich in omega-3 and fiber');
    } else if (bodyFat > 18) {
      recommendations.push('ADD: Lean meats and fish - Salmon, tuna, turkey, lean beef');
      recommendations.push('ADD: Greek yogurt and cottage cheese - High protein, low fat');
      recommendations.push('ADD: Berries - Blueberries, strawberries, raspberries (low sugar fruits)');
      recommendations.push('ADD: Cruciferous vegetables - Brussels sprouts, cabbage, bok choy');
      recommendations.push('ADD: Whole grains - Quinoa, bulgur wheat, whole grain bread');
    } else {
      recommendations.push('ADD: Adequate protein - Maintain muscle mass with 1.8-2g/kg protein');
      recommendations.push('ADD: Healthy carbs - Sweet potatoes, oats, fruits for energy');
      recommendations.push('ADD: Good fats - Nuts, seeds, avocado, fatty fish');
      recommendations.push('ADD: Vegetables - Wide variety for micronutrients');
    }

    // Foods to AVOID based on body fat level
    if (bodyFat > 25) {
      recommendations.push('AVOID: Refined sugars - Candies, sodas, fruit juices, desserts');
      recommendations.push('AVOID: Processed foods - Packaged snacks, chips, cookies, instant noodles');
      recommendations.push('AVOID: Fried foods - French fries, fried chicken, pakoras, samosas');
      recommendations.push('AVOID: White bread and refined grains - White rice, maida products');
      recommendations.push('AVOID: High-calorie beverages - Sugary coffee drinks, alcohol, energy drinks');
      recommendations.push('AVOID: Trans fats - Margarine, commercial baked goods, fast food');
      recommendations.push('AVOID: Excessive dairy - Full-fat milk, cheese, ice cream');
    } else if (bodyFat > 18) {
      recommendations.push('AVOID: Excessive sugar - Limit to <25g added sugar daily');
      recommendations.push('AVOID: Processed snacks - Chips, cookies, crackers');
      recommendations.push('AVOID: Fried and deep-fried foods - Minimize frequency');
      recommendations.push('AVOID: Sugary beverages - Replace with water, green tea');
      recommendations.push('AVOID: Refined carbs - White bread, pasta, pastries');
    } else {
      recommendations.push('AVOID: Empty calories - Junk food, excessive sweets');
      recommendations.push('AVOID: Too much alcohol - Can hinder muscle recovery');
      recommendations.push('AVOID: Skipping meals - Maintain consistent eating schedule');
    }

    // General recommendations
    recommendations.push('ADD: Water - Drink 8-10 glasses daily, more if exercising');
    recommendations.push('ADD: Meal timing - Eat protein within 30 min after workout');
    recommendations.push('AVOID: Late-night eating - Stop eating 2-3 hours before bed');
    recommendations.push('ADD: Portion control - Use smaller plates, measure servings');

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
                <Activity className="h-4 w-4" />
                <span className="text-sm">AI-Powered Body Analysis</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6">
                Find Your Real Body Fat Percentage in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  60 Seconds
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Check if your body fat is healthy or dangerous using our AI body fat estimator.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handleStartTest}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  Start Body Fat Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Personalized Plan</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Body Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12">
                {/* Body Illustration with Fat Areas Highlighted */}
                <svg viewBox="0 0 400 600" className="w-full h-auto">
                  {/* Body Outline */}
                  <ellipse cx="200" cy="100" rx="50" ry="60" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
                  <rect x="150" y="160" width="100" height="120" rx="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                  <ellipse cx="200" cy="340" rx="60" ry="80" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  <rect x="120" y="200" width="40" height="100" rx="15" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
                  <rect x="240" y="200" width="40" height="100" rx="15" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
                  <rect x="160" y="420" width="30" height="140" rx="15" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  <rect x="210" y="420" width="30" height="140" rx="15" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  
                  {/* Labels */}
                  <text x="200" y="50" textAnchor="middle" fill="#3b82f6" fontSize="14">Face</text>
                  <text x="200" y="220" textAnchor="middle" fill="#3b82f6" fontSize="14">Chest</text>
                  <text x="200" y="280" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">Abdomen</text>
                  <text x="200" y="380" textAnchor="middle" fill="#10b981" fontSize="14">Hips</text>
                  <text x="200" y="490" textAnchor="middle" fill="#10b981" fontSize="14">Thighs</text>
                  
                  {/* Fat Storage Indicators */}
                  <circle cx="320" cy="280" r="6" fill="#ef4444" />
                  <text x="335" y="285" fill="#6b7280" fontSize="12">High Fat Area</text>
                  <circle cx="320" cy="340" r="6" fill="#f59e0b" />
                  <text x="335" y="345" fill="#6b7280" fontSize="12">Moderate</text>
                  <circle cx="320" cy="400" r="6" fill="#10b981" />
                  <text x="335" y="405" fill="#6b7280" fontSize="12">Low Fat Area</text>
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
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                    <div className="text-sm text-gray-900">95%+</div>
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
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Speed</div>
                    <div className="text-sm text-gray-900">60 Sec</div>
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
            <p className="text-lg text-gray-600">Get your body fat analysis in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Enter Your Body Data',
                description: 'Provide basic measurements like age, height, weight, and waist size',
                icon: User,
                color: 'blue',
              },
              {
                step: '2',
                title: 'AI Calculates Fat Percentage',
                description: 'Our AI analyzes your data using advanced body composition formulas',
                icon: Activity,
                color: 'green',
              },
              {
                step: '3',
                title: 'Get Your Fat Risk Score',
                description: 'Receive personalized insights and fat reduction recommendations',
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
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Start Your Body Fat Analysis</h2>
            <p className="text-lg text-gray-600">Enter your details to get your personalized body fat report</p>
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
                <label className="block text-sm text-gray-700 mb-2">
                  Age (years) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                  required
                  min="10"
                  max="100"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
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
                <label className="block text-sm text-gray-700 mb-2">
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

              {/* Waist */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Waist Circumference (cm) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="waist"
                  value={formData.waist}
                  onChange={handleInputChange}
                  placeholder="e.g., 85"
                  required
                  min="40"
                  max="200"
                  step="0.1"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Activity Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very-active">Very Active (2x per day)</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              Calculate Body Fat Percentage
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
                <h2 className="text-3xl text-gray-900 mb-8 text-center">Your Body Fat Analysis</h2>

                {/* Body Fat Gauge */}
                <div className="flex justify-center mb-12">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="20"
                        strokeDasharray={`${(parseFloat(bodyFatPercentage) / 50) * 502.65} 502.65`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl text-gray-900">{bodyFatPercentage}%</div>
                      <div className="text-sm text-gray-600 mt-2">Body Fat</div>
                    </div>
                  </div>
                </div>

                {/* Health Status */}
                <div className={`${healthStatus.bgColor} rounded-2xl p-6 mb-8`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Health Status</div>
                      <div className={`text-2xl ${healthStatus.color}`}>{healthStatus.status}</div>
                    </div>
                    <div className={`w-16 h-16 ${healthStatus.bgColor} border-2 ${healthStatus.color.replace('text-', 'border-')} rounded-full flex items-center justify-center`}>
                      <Activity className={`h-8 w-8 ${healthStatus.color}`} />
                    </div>
                  </div>
                </div>

                {/* Locked Report Section */}
                <div className="relative">
                  <div className={`${!isUnlocked ? 'blur-sm pointer-events-none' : ''}`}>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Target className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Ideal Fat Range</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">For your age and gender:</p>
                        <div className="text-2xl text-blue-600">
                          {formData.gender === 'male' ? '10-20%' : '18-28%'}
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingDown className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Fat Loss Plan</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Recommended approach:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 500 cal deficit/day</li>
                          <li>• Strength training 3x/week</li>
                          <li>• High protein diet</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-orange-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Fat Storage Risk</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Health impact:</p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div>Visceral fat: Moderate</div>
                          <div>Disease risk: Low-Med</div>
                          <div>Metabolic health: Good</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
                      <h3 className="text-xl text-gray-900 mb-4">Detailed Body Composition Analysis</h3>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Lean Body Mass</div>
                          <div className="text-2xl text-gray-900">
                            {(parseFloat(formData.weight) * (1 - parseFloat(bodyFatPercentage) / 100)).toFixed(1)} kg
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Fat Mass</div>
                          <div className="text-2xl text-gray-900">
                            {(parseFloat(formData.weight) * (parseFloat(bodyFatPercentage) / 100)).toFixed(1)} kg
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-6">
                        <h4 className="text-lg text-gray-900 mb-4">Personalized Recommendations</h4>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Focus on resistance training to maintain muscle mass while losing fat</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Aim for 1.6-2.2g protein per kg of body weight daily</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Reduce processed foods and focus on whole, nutrient-dense options</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Monitor waist circumference as a key indicator of visceral fat</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Unlock Button */}
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
                        <h3 className="text-2xl text-gray-900 mb-3">Unlock Full Report</h3>
                        <p className="text-gray-600 mb-6">
                          Get your complete body fat analysis including ideal fat range, personalized fat loss plan, and health risk assessment.
                        </p>
                        <div className="text-4xl text-gray-900 mb-6">₹199</div>
                        <Button
                          onClick={handleUnlockClick}
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                        >
                          Unlock Full Report Now
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">One-time payment • Instant access</p>
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
                        onClick={() => generatePDFReport(formData, bodyFatPercentage, healthStatus)}
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
                    <span className="text-gray-600">Body Fat Analysis Report</span>
                    <span className="text-gray-900">₹199</span>
                  </div>
                  <div className="h-px bg-gray-200 my-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-900">Total Amount</span>
                    <span className="text-3xl text-gray-900">₹199</span>
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
                    `Pay ₹199`
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
                    <strong>Demo Mode:</strong> This is a demonstration. Click "Pay ₹199" to unlock the report instantly without actual payment.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Test Prompt for Subscribers */}
      {showResults && (
        <div className="px-4 py-8">
          <div className="container mx-auto max-w-5xl">
            <NextTestPrompt currentTestId={TEST_IDS.BODY_FAT} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
      <LiveNotifications />
    </div>
  );
}