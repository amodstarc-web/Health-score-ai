import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useState } from 'react';

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'General Questions',
      questions: [
        {
          q: 'What is HealthScore AI?',
          a: 'HealthScore AI is a comprehensive health assessment platform that provides AI-powered evaluations of your body composition, longevity, cardiovascular health, stress levels, mental age, and sleep quality. We deliver clinically-validated insights in under 2 minutes, along with personalized nutrition recommendations.'
        },
        {
          q: 'Is HealthScore AI a medical service?',
          a: 'No. HealthScore AI is an informational and educational tool, not a medical service. Our assessments do not constitute medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions and emergencies.'
        },
        {
          q: 'How accurate are the health assessments?',
          a: 'Our assessments use clinically-validated algorithms based on established medical research (BMI, Mifflin-St Jeor equation, Framingham Risk Score, etc.). While we strive for accuracy, results are estimates based on self-reported data and may vary from clinical measurements. Individual results can differ significantly.'
        },
        {
          q: 'Who can use HealthScore AI?',
          a: 'HealthScore AI is designed for adults aged 18 and above who want to understand their health status and receive personalized wellness guidance. Our platform is accessible to anyone with a smartphone or computer.'
        }
      ]
    },
    {
      category: 'Health Tests & Results',
      questions: [
        {
          q: 'What health tests are available?',
          a: 'We offer six comprehensive assessments: (1) Body Health Score / Metabolic Age, (2) Longevity Score Test, (3) Heart Risk Checker, (4) Stress Level Analyzer, (5) Mental Age Test, and (6) Sleep Quality Score. Each test provides unique insights into different aspects of your health.'
        },
        {
          q: 'How do I take a health test?',
          a: 'Simply select the test you want from our homepage, fill in the required information (age, gender, height, weight, etc.), and click "Calculate." You\'ll receive a free preview of your results immediately. For detailed reports and personalized recommendations, you can unlock the full report.'
        },
        {
          q: 'What information do I need to provide?',
          a: 'Basic information varies by test but typically includes: age, gender, height, weight, waist circumference, activity level, sleep hours, and lifestyle factors (smoking, etc.). All measurements should be as accurate as possible for best results.'
        },
        {
          q: 'What\'s the difference between free preview and full report?',
          a: 'The free preview shows your overall score and basic assessment. The full report (paid) includes detailed breakdowns, risk factors, personalized nutrition plans, actionable recommendations, and downloadable PDF reports.'
        },
        {
          q: 'Can I retake tests?',
          a: 'Yes! You can retake tests as many times as you want. We recommend retaking tests monthly to track your progress, especially if you\'re following our nutrition recommendations or making lifestyle changes.'
        }
      ]
    },
    {
      category: 'Pricing & Payments',
      questions: [
        {
          q: 'How much does HealthScore AI cost?',
          a: 'We offer three options: (1) Free preview for all tests, (2) One-time payment to unlock individual detailed reports (varies by test), and (3) Monthly subscription at ₹199/month for unlimited access to all tests, monthly tracking, and personalized recommendations.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway partners. All transactions are encrypted and PCI DSS compliant.'
        },
        {
          q: 'Is the monthly subscription auto-renewing?',
          a: 'Yes, the ₹199/month subscription automatically renews each month. You can cancel anytime from your account dashboard. Cancellation takes effect at the end of your current billing period.'
        },
        {
          q: 'What\'s your refund policy?',
          a: 'One-time report unlocks are non-refundable once the detailed report is accessed. Monthly subscriptions can be cancelled anytime, but we don\'t offer refunds for partial months or unused portions. Refunds may be issued at our discretion for technical issues.'
        },
        {
          q: 'What happens if I cancel my subscription?',
          a: 'If you cancel, you\'ll retain access to all features until the end of your current billing period. After that, you\'ll revert to free preview access. Your historical data and test results will remain saved in your account.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'Is my health data secure?',
          a: 'Absolutely. We implement industry-standard security measures including SSL/TLS encryption for data in transit, encrypted cloud storage, regular security audits, and strict access controls. Your data is protected at all times.'
        },
        {
          q: 'Do you sell my personal health information?',
          a: 'Never. We do not sell your personal health data to third parties. We may share anonymized, aggregated data for research purposes, but individual information is never sold or shared without your explicit consent.'
        },
        {
          q: 'Can I delete my data?',
          a: 'Yes. You have the right to request deletion of your personal data at any time. Contact our support team at privacy@healthscore-ai.com to exercise this right. Note that we may retain some information for legal compliance purposes.'
        },
        {
          q: 'Where is my data stored?',
          a: 'Your data is stored on secure cloud servers with encryption at rest. We use trusted cloud providers that comply with international data protection standards. Data may be transferred across borders with appropriate safeguards.'
        }
      ]
    },
    {
      category: 'Features & Tools',
      questions: [
        {
          q: 'What are the Daily Health Tools?',
          a: 'Our Daily Health Tools include: (1) Daily Calorie Calculator - estimates your daily calorie needs, (2) Water Intake Tracker - calculates recommended daily water consumption, and (3) Step Counter Goal - determines your ideal daily step count. All tools are free to use.'
        },
        {
          q: 'What are nutrition recommendations?',
          a: 'After unlocking a detailed report, you receive personalized nutrition plans tailored to your health profile. These include specific food recommendations, meal timing, portion sizes, and dietary modifications to help improve your health scores.'
        },
        {
          q: 'Can I download my reports?',
          a: 'Yes! All detailed reports and nutrition recommendations can be downloaded as PDF files for easy reference and sharing with your healthcare provider.'
        },
        {
          q: 'How does monthly health tracking work?',
          a: 'With a monthly subscription (₹199/month), we track your health assessments over time, identify trends, and provide updated recommendations as your health evolves. You\'ll receive monthly progress reports and personalized guidance.'
        },
        {
          q: 'Is there a mobile app?',
          a: 'Currently, HealthScore AI is a responsive web application that works seamlessly on mobile browsers. A dedicated mobile app is in development and will be available soon.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'I\'m having trouble logging in. What should I do?',
          a: 'Try resetting your password using the "Forgot Password" link on the login page. If issues persist, clear your browser cache and cookies, or try a different browser. Contact support@healthscore-ai.com if problems continue.'
        },
        {
          q: 'My payment failed. What should I do?',
          a: 'Payment failures can occur due to insufficient funds, bank restrictions, or technical issues. Try using a different payment method or card. If the problem persists, contact your bank and our support team at support@healthscore-ai.com.'
        },
        {
          q: 'I didn\'t receive my report. Where is it?',
          a: 'Check your registered email inbox (and spam folder) for the report. If you still can\'t find it, log into your account dashboard where all reports are stored. Contact support if you need assistance accessing your reports.'
        },
        {
          q: 'The website is loading slowly. Why?',
          a: 'Slow loading can be due to internet connectivity, browser issues, or high server traffic. Try refreshing the page, clearing your browser cache, or using a different browser. If issues persist, contact our technical team.'
        }
      ]
    },
    {
      category: 'Account Management',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'You don\'t need to create an account to take free assessments. An account is automatically created when you unlock your first detailed report or subscribe. You\'ll receive login credentials via email.'
        },
        {
          q: 'Can I change my email address?',
          a: 'Yes. Log into your account dashboard and navigate to Account Settings to update your email address. You\'ll receive a verification email to confirm the change.'
        },
        {
          q: 'How do I cancel my subscription?',
          a: 'Log into your account, go to Subscription Settings, and click "Cancel Subscription." Confirm the cancellation when prompted. Your access continues until the end of the current billing period.'
        },
        {
          q: 'Can I share my account with family members?',
          a: 'Accounts are intended for individual use. Each person should have their own account for accurate health tracking and personalized recommendations. Consider our family plans (coming soon) for multiple users.'
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about HealthScore AI health assessments, pricing, privacy, features, and technical support."
        url="https://healthscore-ai.com/faq"
      />
      
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
            <Link to="/" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about HealthScore AI. Can't find what you're looking for? <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link>.
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* FAQs */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-8">
              {filteredFAQs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl text-gray-900 mb-4 pb-2 border-b-2 border-blue-100">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem 
                        key={qIdx} 
                        value={`item-${idx}-${qIdx}`}
                        className="border-2 border-gray-200 rounded-lg px-6 hover:border-blue-300 transition-colors"
                      >
                        <AccordionTrigger className="text-left text-lg text-gray-900 hover:text-blue-600 py-4">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 pb-4 leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No results found for "{searchQuery}". Try different keywords or <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> directly.
              </p>
            </div>
          )}

          {/* Still Need Help */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 text-center border-2 border-blue-100">
            <h3 className="text-2xl text-gray-900 mb-4">Still Need Help?</h3>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Our support team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@healthscore-ai.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
