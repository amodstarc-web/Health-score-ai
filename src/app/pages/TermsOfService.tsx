import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Terms of Service"
        description="HealthScore AI Terms of Service - Understand the terms and conditions for using our health assessment platform."
        url="https://healthscore-ai.com/terms-of-service"
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
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: March 14, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using HealthScore AI ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
              <p className="text-gray-700 mb-4">
                These terms constitute a legally binding agreement between you and HealthScore AI. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">2. Medical Disclaimer</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4">
                <p className="text-gray-900 mb-2"><strong>IMPORTANT: HealthScore AI is NOT a medical service.</strong></p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Our assessments are for informational and educational purposes only</li>
                  <li>Results do not constitute medical advice, diagnosis, or treatment</li>
                  <li>Always consult qualified healthcare professionals for medical decisions</li>
                  <li>Do not disregard professional medical advice based on our assessments</li>
                  <li>In case of medical emergencies, contact emergency services immediately</li>
                  <li>We are not liable for any health outcomes based on your use of our platform</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">3. Eligibility</h2>
              <p className="text-gray-700 mb-4">
                You must be at least 18 years old to use HealthScore AI. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">4. User Accounts and Subscriptions</h2>
              
              <h3 className="text-xl text-gray-900 mb-3">4.1 Account Registration</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">4.2 Subscription Plans</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Free Access:</strong> Limited preview of health assessments</li>
                <li><strong>Pay-Per-Report:</strong> One-time payment to unlock detailed reports (non-refundable after unlock)</li>
                <li><strong>Monthly Subscription (₹199/month):</strong> Access to monthly health tracking and personalized recommendations</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">4.3 Billing and Payments</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>All fees are in Indian Rupees (INR)</li>
                <li>Subscription fees are billed monthly in advance</li>
                <li>You authorize us to charge your payment method automatically</li>
                <li>Price changes will be notified 30 days in advance</li>
                <li>Payments are processed securely through third-party payment gateways</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">4.4 Cancellation and Refunds</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Monthly subscriptions can be cancelled anytime</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial months or unused portions</li>
                <li>One-time report unlocks are final and non-refundable</li>
                <li>Refunds may be issued at our sole discretion for technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape, copy, or reverse engineer our platform</li>
                <li>Share your account with others</li>
                <li>Submit false or misleading information</li>
                <li>Use the Service to practice medicine or provide medical advice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, features, algorithms, and functionality of HealthScore AI are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Copy, modify, or create derivative works</li>
                <li>Distribute, sell, or transfer any part of the Service</li>
                <li>Use our trademarks without written permission</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">7. Data Accuracy and Limitations</h2>
              <p className="text-gray-700 mb-4">
                While we strive for accuracy, health assessments are estimates based on algorithms and self-reported data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Results may vary from clinical measurements</li>
                <li>Accuracy depends on the quality of input data</li>
                <li>Individual results may differ significantly</li>
                <li>Recommendations are generalized and may not suit everyone</li>
                <li>We do not guarantee specific health outcomes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>HealthScore AI is provided "AS IS" without warranties of any kind</li>
                <li>We are not liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid in the past 12 months</li>
                <li>We are not responsible for decisions you make based on our assessments</li>
                <li>We are not liable for health outcomes, injuries, or losses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless HealthScore AI from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account at any time for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Any reason at our sole discretion</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Service ceases immediately. We may delete your data after account closure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">11. Governing Law and Disputes</h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of India. Any disputes shall be resolved through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Good faith negotiations first</li>
                <li>Binding arbitration if negotiations fail</li>
                <li>Jurisdiction in courts of [Your City, India]</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these Terms periodically. Significant changes will be notified via email or platform notice. Your continued use after changes constitutes acceptance. If you disagree with changes, you must stop using the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms, contact us:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:legal@healthscore-ai.com" className="text-blue-600 hover:underline">legal@healthscore-ai.com</a></li>
                <li><strong>Support:</strong> <a href="mailto:support@healthscore-ai.com" className="text-blue-600 hover:underline">support@healthscore-ai.com</a></li>
              </ul>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
              <p className="text-gray-900">
                <strong>By using HealthScore AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
