import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft, Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Contact Us - Get in Touch with HealthScore AI"
        description="Have questions about HealthScore AI? Contact our support team for help with health assessments, subscriptions, or general inquiries."
        url="https://healthscore-ai.com/contact"
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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need support? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Methods */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-3">
                For general inquiries and support
              </p>
              <a 
                href="mailto:support@healthscore-ai.com"
                className="text-blue-600 hover:underline"
              >
                support@healthscore-ai.com
              </a>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">
                Chat with our AI assistant
              </p>
              <button 
                onClick={() => {
                  // This would trigger the chatbot
                  const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
                  chatButton?.click();
                }}
                className="text-green-600 hover:underline"
              >
                Start Chat
              </button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2 border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm mb-3">
                Browse FAQs and guides
              </p>
              <Link 
                to="/faq"
                className="text-purple-600 hover:underline"
              >
                Visit FAQ
              </Link>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 border-2 border-blue-100">
              <h2 className="text-3xl text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-700">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="privacy">Privacy & Data Concerns</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 text-lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl text-gray-900 mb-6">Other Ways to Reach Us</h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-gray-700">
              <div>
                <div className="text-sm text-gray-600 mb-1">Technical Issues</div>
                <a href="mailto:tech@healthscore-ai.com" className="text-blue-600 hover:underline">
                  tech@healthscore-ai.com
                </a>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Business Inquiries</div>
                <a href="mailto:business@healthscore-ai.com" className="text-blue-600 hover:underline">
                  business@healthscore-ai.com
                </a>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Privacy Concerns</div>
                <a href="mailto:privacy@healthscore-ai.com" className="text-blue-600 hover:underline">
                  privacy@healthscore-ai.com
                </a>
              </div>
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="mt-12 bg-blue-50 border-2 border-blue-100 rounded-xl p-6 text-center">
            <p className="text-gray-700">
              <strong>Response Time:</strong> We typically respond within 24 hours during business days (Monday-Friday, 9 AM - 6 PM IST).
              For urgent technical issues, please use the live chat feature for faster assistance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
