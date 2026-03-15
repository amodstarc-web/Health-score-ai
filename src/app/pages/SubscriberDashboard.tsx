import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Heart, Activity, Brain, Moon, Zap, TrendingUp, TrendingDown, Calendar, Target, Award, Bell, Settings, LogOut, CheckCircle2, AlertCircle, BarChart3, Download, Play, Sparkles, Trophy, Star, Gift, BookOpen, Video, FileText, ChevronRight, Shield, ChefHat } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getCompletedTests, isTestCompleted, getTestScore, getTestCompletionDate, getCompletedTestCount } from '../utils/testTracking';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface HealthTest {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  link: string;
  lastScore?: number;
  lastDate?: string;
  trend?: 'up' | 'down' | 'stable';
  completed: boolean;
}

interface MonthlyProgress {
  month: string;
  bodyFat: number;
  longevity: number;
  heartRisk: number;
  stress: number;
  mentalAge: number;
  sleepQuality: number;
}

export default function SubscriberDashboard() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState('current');

  useEffect(() => {
    // Check subscription status
    const subData = localStorage.getItem('healthScoreSubscription');
    if (!subData) {
      // Not subscribed, redirect to subscription page
      navigate('/subscription');
      return;
    }
    setSubscription(JSON.parse(subData));

    // Get user data
    const userData = localStorage.getItem('healthScoreUser');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, [navigate]);

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to monthly tracking and all premium features.')) {
      localStorage.removeItem('healthScoreSubscription');
      navigate('/subscription');
    }
  };

  const handleDownloadNutritionPlan = async () => {
    try {
      toast.loading('Generating your personalized nutrition plan...', { id: 'pdf-download' });

      // Simulate a small delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Header
      pdf.setFillColor(37, 99, 235); // Blue-600
      pdf.rect(0, 0, pageWidth, 40, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('HealthScore AI', margin, 20);
      pdf.setFontSize(12);
      pdf.text('Monthly Nutrition Plan', margin, 30);

      yPosition = 55;

      // User Info
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated for: ${userName || 'Premium Member'}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, yPosition);
      yPosition += 6;
      pdf.text('Plan Type: Premium Monthly Subscription', margin, yPosition);
      yPosition += 15;

      // Title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Your Personalized Nutrition Plan', margin, yPosition);
      yPosition += 10;

      // Introduction
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const introText = 'Based on your health assessment results, we have created a personalized nutrition plan to help you achieve your health goals. This plan is designed to improve your overall wellness and target specific health markers.';
      const splitIntro = pdf.splitTextToSize(introText, pageWidth - (margin * 2));
      pdf.text(splitIntro, margin, yPosition);
      yPosition += (splitIntro.length * 5) + 10;

      // Foods to Add
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(22, 163, 74); // Green-600
      pdf.text('✓ Foods to Add to Your Diet', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      const addFoods = [
        { name: 'Fatty Fish (Salmon, Mackerel, Sardines)', benefit: 'Rich in Omega-3 fatty acids for heart and brain health. Consume 2-3 times per week.' },
        { name: 'Leafy Greens (Spinach, Kale, Swiss Chard)', benefit: 'High in vitamins A, C, K, and minerals. Include in daily meals for optimal nutrition.' },
        { name: 'Berries (Blueberries, Strawberries, Raspberries)', benefit: 'Packed with antioxidants to fight inflammation and support cognitive function.' },
        { name: 'Nuts and Seeds (Almonds, Walnuts, Chia Seeds)', benefit: 'Provide healthy fats, protein, and fiber. A handful per day supports heart health.' },
        { name: 'Whole Grains (Quinoa, Brown Rice, Oats)', benefit: 'Complex carbohydrates for sustained energy and improved digestive health.' },
        { name: 'Greek Yogurt', benefit: 'High in protein and probiotics for gut health and muscle maintenance.' },
      ];

      addFoods.forEach((food, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${food.name}`, margin + 5, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        const splitBenefit = pdf.splitTextToSize(food.benefit, pageWidth - (margin * 2) - 10);
        pdf.text(splitBenefit, margin + 10, yPosition);
        yPosition += (splitBenefit.length * 5) + 5;
      });

      yPosition += 10;

      // Foods to Avoid
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(220, 38, 38); // Red-600
      pdf.text('✗ Foods to Avoid or Limit', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      const avoidFoods = [
        { name: 'Processed Sugars and Refined Carbs', reason: 'Can spike blood sugar, accelerate aging, and increase inflammation.' },
        { name: 'Trans Fats and Fried Foods', reason: 'Increase bad cholesterol and heart disease risk. Avoid margarine and deep-fried items.' },
        { name: 'Excessive Sodium', reason: 'Can raise blood pressure. Limit processed foods and add minimal salt to meals.' },
        { name: 'Alcohol', reason: 'Limit to occasional consumption. Excessive intake affects liver health and sleep quality.' },
        { name: 'Processed Meats', reason: 'High in preservatives linked to increased health risks. Choose fresh proteins instead.' },
      ];

      avoidFoods.forEach((food, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${food.name}`, margin + 5, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        const splitReason = pdf.splitTextToSize(food.reason, pageWidth - (margin * 2) - 10);
        pdf.text(splitReason, margin + 10, yPosition);
        yPosition += (splitReason.length * 5) + 5;
      });

      yPosition += 10;

      // Meal Timing Tips
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235); // Blue-600
      pdf.text('Meal Timing & Hydration Tips', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      const tips = [
        'Drink 8-10 glasses of water daily (2-3 liters)',
        'Eat breakfast within 1 hour of waking to boost metabolism',
        'Have your last meal 2-3 hours before bedtime',
        'Include protein in every meal to maintain muscle mass',
        'Practice portion control: fill half your plate with vegetables',
        'Eat slowly and mindfully to improve digestion',
      ];

      tips.forEach((tip, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(`• ${tip}`, margin + 5, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Sample Meal Plan
      if (yPosition > pageHeight - 100) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(34, 197, 94); // Green-500
      pdf.text('Sample Daily Meal Plan', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);

      const meals = [
        { time: 'Breakfast (7:00 AM)', meal: 'Greek yogurt with berries and chia seeds + Green tea' },
        { time: 'Mid-Morning (10:30 AM)', meal: 'Handful of almonds and an apple' },
        { time: 'Lunch (1:00 PM)', meal: 'Grilled salmon with quinoa and steamed broccoli + Mixed green salad' },
        { time: 'Evening Snack (4:30 PM)', meal: 'Carrot sticks with hummus' },
        { time: 'Dinner (7:30 PM)', meal: 'Grilled chicken breast with brown rice and sautéed spinach' },
        { time: 'Before Bed (Optional)', meal: 'Warm turmeric milk (if hungry)' },
      ];

      meals.forEach((meal) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFont('helvetica', 'bold');
        pdf.text(meal.time, margin + 5, yPosition);
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        pdf.text(meal.meal, margin + 10, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Footer
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const disclaimer = 'This nutrition plan is generated based on your health assessment. For personalized medical advice, please consult with a qualified healthcare professional or registered dietitian.';
      const splitDisclaimer = pdf.splitTextToSize(disclaimer, pageWidth - (margin * 2));
      pdf.text(splitDisclaimer, margin, yPosition);
      yPosition += (splitDisclaimer.length * 4) + 5;

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('HealthScore AI - Premium Subscription', margin, yPosition);

      // Save PDF
      pdf.save(`HealthScore-Nutrition-Plan-${new Date().toISOString().split('T')[0]}.pdf`);

      toast.success('Nutrition plan downloaded successfully!', { id: 'pdf-download' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download nutrition plan. Please try again.', { id: 'pdf-download' });
    }
  };

  // Get actual test data from localStorage
  const healthTests: HealthTest[] = [
    {
      id: 'body-fat',
      name: 'Body Fat Analysis',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/body-fat-analyzer',
      lastScore: getTestScore('body-fat') ?? undefined,
      lastDate: getTestCompletionDate('body-fat') ?? undefined,
      trend: 'down',
      completed: isTestCompleted('body-fat'),
    },
    {
      id: 'longevity',
      name: 'Longevity Score',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/longevity-score',
      lastScore: getTestScore('longevity') ?? undefined,
      lastDate: getTestCompletionDate('longevity') ?? undefined,
      trend: 'up',
      completed: isTestCompleted('longevity'),
    },
    {
      id: 'heart-risk',
      name: 'Heart Risk Check',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/heart-risk',
      lastScore: getTestScore('heart-risk') ?? undefined,
      lastDate: getTestCompletionDate('heart-risk') ?? undefined,
      trend: 'down',
      completed: isTestCompleted('heart-risk'),
    },
    {
      id: 'stress',
      name: 'Stress Level',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/stress-level',
      lastScore: getTestScore('stress') ?? undefined,
      lastDate: getTestCompletionDate('stress') ?? undefined,
      trend: 'stable',
      completed: isTestCompleted('stress'),
    },
    {
      id: 'mental-age',
      name: 'Mental Age Test',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/mental-age',
      lastScore: getTestScore('mental-age') ?? undefined,
      lastDate: getTestCompletionDate('mental-age') ?? undefined,
      completed: isTestCompleted('mental-age'),
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/sleep-quality',
      lastScore: getTestScore('sleep') ?? undefined,
      lastDate: getTestCompletionDate('sleep') ?? undefined,
      completed: isTestCompleted('sleep'),
    },
  ];

  const monthlyProgress: MonthlyProgress[] = [
    { month: 'January', bodyFat: 25, longevity: 72, heartRisk: 35, stress: 55, mentalAge: 28, sleepQuality: 65 },
    { month: 'February', bodyFat: 23, longevity: 75, heartRisk: 32, stress: 50, mentalAge: 27, sleepQuality: 70 },
    { month: 'March', bodyFat: 22, longevity: 78, heartRisk: 28, stress: 45, mentalAge: 26, sleepQuality: 75 },
  ];

  const completedTests = getCompletedTestCount();
  const totalTests = healthTests.length;
  const completionPercentage = Math.round((completedTests / totalTests) * 100);

  const currentMonthData = monthlyProgress[monthlyProgress.length - 1];
  const previousMonthData = monthlyProgress[monthlyProgress.length - 2];

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  if (!subscription) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
              <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Premium</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Button
                onClick={handleCancelSubscription}
                variant="outline"
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 mb-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl mb-2">
                  Welcome Back{userName ? `, ${userName}` : ''}! 👋
                </h1>
                <p className="text-blue-100">Track your monthly progress and achieve your health goals</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-sm text-blue-100 mb-1">Next Billing</div>
                <div className="text-xl">
                  {new Date(subscription.nextBillingDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Stats & Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Monthly Completion Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-900">March 2026 Progress</h2>
                  <div className="text-sm text-gray-600">{completedTests} of {totalTests} tests completed</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Completion</span>
                    <span className="text-sm text-gray-900">{completionPercentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                    />
                  </div>
                </div>

                {/* Reminder */}
                {completedTests < totalTests && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                    <Bell className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-orange-900 mb-1">Monthly Reminder</div>
                      <div className="text-xs text-orange-700">
                        Complete your remaining {totalTests - completedTests} tests to get your full monthly health report and personalized recommendations.
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Health Tests Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <h2 className="text-xl text-gray-900 mb-6">Your Health Tests</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {healthTests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className={`${test.bgColor} rounded-xl p-5 border-2 ${
                        test.completed ? 'border-green-200' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${test.bgColor} rounded-lg flex items-center justify-center border border-gray-200`}>
                            <test.icon className={`h-5 w-5 ${test.color}`} />
                          </div>
                          <div>
                            <h3 className="text-sm text-gray-900 mb-0.5">{test.name}</h3>
                            {test.lastDate && (
                              <div className="text-xs text-gray-500">
                                {new Date(test.lastDate).toLocaleDateString('en-IN')}
                              </div>
                            )}
                          </div>
                        </div>
                        {test.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-400" />
                        )}
                      </div>

                      {test.lastScore !== undefined ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl text-gray-900">{test.lastScore}</span>
                            {getTrendIcon(test.trend)}
                          </div>
                          <Link to={test.link}>
                            <Button size="sm" variant="outline">
                              Retake
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Link to={test.link}>
                          <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                            <Play className="h-4 w-4 mr-2" />
                            Take Test
                          </Button>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Monthly Trends Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-900">3-Month Progress Trends</h2>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>

                {/* Simple visual representation */}
                <div className="space-y-4">
                  {[
                    { name: 'Body Fat %', current: currentMonthData.bodyFat, previous: previousMonthData.bodyFat, lower: true },
                    { name: 'Longevity Score', current: currentMonthData.longevity, previous: previousMonthData.longevity, lower: false },
                    { name: 'Heart Risk', current: currentMonthData.heartRisk, previous: previousMonthData.heartRisk, lower: true },
                    { name: 'Stress Level', current: currentMonthData.stress, previous: previousMonthData.stress, lower: true },
                  ].map((metric, index) => {
                    const change = metric.current - metric.previous;
                    const isImproving = metric.lower ? change < 0 : change > 0;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">{metric.current}</span>
                            <span className={`text-xs ${isImproving ? 'text-green-600' : 'text-orange-600'}`}>
                              {change > 0 ? '+' : ''}{change}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isImproving ? 'bg-green-500' : 'bg-orange-500'}`}
                            style={{ width: `${metric.current}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Recommendations & Actions */}
            <div className="space-y-6">
              {/* Monthly Recommendations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-sm p-6 border border-green-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg text-gray-900">This Month's Focus</h2>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900 mb-1">Reduce Body Fat by 2%</h3>
                        <p className="text-xs text-gray-600">Current: 22% → Target: 20%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900 mb-1">Improve Sleep Quality</h3>
                        <p className="text-xs text-gray-600">Complete sleep test for personalized plan</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900 mb-1">Stress Management</h3>
                        <p className="text-xs text-gray-600">Practice 15 min daily meditation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Nutrition Plan */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg text-gray-900">Nutrition Highlights</h2>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="text-xs text-green-700 mb-1">✅ ADD TO DIET</div>
                    <div className="text-sm text-gray-900">Fatty fish 2-3x/week</div>
                    <div className="text-xs text-gray-600">Omega-3 for heart health</div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="text-xs text-green-700 mb-1">✅ ADD TO DIET</div>
                    <div className="text-sm text-gray-900">Leafy greens daily</div>
                    <div className="text-xs text-gray-600">Vitamins & fiber</div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <div className="text-xs text-red-700 mb-1">❌ AVOID</div>
                    <div className="text-sm text-gray-900">Processed sugars</div>
                    <div className="text-xs text-gray-600">Accelerates aging</div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <div className="text-xs text-red-700 mb-1">❌ AVOID</div>
                    <div className="text-sm text-gray-900">Trans fats & fried foods</div>
                    <div className="text-xs text-gray-600">Heart disease risk</div>
                  </div>
                </div>

                <Button
                  onClick={handleDownloadNutritionPlan}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Plan
                </Button>
              </motion.div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm p-6 border border-purple-200"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">3-Month Streak!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You've completed your health tests for 3 consecutive months. Keep it up!
                  </p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs">4</div>
                  </div>
                </div>
              </motion.div>

              {/* Subscription Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <h2 className="text-lg text-gray-900 mb-4">Subscription Details</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Plan</span>
                    <span className="text-gray-900">Premium Monthly</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price</span>
                    <span className="text-gray-900">₹199/month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Billing</span>
                    <span className="text-gray-900">
                      {new Date(subscription.nextBillingDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCancelSubscription}
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  Cancel Subscription
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Premium Features Section */}
          <div className="mt-12 space-y-6">
            {/* AI-Powered Health Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl mb-2">AI-Powered Health Insights</h2>
                  <p className="text-blue-100">Personalized analysis updated monthly based on your test results</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm mb-2">Biggest Improvement This Month</h3>
                      <p className="text-lg mb-1">Longevity Score +6 points</p>
                      <p className="text-xs text-blue-100">Your lifestyle changes are paying off! Continue with your current exercise routine and nutrition plan.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm mb-2">Area Needing Attention</h3>
                      <p className="text-lg mb-1">Sleep Quality</p>
                      <p className="text-xs text-blue-100">Consider establishing a consistent sleep schedule and reducing screen time before bed.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm mb-2">Health Risk Alert</h3>
                      <p className="text-lg mb-1">Low Risk Status</p>
                      <p className="text-xs text-blue-100">Great news! All your health markers are within healthy ranges. Keep up the good work.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm mb-2">Predicted Outcome</h3>
                      <p className="text-lg mb-1">On track for 2% body fat reduction</p>
                      <p className="text-xs text-blue-100">At your current pace, you'll reach your goal by mid-April 2026.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Value Comparison & Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Gift className="h-5 w-5 text-green-600" />
                <h2 className="text-xl text-gray-900">Your Monthly Savings</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-red-50 rounded-xl p-5 mb-4">
                    <div className="text-xs text-red-700 mb-2">WITHOUT SUBSCRIPTION</div>
                    <div className="space-y-2 text-sm text-gray-700 mb-3">
                      <div className="flex justify-between">
                        <span>Body Fat Analysis</span>
                        <span>₹49</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longevity Score</span>
                        <span>₹49</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heart Risk Check</span>
                        <span>₹49</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stress Level Test</span>
                        <span>₹39</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mental Age Test</span>
                        <span>₹39</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Quality Score</span>
                        <span>₹39</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-red-200">
                      <div className="flex justify-between text-base">
                        <span className="text-gray-900">Total Per Month</span>
                        <span className="text-red-700">₹264</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-green-50 rounded-xl p-5 mb-4">
                    <div className="text-xs text-green-700 mb-2">WITH PREMIUM SUBSCRIPTION</div>
                    <div className="space-y-2 text-sm text-gray-700 mb-3">
                      <div className="flex justify-between">
                        <span>All 6 Health Tests</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Tracking</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Health Insights</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personalized Plans</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Progress Reports</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority Support</span>
                        <span className="text-green-600">✓ Included</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-green-200">
                      <div className="flex justify-between text-base">
                        <span className="text-gray-900">Subscription Cost</span>
                        <span className="text-green-700">₹199</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 text-white text-center">
                    <div className="text-sm mb-1">You Save Every Month</div>
                    <div className="text-3xl">₹65</div>
                    <div className="text-xs text-green-100 mt-1">That's 25% off regular pricing!</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Exclusive Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl text-gray-900">Exclusive Premium Resources</h2>
                <span className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Members Only</span>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm text-gray-900 mb-2">Expert Video Library</h3>
                  <p className="text-xs text-gray-600 mb-3">50+ health videos from certified professionals</p>
                  <div className="text-xs text-blue-600">
                    Scroll down to watch ↓
                  </div>
                </div>

                <Link to="/meal-plans" className="block">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-sm text-gray-900 mb-2">Meal Plans</h3>
                    <p className="text-xs text-gray-600 mb-3">Expert-designed plans for your health goals</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <ChevronRight className="h-3 w-3 mr-2" />
                      View Plans
                    </Button>
                  </div>
                </Link>

                <Link to="/recipes" className="block">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                      <ChefHat className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-sm text-gray-900 mb-2">Healthy Recipes</h3>
                    <p className="text-xs text-gray-600 mb-3">100+ nutritious recipes with full instructions</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <ChevronRight className="h-3 w-3 mr-2" />
                      Browse Recipes
                    </Button>
                  </div>
                </Link>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-sm text-gray-900 mb-2">Monthly Webinars</h3>
                  <p className="text-xs text-gray-600 mb-3">Live Q&A with nutritionists and coaches</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Calendar className="h-3 w-3 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Weekly Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl shadow-sm p-6 border border-orange-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-orange-600" />
                <h2 className="text-lg text-gray-900">This Week's Health Tip</h2>
              </div>

              <div className="bg-white rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 mb-2">Boost Your Morning Routine</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Start your day with a glass of warm lemon water to kickstart metabolism and improve digestion. 
                      Follow with 5 minutes of light stretching to increase blood flow and energy levels.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span>Evidence-based</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3 text-blue-600" />
                        <span>Easy to implement</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-600" />
                        <span>High impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">New tips every Monday • Personalized to your health profile</p>
              </div>
            </motion.div>

            {/* Expert Health Videos from YouTube */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Video className="h-5 w-5 text-red-600" />
                <h2 className="text-xl text-gray-900">Expert Health Videos</h2>
                <span className="ml-auto bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">Premium Content</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Video 1 */}
                <a 
                  href="https://www.youtube.com/watch?v=TlfRgn_o0QA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/TlfRgn_o0QA/maxresdefault.jpg" 
                      alt="Heart Health Tips"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">Heart Health: Expert Tips</h3>
                    <p className="text-xs text-gray-600">by Dr. Eric Berg • 15 min</p>
                  </div>
                </a>

                {/* Video 2 */}
                <a 
                  href="https://www.youtube.com/watch?v=farGOtHiqz8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/farGOtHiqz8/maxresdefault.jpg" 
                      alt="Nutrition Basics"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">Nutrition 101: What to Eat</h3>
                    <p className="text-xs text-gray-600">by Thomas DeLauer • 12 min</p>
                  </div>
                </a>

                {/* Video 3 */}
                <a 
                  href="https://www.youtube.com/watch?v=aUaInS6HIGo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/aUaInS6HIGo/maxresdefault.jpg" 
                      alt="Reduce Stress"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">5 Ways to Reduce Stress</h3>
                    <p className="text-xs text-gray-600">by Dr. Rangan Chatterjee • 18 min</p>
                  </div>
                </a>

                {/* Video 4 */}
                <a 
                  href="https://www.youtube.com/watch?v=nm1TxQj9IsQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/nm1TxQj9IsQ/maxresdefault.jpg" 
                      alt="Sleep Better"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">Sleep Better: Science-Based Tips</h3>
                    <p className="text-xs text-gray-600">by Dr. Matthew Walker • 20 min</p>
                  </div>
                </a>

                {/* Video 5 */}
                <a 
                  href="https://www.youtube.com/watch?v=ixZxKYmLnFs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/ixZxKYmLnFs/maxresdefault.jpg" 
                      alt="Weight Loss Tips"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">Healthy Weight Loss Strategies</h3>
                    <p className="text-xs text-gray-600">by Dr. Michael Greger • 16 min</p>
                  </div>
                </a>

                {/* Video 6 */}
                <a 
                  href="https://www.youtube.com/watch?v=lhDvwLNZkpI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg"
                >
                  <div className="relative">
                    <img 
                      src="https://img.youtube.com/vi/lhDvwLNZkpI/maxresdefault.jpg" 
                      alt="Mental Health"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-gray-900 mb-1 group-hover:text-blue-600">Boost Mental Health Naturally</h3>
                    <p className="text-xs text-gray-600">by Dr. Andrew Huberman • 22 min</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}