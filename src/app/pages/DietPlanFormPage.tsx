import { useState } from 'react';
import { Heart, ArrowLeft, CheckCircle2, UserCircle, FileText, ChefHat, TrendingUp, Target } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  activityLevel: string;
  sleepHours: string;
  smoking: string;
}

export default function DietPlanFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Try to get formData from location state first, then from localStorage
  let formData = (location.state as any)?.formData as FormData | undefined;
  
  // If not in location state, try localStorage
  if (!formData) {
    const storedData = localStorage.getItem('healthAssessmentData');
    if (storedData) {
      try {
        formData = JSON.parse(storedData) as FormData;
      } catch (e) {
        console.error('Error parsing stored health data:', e);
      }
    }
  }

  // Redirect if no form data
  if (!formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">No Health Data Found</h2>
          <p className="text-gray-600 mb-6">Please complete the health assessment first.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  // Calculate basic metrics for display
  const heightInMeters = parseFloat(formData.height) / 100;
  const weight = parseFloat(formData.weight);
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  const bmiNum = parseFloat(bmi);

  // Determine goal
  let goal: string;
  let goalIcon: JSX.Element;
  let goalColor: string;
  
  if (bmiNum < 18.5) {
    goal = 'Healthy Weight Gain';
    goalIcon = <TrendingUp className="h-6 w-6 text-green-600" />;
    goalColor = 'from-green-50 to-green-100';
  } else if (bmiNum > 25) {
    goal = 'Weight Loss & Fat Reduction';
    goalIcon = <Target className="h-6 w-6 text-blue-600" />;
    goalColor = 'from-blue-50 to-blue-100';
  } else {
    goal = 'Maintenance & Optimization';
    goalIcon = <CheckCircle2 className="h-6 w-6 text-green-600" />;
    goalColor = 'from-green-50 to-blue-50';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      navigate('/diet-plan', { 
        state: { 
          formData,
          userName: userName.trim()
        } 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <ChefHat className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700">Custom Diet Plan Generator</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Let's Create Your Personalized Diet Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'll design a scientifically-backed nutrition plan tailored specifically to your health goals and body metrics
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-700 hidden sm:inline">Health Test</span>
              </div>
              <div className="w-16 h-0.5 bg-green-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md animate-pulse">
                  <UserCircle className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-900 font-medium hidden sm:inline">Your Details</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  <ChefHat className="h-5 w-5" />
                </div>
                <span className="text-sm text-gray-500 hidden sm:inline">Diet Plan</span>
              </div>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl text-gray-900 mb-2">Your Health Profile</h2>
                <p className="text-gray-600">We've successfully linked your health test results</p>
              </div>

              {/* Health Summary */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">BMI</p>
                  <p className="text-2xl text-gray-900">{bmi}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-2xl text-gray-900">{formData.age} years</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Activity</p>
                  <p className="text-lg text-gray-900 capitalize">{formData.activityLevel.replace('-', ' ')}</p>
                </div>
              </div>

              {/* Goal Display */}
              <div className={`bg-gradient-to-br ${goalColor} rounded-xl p-6 mb-8`}>
                <div className="flex items-center gap-3 mb-2">
                  {goalIcon}
                  <h3 className="text-lg text-gray-900">Your Health Goal</h3>
                </div>
                <p className="text-2xl text-gray-900 font-semibold">{goal}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Based on your health metrics, we'll create a customized nutrition plan to help you achieve this goal
                </p>
              </div>

              {/* Name Input Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="userName" className="block text-sm text-gray-700 mb-2">
                    What should we call you? <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We'll personalize your diet plan with your name for a better experience
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="text-sm text-gray-900 font-semibold mb-3">Your personalized plan will include:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Customized daily meal schedules (Breakfast, Lunch, Dinner & Snacks)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Precise calorie targets and macro nutrient breakdowns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Specific food recommendations for your goal</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Exercise plan tailored to your activity level</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Hydration guidelines and supplement suggestions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Printable format for easy reference</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Your Diet Plan...
                    </>
                  ) : (
                    <>
                      <ChefHat className="mr-2 h-5 w-5" />
                      Generate My Personalized Diet Plan
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>Science-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>100% Personalized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>Free to Use</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}