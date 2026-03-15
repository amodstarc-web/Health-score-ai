import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Activity, Heart, TrendingUp, AlertTriangle, CheckCircle2, Lock, Download, RotateCcw, Shield, Zap, Target, X, CreditCard, Smartphone, Wallet, Flame, Info, XCircle, Apple, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { generatePDFReport } from '../utils/pdfGenerator';
import { addUserNotification } from '../utils/notificationTracking';
import { unlockTestReport, isRazorpayConfigured } from '../config/razorpay';
import { toast } from 'sonner';

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

interface HealthResultsProps {
  formData: FormData;
  onReset?: () => void;
}

export function HealthResults({ formData, onReset }: HealthResultsProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Calculate BMI
  const heightInMeters = parseFloat(formData.height) / 100;
  const weight = parseFloat(formData.weight);
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  const waist = parseFloat(formData.waist);
  const age = parseInt(formData.age);

  // Determine BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-yellow-600' };
    if (bmi < 25) return { text: 'Normal Weight', color: 'text-green-600' };
    if (bmi < 30) return { text: 'Slightly Overweight', color: 'text-orange-600' };
    return { text: 'Overweight', color: 'text-red-600' };
  };

  const bmiCategory = getBMICategory(parseFloat(bmi));

  // Calculate health score (simplified algorithm)
  const calculateHealthScore = () => {
    let score = 100;
    
    // BMI penalty
    const bmiVal = parseFloat(bmi);
    if (bmiVal < 18.5 || bmiVal > 25) score -= 15;
    if (bmiVal >= 30) score -= 25;

    // Activity level bonus
    if (formData.activityLevel === 'sedentary') score -= 10;
    if (formData.activityLevel === 'active' || formData.activityLevel === 'very-active') score += 5;

    // Sleep penalty
    const sleep = parseFloat(formData.sleepHours);
    if (sleep < 6 || sleep > 9) score -= 10;

    // Smoking penalty
    if (formData.smoking === 'yes') score -= 20;

    // Waist circumference penalty
    const waistLimit = formData.gender === 'male' ? 94 : 80;
    if (waist > waistLimit) score -= 10;

    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleUnlock = () => {
    // Check if Razorpay is configured
    if (!isRazorpayConfigured()) {
      // For demo/testing purposes when Razorpay is not configured
      toast.success('🎉 Report Unlocked! (Demo Mode - No payment required)', {
        duration: 4000,
      });
      setIsUnlocked(true);
      
      // Track the unlock in notifications
      addUserNotification('Unlocked HealthScore AI Report');
      
      return;
    }

    // Use the Razorpay integration
    unlockTestReport(
      'Health Score Assessment',
      formData.name || 'Guest User',
      '', // Email - can be added to form if needed
      (paymentId) => {
        // Payment successful
        toast.success('Payment successful! Your report is now unlocked.', {
          duration: 5000,
        });
        setIsUnlocked(true);
        
        // Track the unlock in notifications
        addUserNotification('Unlocked HealthScore AI Report');
        
        // Store unlock status in localStorage (optional)
        localStorage.setItem(`unlocked_health_report_${formData.name}`, 'true');
        
        // Log payment for tracking (in production, send to your backend)
        console.log('Payment ID:', paymentId);
      },
      (error) => {
        // Payment failed or cancelled
        console.error('Payment error:', error);
        
        if (error.includes('cancelled')) {
          toast.error('Payment cancelled. Your report remains locked.');
        } else {
          toast.error('Payment failed. Please try again or contact support.');
        }
      }
    );
  };

  // Calculate estimated metrics for full report
  const metabolicAge = age + (healthScore < 70 ? 5 : healthScore > 85 ? -3 : 0);
  const bodyFat = formData.gender === 'male' 
    ? (parseFloat(bmi) * 1.2 + age * 0.23 - 16.2).toFixed(1)
    : (parseFloat(bmi) * 1.2 + age * 0.23 - 5.4).toFixed(1);
  const bmr = formData.gender === 'male'
    ? Math.round(88.362 + (13.397 * weight) + (4.799 * parseFloat(formData.height)) - (5.677 * age))
    : Math.round(447.593 + (9.247 * weight) + (3.098 * parseFloat(formData.height)) - (4.330 * age));
  
  const activityMultiplier = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  }[formData.activityLevel] || 1.2;
  
  const dailyCalories = Math.round(bmr * activityMultiplier);
  const heartScore = Math.max(0, healthScore - (formData.smoking === 'yes' ? 15 : 0) + (parseFloat(formData.sleepHours) >= 7 ? 5 : 0));

  // Calculate waist-to-height ratio
  const waistHeightRatio = (waist / parseFloat(formData.height)).toFixed(2);
  
  // Download report as PDF using browser print
  const downloadReport = () => {
    setIsDownloading(true);
    generatePDFReport(reportRef.current, formData.name, 'HealthScore AI Report')
      .then(() => {
        setIsDownloading(false);
        addUserNotification('Downloaded HealthScore AI Report');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        setIsDownloading(false);
      });
  };

  // Detailed health analysis
  const getDetailedAnalysis = () => {
    const issues = [];
    const solutions = [];

    // BMI Analysis
    if (parseFloat(bmi) < 18.5) {
      issues.push({
        severity: 'medium',
        title: 'Underweight Status',
        description: 'Your BMI is below the healthy range, which may indicate insufficient nutrition or underlying health issues.',
        risks: ['Weakened immune system', 'Nutrient deficiencies', 'Reduced bone density', 'Fatigue and low energy']
      });
      solutions.push({
        category: 'Weight Management',
        actions: [
          'Increase calorie intake by 300-500 calories daily',
          'Focus on nutrient-dense foods: nuts, avocados, whole grains',
          'Eat 5-6 smaller meals throughout the day',
          'Include protein with every meal (eggs, fish, lean meat, legumes)',
          'Strength training 3x per week to build muscle mass',
          'Consult a nutritionist for personalized meal planning'
        ]
      });
    } else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 30) {
      issues.push({
        severity: 'medium',
        title: 'Overweight - Early Intervention Needed',
        description: 'You are in the overweight category. Taking action now can prevent progression to obesity and reduce health risks.',
        risks: ['Increased risk of type 2 diabetes', 'High blood pressure', 'Cardiovascular disease', 'Joint problems']
      });
      solutions.push({
        category: 'Weight Loss Strategy',
        actions: [
          'Create a calorie deficit of 500 calories/day for gradual weight loss',
          'Focus on whole foods: vegetables, fruits, lean proteins, whole grains',
          'Reduce processed foods, sugary drinks, and refined carbohydrates',
          'Practice portion control using smaller plates',
          'Increase physical activity to 150-300 minutes/week',
          'Track your food intake using a journal or app',
          'Aim for 0.5-1kg weight loss per week (sustainable pace)'
        ]
      });
    } else if (parseFloat(bmi) >= 30) {
      issues.push({
        severity: 'high',
        title: 'Obesity - Immediate Action Required',
        description: 'Your BMI indicates obesity, significantly increasing risks for multiple chronic diseases.',
        risks: ['High risk of type 2 diabetes', 'Heart disease and stroke', 'Sleep apnea', 'Certain cancers', 'Liver disease', 'Osteoarthritis']
      });
      solutions.push({
        category: 'Comprehensive Weight Loss Plan',
        actions: [
          'Consult a healthcare provider for medical evaluation',
          'Consider working with a registered dietitian',
          'Start with moderate calorie reduction (500-750 cal/day)',
          'Begin with low-impact exercises: walking, swimming, cycling',
          'Join a weight loss support group or program',
          'Address emotional eating triggers',
          'Set realistic goals: 5-10% weight loss in 6 months',
          'Monitor blood pressure and blood sugar regularly'
        ]
      });
    }

    // Waist Circumference
    const waistLimit = formData.gender === 'male' ? 94 : 80;
    const highRiskWaist = formData.gender === 'male' ? 102 : 88;
    if (waist > waistLimit) {
      issues.push({
        severity: waist > highRiskWaist ? 'high' : 'medium',
        title: 'Abdominal Obesity',
        description: `Your waist circumference (${waist}cm) exceeds healthy limits, indicating excess visceral fat around organs.`,
        risks: ['Insulin resistance', 'Metabolic syndrome', 'Heart disease', 'Type 2 diabetes', 'Fatty liver disease']
      });
      solutions.push({
        category: 'Reduce Belly Fat',
        actions: [
          'Focus on core-strengthening exercises: planks, crunches',
          'High-intensity interval training (HIIT) 2-3x per week',
          'Reduce sugar and refined carbs significantly',
          'Increase soluble fiber intake (oats, beans, fruits)',
          'Manage stress through meditation or yoga',
          'Get adequate sleep (7-9 hours)',
          'Limit alcohol consumption',
          'Avoid trans fats completely'
        ]
      });
    }

    // Smoking
    if (formData.smoking === 'yes') {
      issues.push({
        severity: 'high',
        title: 'Smoking - Critical Health Risk',
        description: 'Smoking is the leading cause of preventable death, dramatically reducing life expectancy and quality of life.',
        risks: ['Lung cancer and other cancers', 'COPD and respiratory diseases', 'Heart attack and stroke', 'Reduced immune function', 'Premature aging', 'Erectile dysfunction']
      });
      solutions.push({
        category: 'Smoking Cessation',
        actions: [
          'Set a quit date within the next 2 weeks',
          'Consult doctor about nicotine replacement therapy (patches, gum)',
          'Consider prescription medications (Varenicline, Bupropion)',
          'Join a quit smoking program or support group',
          'Identify and avoid smoking triggers',
          'Replace smoking habit with healthy alternatives',
          'Use quit smoking apps for daily support',
          'Inform family and friends for accountability',
          'Expect withdrawal symptoms; they peak at 3 days and reduce after 2 weeks'
        ]
      });
    }

    // Sleep
    const sleep = parseFloat(formData.sleepHours);
    if (sleep < 7) {
      issues.push({
        severity: 'medium',
        title: 'Sleep Deprivation',
        description: `You're getting ${sleep} hours of sleep, below the recommended 7-9 hours for adults.`,
        risks: ['Weakened immune system', 'Weight gain and obesity', 'Increased risk of diabetes', 'Memory and cognitive impairment', 'Mood disorders', 'Reduced productivity']
      });
      solutions.push({
        category: 'Improve Sleep Quality',
        actions: [
          'Maintain consistent sleep schedule (same bedtime/wake time)',
          'Create a relaxing bedtime routine (reading, warm bath)',
          'Keep bedroom cool (15-19°C), dark, and quiet',
          'Avoid screens 1 hour before bed (blue light disrupts melatonin)',
          'Limit caffeine after 2 PM',
          'Avoid large meals 3 hours before bedtime',
          'Exercise regularly but not close to bedtime',
          'Consider magnesium supplements (consult doctor)',
          'Practice relaxation techniques: deep breathing, meditation'
        ]
      });
    } else if (sleep > 9) {
      issues.push({
        severity: 'low',
        title: 'Excessive Sleep',
        description: `Sleeping ${sleep} hours may indicate underlying health issues or poor sleep quality.`,
        risks: ['Depression', 'Cardiovascular disease', 'Diabetes', 'Reduced cognitive function']
      });
      solutions.push({
        category: 'Optimize Sleep Duration',
        actions: [
          'Gradually reduce sleep time by 15 minutes each week',
          'Improve sleep quality to feel more rested with less sleep',
          'Get morning sunlight exposure to regulate circadian rhythm',
          'Consult doctor if excessive fatigue persists',
          'Check for sleep disorders like sleep apnea',
          'Regular exercise to improve sleep efficiency'
        ]
      });
    }

    // Activity Level
    if (formData.activityLevel === 'sedentary') {
      issues.push({
        severity: 'medium',
        title: 'Sedentary Lifestyle',
        description: 'Physical inactivity is a major risk factor for numerous chronic diseases.',
        risks: ['Obesity', 'Type 2 diabetes', 'Cardiovascular disease', 'Weak muscles and bones', 'Mental health issues', 'Reduced life expectancy']
      });
      solutions.push({
        category: 'Increase Physical Activity',
        actions: [
          'Start with 10-minute walks, gradually increase to 30 minutes daily',
          'Take stairs instead of elevators',
          'Set hourly reminders to stand and stretch',
          'Join a fitness class or find an exercise buddy',
          'Try activities you enjoy: dancing, swimming, cycling',
          'Aim for 150 minutes of moderate activity per week',
          'Include strength training 2x per week',
          'Use a fitness tracker to monitor progress',
          'Park farther away to add walking to your routine'
        ]
      });
    }

    // Metabolic Age
    if (metabolicAge > age) {
      issues.push({
        severity: 'medium',
        title: 'Elevated Metabolic Age',
        description: `Your metabolic age (${metabolicAge}) is higher than your actual age (${age}), indicating accelerated aging.`,
        risks: ['Faster cellular aging', 'Increased disease risk', 'Reduced longevity', 'Lower energy levels']
      });
      solutions.push({
        category: 'Reverse Metabolic Aging',
        actions: [
          'Focus on strength training to increase muscle mass',
          'Adopt a Mediterranean-style diet rich in antioxidants',
          'Practice intermittent fasting (consult doctor first)',
          'Reduce chronic stress through mindfulness',
          'Ensure adequate protein intake (1.6g per kg body weight)',
          'Stay hydrated (2-3 liters of water daily)',
          'Limit processed foods and added sugars',
          'Get regular health screenings'
        ]
      });
    }

    return { issues, solutions };
  };

  const { issues, solutions } = getDetailedAnalysis();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="h-5 w-5" />
            <span>Analysis Complete</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Your Health Score {isUnlocked ? 'Report' : 'Preview'}
          </h2>
        </motion.div>

        {/* Preview Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div ref={reportRef}>
            <Card className="p-8 md:p-12 bg-white shadow-2xl border-2">
              {/* Health Score Circle */}
              <div className="text-center mb-8">
                <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-green-100 mb-4">
                  <div className={`text-5xl ${getScoreColor(healthScore)}`}>
                    {healthScore}
                  </div>
                  <div className="text-gray-600 text-sm">/ 100</div>
                </div>
                <h3 className="text-2xl mb-2 text-gray-900">Your Health Score</h3>
                <p className="text-gray-600">Based on your current lifestyle and body metrics</p>
              </div>

              {/* BMI Result */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Body Mass Index (BMI)</div>
                    <div className="text-3xl text-gray-900">{bmi}</div>
                    <div className={`text-sm mt-1 ${bmiCategory.color}`}>
                      {bmiCategory.text}
                    </div>
                  </div>
                  <Activity className="h-12 w-12 text-blue-600" />
                </div>
              </div>

              {/* Locked or Unlocked Section */}
              {!isUnlocked ? (
                <div className="relative">
                  {/* Blur overlay */}
                  <div className="relative">
                    <div className="blur-sm select-none pointer-events-none opacity-50">
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-gray-600">Metabolic Age</span>
                          </div>
                          <div className="text-2xl text-gray-900">XX years</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            <span className="text-sm text-gray-600">Body Fat %</span>
                          </div>
                          <div className="text-2xl text-gray-900">XX.X%</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Flame className="h-5 w-5 text-orange-600" />
                          <span className="text-sm text-gray-600">Daily Calorie Plan</span>
                        </div>
                        <div className="text-lg text-gray-900">XXXX calories/day</div>
                      </div>
                    </div>

                    {/* Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Card className="p-8 bg-white shadow-2xl border-2 border-blue-200 max-w-md w-full mx-4">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-4">
                            <Lock className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl mb-3 text-gray-900">
                            Unlock Your Full Health Report
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Get access to your complete health analysis with premium features worth ₹1,000+:
                          </p>
                          
                          <div className="text-left space-y-2 mb-6 max-h-64 overflow-y-auto">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Detailed Health Issues Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Specific Problem-Solving Methods</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Personalized Action Plans</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Complete Diet Plan (Breakfast, Lunch, Dinner, Snacks)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Calorie-Specific Meal Recommendations</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Foods to Include & Avoid Lists</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">7-Day Exercise Schedule (Detailed)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Strength Training & Cardio Plans</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Yoga & HIIT Workout Routines</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Supplement Recommendations</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">4-Week Transformation Plan</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700 font-semibold">Daily Hydration Goals</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Download PDF Report</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Lifetime Access to Your Report</span>
                            </div>
                          </div>

                          <div className="bg-yellow-50 rounded-lg p-3 mb-4 border border-yellow-200">
                            <p className="text-xs text-yellow-800 text-center">
                              <strong>🎁 Limited Time:</strong> Get all premium features (Worth ₹1,000+) for just ₹199!
                            </p>
                          </div>

                          <Button
                            onClick={handleUnlock}
                            size="lg"
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                          >
                            <Target className="mr-2 h-5 w-5" />
                            Unlock Full Report – ₹199
                          </Button>

                          <p className="text-xs text-gray-500 mt-4">
                            One-time payment • Instant access • 100% secure
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                /* Full Report Content */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Download Button */}
                  <div className="flex flex-wrap justify-end gap-3 mb-4">
                    <Button
                      onClick={() => {
                        // Store formData in localStorage before navigation
                        localStorage.setItem('healthAssessmentData', JSON.stringify(formData));
                        navigate('/diet-plan-form');
                      }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      <Apple className="mr-2 h-5 w-5" />
                      Get Diet Plan
                    </Button>
                    <Button
                      onClick={downloadReport}
                      disabled={isDownloading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      {isDownloading ? 'Generating PDF...' : 'Download Report'}
                    </Button>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                        <span className="text-sm text-gray-600">Metabolic Age</span>
                      </div>
                      <div className="text-3xl text-gray-900">{metabolicAge} years</div>
                      <p className="text-sm text-gray-600 mt-2">
                        {metabolicAge < age ? '✓ Younger than actual age!' : metabolicAge > age ? '⚠ Focus on improving lifestyle' : '✓ Right on track!'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="h-6 w-6 text-blue-600" />
                        <span className="text-sm text-gray-600">Body Fat %</span>
                      </div>
                      <div className="text-3xl text-gray-900">{bodyFat}%</div>
                      <p className="text-sm text-gray-600 mt-2">Estimated body composition</p>
                    </div>
                  </div>

                  {/* Waist Analysis */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Info className="h-6 w-6 text-purple-600" />
                      <span className="text-sm text-gray-600">Waist-to-Height Ratio</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">{waistHeightRatio}</div>
                    <p className="text-sm text-gray-700">
                      {parseFloat(waistHeightRatio) < 0.5 ? '✓ Healthy range' : '⚠ Above 0.5 indicates increased health risks'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Flame className="h-6 w-6 text-orange-600" />
                      <span className="text-sm text-gray-600">Daily Calorie Plan</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">{dailyCalories} calories/day</div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• Maintenance: {dailyCalories} cal</p>
                      <p>• Weight Loss: {dailyCalories - 500} cal (lose 0.5kg/week)</p>
                      <p>• Weight Gain: {dailyCalories + 500} cal (gain 0.5kg/week)</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="h-6 w-6 text-pink-600" />
                      <span className="text-sm text-gray-600">Heart Health Score</span>
                    </div>
                    <div className="text-3xl text-gray-900 mb-2">{heartScore} / 100</div>
                    <p className="text-sm text-gray-700">
                      {heartScore > 75 ? '✓ Good cardiovascular health' : '⚠ Consider improving heart health through exercise and diet'}
                    </p>
                  </div>

                  {/* Health Issues Detected */}
                  {issues.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-2xl mb-4 text-gray-900 flex items-center gap-2">
                        <AlertTriangle className="h-7 w-7 text-red-600" />
                        Health Issues Detected
                      </h3>
                      <div className="space-y-4">
                        {issues.map((issue, index) => (
                          <Card key={index} className={`p-6 border-l-4 ${
                            issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                            issue.severity === 'medium' ? 'border-orange-500 bg-orange-50' :
                            'border-yellow-500 bg-yellow-50'
                          }`}>
                            <div className="flex items-start gap-3 mb-3">
                              <XCircle className={`h-6 w-6 mt-1 ${
                                issue.severity === 'high' ? 'text-red-600' :
                                issue.severity === 'medium' ? 'text-orange-600' :
                                'text-yellow-600'
                              }`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-lg text-gray-900">{issue.title}</h4>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    issue.severity === 'high' ? 'bg-red-200 text-red-800' :
                                    issue.severity === 'medium' ? 'bg-orange-200 text-orange-800' :
                                    'bg-yellow-200 text-yellow-800'
                                  }`}>
                                    {issue.severity.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{issue.description}</p>
                                <div>
                                  <p className="text-sm text-gray-900 mb-2">Associated Health Risks:</p>
                                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                    {issue.risks.map((risk, i) => (
                                      <li key={i} className="list-disc">{risk}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solutions & Action Plans */}
                  {solutions.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-2xl mb-4 text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="h-7 w-7 text-green-600" />
                        Your Personalized Action Plan
                      </h3>
                      <div className="space-y-4">
                        {solutions.map((solution, index) => (
                          <Card key={index} className="p-6 border-l-4 border-green-500 bg-green-50">
                            <div className="flex items-start gap-3">
                              <Target className="h-6 w-6 text-green-600 mt-1" />
                              <div className="flex-1">
                                <h4 className="text-lg text-gray-900 mb-3">{solution.category}</h4>
                                <ul className="space-y-2">
                                  {solution.actions.map((action, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* General Wellness Tips */}
                  <div className="mt-8">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                      <h4 className="text-lg text-gray-900 mb-3">💡 General Wellness Tips</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Stay hydrated: Drink at least 2-3 liters of water daily</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Eat the rainbow: Include variety of colorful fruits and vegetables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Practice mindfulness: 10 minutes of meditation daily reduces stress</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Social connections: Maintain strong relationships for mental health</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Annual check-ups: Get regular health screenings and blood work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Limit screen time: Take breaks every hour, follow 20-20-20 rule</span>
                        </li>
                      </ul>
                    </Card>
                  </div>

                  {/* Report Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p className="mb-2">Report Generated: {new Date().toLocaleDateString()}</p>
                    <p>HealthScore AI - Your Trusted Health Assessment Partner</p>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          {onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="mb-6"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Take Another Test
            </Button>
          )}
          <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Data Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Instant Access</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This tool provides wellness insights and is not medical advice. 
            Please consult with a healthcare professional for medical concerns.
          </p>
        </motion.div>
      </div>
    </section>
  );
}