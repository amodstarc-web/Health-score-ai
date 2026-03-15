import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Privacy Policy"
        description="HealthScore AI Privacy Policy - Learn how we collect, use, and protect your health data. We prioritize your privacy and security."
        url="https://healthscore-ai.com/privacy-policy"
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
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: March 14, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to HealthScore AI. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our health assessment platform.
              </p>
              <p className="text-gray-700 mb-4">
                By using HealthScore AI, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Contact Information:</strong> Email address, phone number (if provided)</li>
                <li><strong>Health Data:</strong> Age, gender, height, weight, waist circumference, activity level, sleep hours, smoking status</li>
                <li><strong>Assessment Results:</strong> Health scores, metabolic age, body fat percentage, risk assessments</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, interactions with the platform</li>
                <li><strong>Payment Information:</strong> Processed securely through third-party payment processors (we do not store complete card details)</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address and browser type</li>
                <li>Device information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Providing health assessments and personalized recommendations</li>
                <li>Processing payments for premium features and subscriptions</li>
                <li>Sending you test results and nutrition plans via email</li>
                <li>Improving our algorithms and services</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Communicating updates, promotions, and health tips (you can opt-out anytime)</li>
                <li>Ensuring platform security and preventing fraud</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We DO NOT sell your personal health data to third parties. We may share information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (payment processors, email services, hosting providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Encryption of data in transit (SSL/TLS)</li>
                <li>Secure cloud storage with encryption at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing (PCI DSS compliant processors)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Withdraw Consent:</strong> Revoke consent for data processing</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us at: <a href="mailto:privacy@healthscore-ai.com" className="text-blue-600 hover:underline">privacy@healthscore-ai.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Health assessment data is retained for the duration of your active subscription plus 2 years for record-keeping purposes, unless you request earlier deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser. Note that disabling cookies may affect platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                HealthScore AI is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete the information immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or prominent notice on our platform. Your continued use after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:privacy@healthscore-ai.com" className="text-blue-600 hover:underline">privacy@healthscore-ai.com</a></li>
                <li><strong>Support:</strong> <a href="mailto:support@healthscore-ai.com" className="text-blue-600 hover:underline">support@healthscore-ai.com</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
