import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, Lock, CheckCircle2, TrendingUp, User, Weight, ArrowRight, Shield, Zap, Target, CreditCard, Smartphone, Wallet, X, AlertCircle, Users, Cigarette, Droplets, HeartPulse, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { generatePDFReport as generatePDF } from '../utils/pdfGenerator';
import { markTestCompleted, markTestUnlocked, isTestUnlocked, hasActiveSubscription, TEST_IDS } from '../utils/testTracking';
import { NextTestPrompt } from '../components/NextTestPrompt';

interface HeartRiskFormData {
  age: string;
  gender: string;
  weight: string;
  systolicBP: string;
  diastolicBP: string;
  smoking: string;
  exercise: string;
  familyHistory: string;
}

export default function HeartRiskChecker() {
  const [formData, setFormData] = useState<HeartRiskFormData>({
    age: '',
    gender: '',
    weight: '',
    systolicBP: '',
    diastolicBP: '',
    smoking: '',
    exercise: '',
    familyHistory: '',
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
    const alreadyUnlocked = isTestUnlocked(TEST_IDS.HEART_RISK);
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
    const risk = calculateHeartRisk();
    markTestCompleted(TEST_IDS.HEART_RISK, 'Heart Risk Check', parseFloat(risk.toFixed(0)), isUnlocked);
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
      markTestUnlocked(TEST_IDS.HEART_RISK);
      
      // Update the completion with unlocked status
      const risk = calculateHeartRisk();
      markTestCompleted(TEST_IDS.HEART_RISK, 'Heart Risk Check', parseFloat(risk.toFixed(0)), true);
    }, 2000);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsUnlocked(false);
    setFormData({
      age: '',
      gender: '',
      weight: '',
      systolicBP: '',
      diastolicBP: '',
      smoking: '',
      exercise: '',
      familyHistory: '',
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

  // Calculate Heart Risk Score
  const calculateHeartRisk = () => {
    let riskPoints = 0;
    const age = parseInt(formData.age);

    // Age risk (higher age = higher risk)
    if (age < 40) riskPoints += 5;
    else if (age < 50) riskPoints += 15;
    else if (age < 60) riskPoints += 25;
    else if (age < 70) riskPoints += 35;
    else riskPoints += 45;

    // Gender risk (males have higher cardiovascular risk)
    if (formData.gender === 'male') riskPoints += 10;
    else if (formData.gender === 'female') riskPoints += 5;

    // Weight/BMI estimation (higher weight = higher risk for average height)
    const weight = parseFloat(formData.weight);
    if (weight > 90) riskPoints += 15;
    else if (weight > 80) riskPoints += 10;
    else if (weight > 70) riskPoints += 5;
    else if (weight < 50) riskPoints += 8;

    // Blood Pressure risk
    if (formData.systolicBP && formData.diastolicBP) {
      const systolic = parseInt(formData.systolicBP);
      const diastolic = parseInt(formData.diastolicBP);
      
      if (systolic >= 140 || diastolic >= 90) riskPoints += 20;
      else if (systolic >= 130 || diastolic >= 85) riskPoints += 15;
      else if (systolic >= 120 || diastolic >= 80) riskPoints += 8;
      else riskPoints += 0;
    } else {
      riskPoints += 5; // Unknown BP adds minor risk
    }

    // Smoking status (major risk factor)
    const smokingRisk: { [key: string]: number } = {
      'never': 0,
      'former': 10,
      'occasional': 20,
      'regular': 30,
    };
    riskPoints += smokingRisk[formData.smoking] || 0;

    // Exercise frequency (protective factor)
    const exerciseRisk: { [key: string]: number } = {
      'daily': -10,
      '4-6': -5,
      '2-3': 0,
      '1': 5,
      'none': 15,
    };
    riskPoints += exerciseRisk[formData.exercise] || 0;

    // Family history (genetic risk)
    if (formData.familyHistory === 'yes') riskPoints += 15;
    else if (formData.familyHistory === 'unknown') riskPoints += 5;

    // Normalize to 0-100 scale (convert risk points to percentage)
    const riskScore = Math.max(0, Math.min(100, riskPoints));
    return Math.round(riskScore);
  };

  const heartRiskScore = showResults ? calculateHeartRisk() : 0;

  const getHeartRiskLevel = () => {
    if (heartRiskScore <= 20) return { 
      level: 'Low Risk', 
      color: 'text-green-600', 
      bgColor: 'bg-green-50', 
      borderColor: 'border-green-200',
      message: 'Your cardiovascular risk is well-controlled. Keep up the healthy habits!' 
    };
    if (heartRiskScore <= 40) return { 
      level: 'Moderate Risk', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50', 
      borderColor: 'border-blue-200',
      message: 'You have room for improvement. Small lifestyle changes can make a big difference.' 
    };
    if (heartRiskScore <= 60) return { 
      level: 'Elevated Risk', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50', 
      borderColor: 'border-orange-200',
      message: 'Consider making lifestyle modifications and consult your doctor.' 
    };
    if (heartRiskScore <= 80) return { 
      level: 'High Risk', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      message: 'Immediate lifestyle changes recommended. Schedule a medical checkup soon.' 
    };
    return { 
      level: 'Very High Risk', 
      color: 'text-red-700', 
      bgColor: 'bg-red-100', 
      borderColor: 'border-red-300',
      message: 'Consult a healthcare provider immediately for proper cardiovascular assessment.' 
    };
  };

  const getPercentile = () => {
    // Inverse percentile - higher risk = worse than more people
    return Math.max(5, Math.min(95, 100 - Math.round(heartRiskScore * 0.9)));
  };

  const heartRiskLevel = getHeartRiskLevel();
  const percentile = getPercentile();

  const generatePDFReport = (formData: HeartRiskFormData, heartRiskScore: number, heartRiskLevel: any, percentile: number) => {
    const nutritionRecommendations = getNutritionRecommendations();
    
    generatePDF({
      testName: 'Heart Risk Assessment Report',
      score: `${heartRiskScore}/100 (${heartRiskLevel.level})`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      sections: [
        {
          title: 'Your Cardiovascular Risk Profile',
          content: [
            `Heart Risk Score: ${heartRiskScore}/100`,
            `Risk Level: ${heartRiskLevel.level}`,
            `Percentile: Your heart risk is ${percentile > 50 ? 'lower' : 'higher'} than ${percentile}% of people your age`,
            `Age Risk Factor: ${formData.age && parseInt(formData.age) > 60 ? 'Elevated due to age' : 'Moderate'}`,
            `Blood Pressure Impact: ${formData.systolicBP && parseInt(formData.systolicBP) > 130 ? 'High - needs attention' : 'Normal range'}`,
            `Smoking Status: ${formData.smoking === 'regular' ? 'Critical risk factor' : formData.smoking === 'never' ? 'No risk' : 'Moderate risk'}`,
          ],
        },
        {
          title: 'Heart-Healthy Nutrition Plan',
          content: nutritionRecommendations,
        },
        {
          title: 'Risk Factor Analysis',
          content: [
            `Exercise Level: ${formData.exercise === 'daily' ? 'Excellent - significant protective factor' : formData.exercise === 'none' ? 'Major modifiable risk - exercise is critical' : 'Room for improvement'}`,
            `Family History: ${formData.familyHistory === 'yes' ? 'Genetic predisposition present - extra vigilance needed' : 'No known genetic risk'}`,
            `Weight Management: ${parseFloat(formData.weight) > 90 ? 'Weight loss recommended' : 'Maintaining healthy weight'}`,
          ],
        },
        {
          title: 'Cardiovascular Protection Strategies',
          content: [
            'Exercise: 150 min/week moderate aerobic + 2x strength training',
            'Mediterranean Diet: Proven to reduce heart disease by 30%',
            'Blood Pressure Control: Keep systolic <120, diastolic <80',
            'Cholesterol Management: LDL <100, HDL >40 (men) or >50 (women)',
            'Stress Reduction: Chronic stress increases heart attack risk by 27%',
            'Sleep Quality: 7-9 hours nightly reduces cardiovascular events',
            'Quit Smoking: Reduces heart attack risk by 50% within 1 year',
            'Limit Alcohol: Maximum 1 drink/day (women) or 2/day (men)',
            'Regular Checkups: Annual BP, cholesterol, and heart health screening',
          ],
        },
      ],
    });
  };

  const getNutritionRecommendations = (): string[] => {
    const recommendations: string[] = [];

    // Heart-healthy foods to ADD
    recommendations.push('ADD: Fatty fish - Salmon, mackerel, sardines 2-3x/week (omega-3 for heart protection)');
    recommendations.push('ADD: Oats and whole grains - Soluble fiber lowers LDL cholesterol by 5-10%');
    recommendations.push('ADD: Nuts - Almonds, walnuts 1 handful daily (reduce heart disease risk by 30%)');
    recommendations.push('ADD: Berries - Blueberries, strawberries (anthocyanins reduce heart attack risk by 32%)');
    recommendations.push('ADD: Leafy greens - Spinach, kale, collards (vitamin K for arterial health)');
    recommendations.push('ADD: Avocado - Rich in monounsaturated fats, lowers bad cholesterol');
    recommendations.push('ADD: Olive oil - Extra virgin, 2-4 tbsp daily (Mediterranean diet staple)');
    recommendations.push('ADD: Beans and legumes - Kidney beans, lentils, chickpeas (fiber + protein)');
    recommendations.push('ADD: Tomatoes - Lycopene protects against oxidative damage');
    recommendations.push('ADD: Dark chocolate - 70%+ cocoa, small amounts (flavonoids for blood flow)');
    recommendations.push('ADD: Green tea - 2-3 cups daily (catechins reduce cholesterol)');
    recommendations.push('ADD: Garlic - Raw or cooked (allicin lowers blood pressure)');

    // Foods to AVOID for heart health
    recommendations.push('AVOID: Trans fats - Margarine, fried foods, commercial baked goods (banned in many countries)');
    recommendations.push('AVOID: Excessive sodium - Limit to <2,300mg daily (1,500mg if hypertension)');
    recommendations.push('AVOID: Processed meats - Bacon, sausage, hot dogs (increase heart disease risk by 42%)');
    recommendations.push('AVOID: Sugary beverages - Sodas, energy drinks (linked to heart disease)');
    recommendations.push('AVOID: Red meat - Limit to 1-2 servings weekly (saturated fat concern)');
    recommendations.push('AVOID: Full-fat dairy - Choose low-fat options to reduce saturated fat');
    recommendations.push('AVOID: Refined carbs - White bread, pastries, sugary cereals');
    recommendations.push('AVOID: Excessive alcohol - More than moderate intake damages heart');
    recommendations.push('AVOID: Added sugars - <25g daily (hidden in processed foods)');
    recommendations.push('AVOID: Fried foods - Deep-fried items high in harmful fats');

    // Personalized recommendations based on risk factors
    if (formData.systolicBP && parseInt(formData.systolicBP) > 130) {
      recommendations.push('ADD: Potassium-rich foods - Bananas, sweet potatoes, spinach (lowers blood pressure)');
      recommendations.push('ADD: DASH diet pattern - Proven to reduce BP by 11 points');
      recommendations.push('AVOID: Processed/packaged foods - Often very high in hidden sodium');
    }

    if (formData.smoking === 'regular' || formData.smoking === 'occasional') {
      recommendations.push('ADD: Vitamin C foods - Citrus, bell peppers (repairs vascular damage from smoking)');
      recommendations.push('ADD: Antioxidant-rich foods - Combat oxidative stress from smoking');
    }

    if (formData.exercise === 'none' || formData.exercise === '1') {
      recommendations.push('ADD: Beetroot juice - Improves exercise capacity and blood flow');
      recommendations.push('ADD: Protein for muscle - Support exercise program with adequate protein');
    }

    if (parseFloat(formData.weight) > 85) {
      recommendations.push('ADD: High-fiber foods - Increase satiety, aid weight management');
      recommendations.push('ADD: Water before meals - Reduces calorie intake by 13%');
      recommendations.push('AVOID: Calorie-dense foods - Nuts in moderation despite health benefits');
    }

    // General heart-healthy nutrition principles
    recommendations.push('ADD: Mediterranean diet - Reduces cardiovascular events by 30%');
    recommendations.push('ADD: Portion control - Use smaller plates, measure servings');
    recommendations.push('ADD: Colorful vegetables - Different colors = different protective compounds');
    recommendations.push('AVOID: Eating late at night - Finish dinner 3 hours before bed');
    recommendations.push('ADD: Meal timing - Regular meal schedule supports metabolic health');

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <Button
                onClick={handleStartTest}
                size="sm"
                className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
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
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6 border border-red-200">
                <HeartPulse className="h-4 w-4" />
                <span className="text-sm">Medical-Grade Heart Assessment</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6">
                Check Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                  Heart Health Risk
                </span>{' '}
                in 2 Minutes
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Understand your cardiovascular risk before symptoms appear.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handleStartTest}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
                >
                  Start Heart Risk Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-gray-700">Clinically Validated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-gray-700">2-Min Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-gray-700">Personalized Plan</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Heart Health Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-red-50 to-blue-50 rounded-3xl p-8 lg:p-12">
                {/* Heart Health Dashboard */}
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  {/* Central Heart */}
                  <circle cx="200" cy="200" r="80" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
                  
                  {/* Heart Icon Representation */}
                  <path 
                    d="M200,240 C200,240 160,210 160,180 C160,165 170,155 185,155 C195,155 200,160 200,160 C200,160 205,155 215,155 C230,155 240,165 240,180 C240,210 200,240 200,240 Z" 
                    fill="#dc2626" 
                  />
                  
                  <text x="200" y="275" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">
                    Heart Health
                  </text>
                  
                  {/* Risk Factors Around Heart */}
                  {/* Blood Pressure */}
                  <circle cx="320" cy="140" r="35" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                  <text x="320" y="138" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
                    Blood
                  </text>
                  <text x="320" y="150" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
                    Pressure
                  </text>
                  
                  {/* Exercise */}
                  <circle cx="340" cy="260" r="35" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  <text x="340" y="265" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
                    Exercise
                  </text>
                  
                  {/* Weight */}
                  <circle cx="260" cy="340" r="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                  <text x="260" y="345" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">
                    Weight
                  </text>
                  
                  {/* Family History */}
                  <circle cx="140" cy="340" r="35" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                  <text x="140" y="338" textAnchor="middle" fill="#4f46e5" fontSize="10" fontWeight="bold">
                    Family
                  </text>
                  <text x="140" y="350" textAnchor="middle" fill="#4f46e5" fontSize="10" fontWeight="bold">
                    History
                  </text>
                  
                  {/* Smoking */}
                  <circle cx="60" cy="260" r="35" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                  <text x="60" y="265" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
                    Smoking
                  </text>
                  
                  {/* Age/Gender */}
                  <circle cx="80" cy="140" r="35" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
                  <text x="80" y="138" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="bold">
                    Age/
                  </text>
                  <text x="80" y="150" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="bold">
                    Gender
                  </text>
                  
                  {/* Connection Lines */}
                  <line x1="200" y1="200" x2="320" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="340" y2="260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="260" y2="340" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="140" y2="340" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="60" y2="260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="200" y1="200" x2="80" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-lg p-4 border border-red-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Prevention</div>
                    <div className="text-sm text-gray-900">Focus</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-lg p-4 border border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <HeartPulse className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Early</div>
                    <div className="text-sm text-gray-900">Detection</div>
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
            <p className="text-lg text-gray-600">Assess your cardiovascular risk in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Share Health Data',
                description: 'Answer questions about age, weight, blood pressure, and lifestyle habits',
                icon: User,
                color: 'red',
              },
              {
                step: '2',
                title: 'AI Risk Analysis',
                description: 'Our algorithm evaluates your cardiovascular risk factors',
                icon: Activity,
                color: 'blue',
              },
              {
                step: '3',
                title: 'Get Heart Health Plan',
                description: 'Receive personalized recommendations to protect your heart',
                icon: Target,
                color: 'green',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
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
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-4 border border-red-200">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Medical Assessment Form</span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Heart Risk Assessment</h2>
            <p className="text-lg text-gray-600">Complete these fields to calculate your cardiovascular risk</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Age */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <User className="h-4 w-4 text-red-600" />
                  Age (years) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 45"
                  required
                  min="18"
                  max="100"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Users className="h-4 w-4 text-red-600" />
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
                  <option value="other">Other</option>
                </select>
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
                  placeholder="e.g., 75"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              {/* Systolic Blood Pressure */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  Systolic BP (mmHg) <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="number"
                  name="systolicBP"
                  value={formData.systolicBP}
                  onChange={handleInputChange}
                  placeholder="e.g., 120"
                  min="70"
                  max="250"
                />
              </div>

              {/* Diastolic Blood Pressure */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  Diastolic BP (mmHg) <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="number"
                  name="diastolicBP"
                  value={formData.diastolicBP}
                  onChange={handleInputChange}
                  placeholder="e.g., 80"
                  min="40"
                  max="150"
                />
              </div>

              {/* Smoking Status */}
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

              {/* Family History */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  Family History of Heart Disease <span className="text-red-500">*</span>
                </label>
                <select
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleInputChange}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base transition-colors outline-none focus:border-ring focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes (Parents/Siblings)</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Note:</strong> This assessment is for informational purposes only and does not replace professional medical advice. If you have concerns about your heart health, please consult a healthcare provider.
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
            >
              Calculate Heart Risk Score
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
            className="py-16 px-4 bg-gradient-to-br from-red-50 to-blue-50"
          >
            <div className="container mx-auto max-w-5xl">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border-2 border-gray-100">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-4 border border-red-200">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Your Heart Health Assessment</span>
                  </div>
                </div>
                <h2 className="text-3xl text-gray-900 mb-2 text-center">Your Heart Risk Score</h2>
                <p className="text-gray-600 text-center mb-12">Based on your cardiovascular risk factors</p>

                {/* Heart Health Gauge Visualization */}
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
                      {/* Progress Circle - Color based on risk */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke={heartRiskScore <= 20 ? '#10b981' : heartRiskScore <= 40 ? '#3b82f6' : heartRiskScore <= 60 ? '#f59e0b' : '#dc2626'}
                        strokeWidth="16"
                        strokeDasharray={`${(heartRiskScore / 100) * 534.07} 534.07`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl text-gray-900 mb-1">{heartRiskScore}</div>
                      <div className="text-gray-500 text-sm">/ 100</div>
                      <div className="text-xs text-gray-400 mt-2">Risk Score</div>
                    </div>
                  </div>
                </div>

                {/* Risk Level Message */}
                <div className={`${heartRiskLevel.bgColor} border-2 ${heartRiskLevel.borderColor} rounded-2xl p-6 mb-8 text-center`}>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <HeartPulse className={`h-6 w-6 ${heartRiskLevel.color}`} />
                    <div className={`text-2xl ${heartRiskLevel.color}`}>{heartRiskLevel.level}</div>
                  </div>
                  <p className="text-gray-700">{heartRiskLevel.message}</p>
                </div>

                {/* Percentile Comparison */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 text-center border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl text-gray-900">Comparison</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Your heart risk is <strong>{percentile > 50 ? 'lower' : 'higher'}</strong> than <strong>{percentile}%</strong> of people your age.
                  </p>
                  <div className="text-sm text-gray-500">
                    {percentile > 70 ? 'Excellent cardiovascular health!' : percentile > 50 ? 'Better than average!' : 'Room for improvement'}
                  </div>
                </div>

                {/* Locked Report Section */}
                <div className="relative">
                  <div className={`${!isUnlocked ? 'blur-sm pointer-events-none' : ''}`}>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Cardiovascular Risk Level */}
                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Risk Breakdown</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Age-related risk: {formData.age && parseInt(formData.age) > 60 ? 'Elevated' : 'Moderate'}</li>
                          <li>• Blood pressure impact: {formData.systolicBP && parseInt(formData.systolicBP) > 130 ? 'High' : 'Normal'}</li>
                          <li>• Smoking factor: {formData.smoking === 'regular' ? 'Critical' : formData.smoking === 'never' ? 'None' : 'Moderate'}</li>
                          <li>• Exercise benefit: {formData.exercise === 'daily' ? 'Optimal' : formData.exercise === 'none' ? 'Poor' : 'Adequate'}</li>
                          <li>• Genetic predisposition: {formData.familyHistory === 'yes' ? 'Significant' : 'Low'}</li>
                        </ul>
                      </div>

                      {/* Lifestyle Risk Factors */}
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Key Risk Factors</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Sedentary lifestyle impact</li>
                          <li>• Dietary cholesterol concerns</li>
                          <li>• Stress and inflammation levels</li>
                          <li>• Sleep quality correlation</li>
                          <li>• Alcohol consumption effects</li>
                        </ul>
                      </div>

                      {/* Heart Improvement Plan */}
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Target className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Action Plan</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>✓ Cardiovascular exercise routine</li>
                          <li>✓ Heart-healthy Mediterranean diet</li>
                          <li>✓ Blood pressure management</li>
                          <li>✓ Stress reduction techniques</li>
                          <li>✓ Regular health monitoring</li>
                        </ul>
                      </div>

                      {/* Quick Wins */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Zap className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg text-gray-900">Quick Impact Changes</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• 30 min daily walk: -15% risk</li>
                          <li>• Quit smoking: -30% risk</li>
                          <li>• Reduce sodium: -10% risk</li>
                          <li>• Manage stress: -8% risk</li>
                          <li>• Regular checkups: Early detection</li>
                        </ul>
                      </div>
                    </div>

                    {/* Detailed Recommendations */}
                    <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                      <h3 className="text-xl text-gray-900 mb-6 text-center">Your Personalized Heart Health Plan</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Heart className="h-6 w-6 text-red-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Cardio Fitness</h4>
                          <p className="text-sm text-gray-600 mb-3">Strengthen your heart with regular aerobic exercise</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• 150 min/week moderate activity</li>
                            <li>• Include strength training</li>
                            <li>• Monitor heart rate zones</li>
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Target className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Nutrition</h4>
                          <p className="text-sm text-gray-600 mb-3">Eat heart-healthy foods to lower risk</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Omega-3 fatty acids</li>
                            <li>• Whole grains & fiber</li>
                            <li>• Limit saturated fats</li>
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-blue-600" />
                          </div>
                          <h4 className="text-lg text-gray-900 mb-3">Monitoring</h4>
                          <p className="text-sm text-gray-600 mb-3">Track key cardiovascular metrics</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Regular BP checks</li>
                            <li>• Cholesterol testing</li>
                            <li>• Annual heart screening</li>
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
                      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border-2 border-red-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl text-gray-900 mb-3">Unlock Full Heart Report</h3>
                        <p className="text-gray-600 mb-6">
                          Get detailed cardiovascular risk analysis, lifestyle risk factors, and a personalized heart improvement plan.
                        </p>
                        <div className="text-4xl text-gray-900 mb-6">₹49</div>
                        <Button
                          onClick={handleUnlockClick}
                          size="lg"
                          className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
                        >
                          Unlock Full Heart Report
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">One-time payment • Instant access • Downloadable report</p>
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
                        onClick={() => generatePDFReport(formData, heartRiskScore, heartRiskLevel, percentile)}
                        size="lg"
                        className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white"
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
                <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6 mb-6 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Heart Risk Report</span>
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
                          ? 'border-red-600 bg-red-50'
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
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Card */}
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-red-600 bg-red-50'
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
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Wallet */}
                    <button
                      onClick={() => setPaymentMethod('wallet')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'wallet'
                          ? 'border-red-600 bg-red-50'
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
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
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
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Why Check Your Heart Risk?</h2>
            <p className="text-lg text-gray-600">Prevention is the best medicine for heart health</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Early Detection',
                description: 'Identify cardiovascular risk factors before symptoms develop',
                color: 'blue',
              },
              {
                icon: Target,
                title: 'Personalized Prevention',
                description: 'Get specific recommendations based on your unique risk profile',
                color: 'red',
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor improvements as you adopt heart-healthy habits',
                color: 'green',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow border border-gray-100"
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

      {/* Medical Disclaimer */}
      <section className="py-8 px-4 bg-red-50 border-t border-red-200">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm text-red-900">Medical Disclaimer</span>
          </div>
          <p className="text-sm text-red-800">
            This Heart Risk Assessment is an educational tool and should not be considered a medical diagnosis. It does not replace professional cardiovascular evaluation by a qualified physician. If you have chest pain, shortness of breath, or other concerning symptoms, seek immediate medical attention. For personalized heart health advice, please consult a cardiologist or healthcare provider.
          </p>
        </div>
      </section>

      {/* Next Test Prompt for Subscribers */}
      {showResults && (
        <div className="px-4 py-8">
          <div className="container mx-auto max-w-5xl">
            <NextTestPrompt currentTestId={TEST_IDS.HEART_RISK} showResults={showResults} />
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}