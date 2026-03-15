import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Heart, CheckCircle2, TrendingUp, Calendar, Target, Bell, Shield, Zap, ArrowRight, X, Smartphone, CreditCard, Wallet, Activity, Brain, Moon, Utensils, BarChart3, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { LoginModal, UserData } from '../components/LoginModal';

export default function Subscription() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleSubscribe = () => {
    // Check if user data already exists
    const existingUser = localStorage.getItem('healthScoreUser');
    if (existingUser) {
      setUserData(JSON.parse(existingUser));
      setShowPaymentModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setShowLoginModal(false);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      // Save subscription status to localStorage
      localStorage.setItem('healthScoreSubscription', JSON.stringify({
        active: true,
        startDate: new Date().toISOString(),
        price: 199,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }));
      // Navigate to dashboard
      navigate('/subscriber-dashboard');
    }, 2000);
  };

  const features = [
    {
      icon: Calendar,
      title: 'Monthly Health Tracking',
      description: 'Track all your health metrics every month with detailed progress reports',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Action Plan',
      description: 'Get customized recommendations based on your monthly health assessments',
      color: 'green',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Monthly notifications to complete your health tests and track progress',
      color: 'orange',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Visual charts showing your health improvements over time',
      color: 'purple',
    },
    {
      icon: Utensils,
      title: 'Nutrition Plans',
      description: 'Updated meal plans every month based on your current health status',
      color: 'red',
    },
    {
      icon: Target,
      title: 'Goal Setting & Tracking',
      description: 'Set monthly health goals and track your achievements',
      color: 'cyan',
    },
  ];

  const includedTests = [
    { icon: Activity, name: 'Body Fat Analysis', color: 'text-blue-600' },
    { icon: Heart, name: 'Longevity Score', color: 'text-green-600' },
    { icon: Heart, name: 'Heart Risk Check', color: 'text-red-600' },
    { icon: Zap, name: 'Stress Level Analysis', color: 'text-orange-600' },
    { icon: Brain, name: 'Mental Age Test', color: 'text-purple-600' },
    { icon: Moon, name: 'Sleep Quality Score', color: 'text-indigo-600' },
  ];

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
                onClick={handleSubscribe}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 border border-blue-200">
                <Award className="h-4 w-4" />
                <span className="text-sm">Premium Health Membership</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl text-gray-900 mb-6">
                Track Your Health{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Every Month
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get unlimited access to all health tests, personalized monthly tracking, and expert recommendations to improve your well-being.
              </p>

              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-white rounded-3xl shadow-2xl p-8 border-4 border-blue-200 mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-5xl text-gray-900">₹299</div>
                  <div className="text-gray-600">/month</div>
                </div>
                <div className="text-sm text-gray-500 mb-6">
                  Billed monthly • Cancel anytime
                </div>
                <Button
                  onClick={handleSubscribe}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg py-6"
                >
                  Start Your Health Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  🎁 First month includes free personalized health report worth ₹500
                </p>
              </motion.div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl text-blue-600 mb-1">6+</div>
                  <div className="text-sm text-gray-600">Health Tests</div>
                </div>
                <div>
                  <div className="text-3xl text-green-600 mb-1">∞</div>
                  <div className="text-sm text-gray-600">Monthly Tests</div>
                </div>
                <div>
                  <div className="text-3xl text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Everything You Need to Stay Healthy</h2>
            <p className="text-lg text-gray-600">Comprehensive monthly health tracking and personalized guidance</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included Tests Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Unlimited Access to All Tests</h2>
            <p className="text-lg text-gray-600">Take every test as many times as you want, every month</p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border-2 border-gray-100">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedTests.map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <test.icon className={`h-6 w-6 ${test.color}`} />
                  <span className="text-gray-900">{test.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-2">Individual Test Value: ₹294</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    If you purchase all 6 tests individually: ₹199 + ₹199 + ₹199 + ₹199 + ₹199 + ₹199 = ₹1,194 (one-time only)
                  </p>
                  <p className="text-sm text-gray-900">
                    <strong>With subscription:</strong> Unlimited monthly tests + tracking + recommendations + WhatsApp support = ₹299/month
                  </p>
                  <div className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Save ₹894/month while staying healthier! 🎯
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">How Monthly Tracking Works</h2>
            <p className="text-lg text-gray-600">Your personalized health journey in 4 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Subscribe',
                description: 'Join for ₹299/month and get instant access to your dashboard',
                icon: Target,
              },
              {
                step: '2',
                title: 'Take Tests Monthly',
                description: 'Complete all 6 health assessments at the start of each month',
                icon: Calendar,
              },
              {
                step: '3',
                title: 'Track Progress',
                description: 'View detailed analytics showing improvements or areas needing attention',
                icon: TrendingUp,
              },
              {
                step: '4',
                title: 'Get Recommendations',
                description: 'Receive personalized nutrition and lifestyle plans updated monthly',
                icon: Zap,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  {item.step}
                </div>
                <div className="mb-4">
                  <item.icon className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Free vs. Premium Membership</h2>
            <p className="text-lg text-gray-600">See what you get with a subscription</p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100">
            <div className="grid md:grid-cols-2">
              {/* Free Column */}
              <div className="p-8 border-r border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl text-gray-900 mb-2">Free Access</h3>
                  <div className="text-3xl text-gray-600">₹49-49</div>
                  <div className="text-sm text-gray-500">per test (one-time)</div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Single test reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 line-through">Monthly tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 line-through">Progress analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 line-through">Updated nutrition plans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 line-through">Monthly reminders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400 line-through">Goal tracking</span>
                  </li>
                </ul>
              </div>

              {/* Premium Column */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs mb-2">
                    RECOMMENDED
                  </div>
                  <h3 className="text-2xl text-gray-900 mb-2">Premium Subscription</h3>
                  <div className="text-3xl text-blue-600">₹299</div>
                  <div className="text-sm text-gray-600">/month</div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Unlimited test reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Monthly health tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Detailed progress analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Personalized nutrition plans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Smart monthly reminders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">Goal setting & tracking</span>
                  </li>
                </ul>
                <Button
                  onClick={handleSubscribe}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl text-white mb-6">
              Start Your Health Transformation Today
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are taking control of their health with personalized monthly tracking and expert guidance.
            </p>
            <Button
              onClick={handleSubscribe}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
            >
              Subscribe for ₹299/month
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-blue-100 mt-4">
              Cancel anytime • No long-term commitment • Instant access
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
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
              <h3 className="text-xl text-gray-900">Subscribe to Premium</h3>
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
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Monthly Subscription</span>
                  <span className="text-gray-900">₹299</span>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-900">Total Amount</span>
                  <span className="text-3xl text-gray-900">₹299</span>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  Billed monthly • Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
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

              {/* Subscribe Button */}
              <Button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Subscribe for ₹299/month`
                )}
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
                <Shield className="h-4 w-4" />
                <span>100% Secure Payment • Cancel Anytime</span>
              </div>

              {/* Demo Notice */}
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-xs text-yellow-800 text-center">
                  <strong>Demo Mode:</strong> Click subscribe to access the premium dashboard without actual payment.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <Footer />
      <Chatbot />
    </div>
  );
}