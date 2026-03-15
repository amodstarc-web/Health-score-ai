import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Refund Policy"
        description="HealthScore AI Refund Policy - Understand our refund and cancellation policies for paid services."
        url="https://healthscore-ai.com/refund-policy"
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
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">Refund & Cancellation Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: March 15, 2026</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">1. Overview</h2>
              <p className="text-gray-700 mb-4">
                At HealthScore AI, we strive to provide high-quality health assessment services. This Refund & Cancellation Policy outlines the terms for refunds and cancellations for our paid services. Please read this policy carefully before making a purchase.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">2. One-Time Report Unlocks (₹199 per test)</h2>
              
              <h3 className="text-xl text-gray-900 mb-3">2.1 Non-Refundable Policy</h3>
              <p className="text-gray-700 mb-4">
                One-time purchases to unlock detailed health assessment reports are <strong>final and non-refundable</strong> once the report has been accessed or unlocked. This is because:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Digital content is delivered instantly</li>
                <li>You gain immediate access to comprehensive health insights</li>
                <li>Reports include personalized recommendations that cannot be "returned"</li>
                <li>The service is considered "consumed" upon access</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">2.2 Exceptions</h3>
              <p className="text-gray-700 mb-4">
                Refunds for one-time purchases may be considered ONLY in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Technical Issues:</strong> If you were charged but did not receive access to the report due to technical errors on our end</li>
                <li><strong>Duplicate Charges:</strong> If you were accidentally charged multiple times for the same report</li>
                <li><strong>Unauthorized Transactions:</strong> If the charge was made without your authorization (subject to verification)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                In these cases, please contact us within 48 hours of the transaction at <a href="mailto:support@healthscore-ai.com" className="text-blue-600 hover:underline">support@healthscore-ai.com</a> with your transaction details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">3. Monthly Subscription (₹299/month)</h2>
              
              <h3 className="text-xl text-gray-900 mb-3">3.1 Cancellation Policy</h3>
              <p className="text-gray-700 mb-4">
                You can cancel your monthly subscription at any time:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Cancellation can be done through your account dashboard or by contacting support</li>
                <li>Cancellation takes effect at the end of your current billing cycle</li>
                <li>You will retain access to premium features until the end of the paid period</li>
                <li>No further charges will be made after cancellation</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">3.2 Refund Policy for Subscriptions</h3>
              <p className="text-gray-700 mb-4">
                Monthly subscriptions are generally <strong>non-refundable</strong>:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>No refunds for partial months or unused portions of the subscription period</li>
                <li>No pro-rated refunds if you cancel mid-cycle</li>
                <li>Subscription fees are billed in advance and cover the entire month</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">3.3 Exceptions for Subscription Refunds</h3>
              <p className="text-gray-700 mb-4">
                Refunds may be issued at our sole discretion in these situations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Technical Issues:</strong> If the service was unavailable for an extended period during your subscription</li>
                <li><strong>Billing Errors:</strong> If you were incorrectly charged after cancellation</li>
                <li><strong>First-Time Subscribers:</strong> Within 7 days of initial subscription if you have not accessed premium features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">4. How to Request a Refund</h2>
              <p className="text-gray-700 mb-4">
                If you believe you are eligible for a refund based on the exceptions mentioned above:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-3">
                <li>
                  <strong>Contact Support:</strong> Email us at <a href="mailto:support@healthscore-ai.com" className="text-blue-600 hover:underline">support@healthscore-ai.com</a>
                </li>
                <li>
                  <strong>Include Details:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your registered email address</li>
                    <li>Transaction ID or payment receipt</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Screenshots of any technical issues (if applicable)</li>
                  </ul>
                </li>
                <li>
                  <strong>Processing Time:</strong> We will review your request within 3-5 business days
                </li>
                <li>
                  <strong>Decision:</strong> You will receive a response via email with our decision
                </li>
                <li>
                  <strong>Refund Timeline:</strong> If approved, refunds are processed within 7-10 business days and credited to your original payment method
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">5. Payment Issues and Disputes</h2>
              
              <h3 className="text-xl text-gray-900 mb-3">5.1 Failed Transactions</h3>
              <p className="text-gray-700 mb-4">
                If your payment was deducted from your account but you did not receive access:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Contact us immediately with transaction proof</li>
                <li>We will investigate and either grant access or process a refund within 48 hours</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3">5.2 Chargebacks</h3>
              <p className="text-gray-700 mb-4">
                If you initiate a chargeback with your bank or payment provider:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Please contact us first to resolve the issue</li>
                <li>Chargebacks may result in immediate suspension of your account</li>
                <li>We reserve the right to dispute invalid chargebacks</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">6. Auto-Renewal and Billing</h2>
              <p className="text-gray-700 mb-4">
                For monthly subscriptions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Subscriptions automatically renew each month unless cancelled</li>
                <li>You will receive a reminder email 3 days before renewal</li>
                <li>You are responsible for cancelling before the renewal date to avoid charges</li>
                <li>We are not responsible for renewal charges if you forgot to cancel</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">7. Service Modifications</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Modify pricing with 30 days advance notice</li>
                <li>Change features included in paid plans</li>
                <li>Discontinue certain services (with appropriate notice and refund options)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                If we make significant changes that negatively affect your subscription, you may be eligible for a pro-rated refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">8. Account Termination</h2>
              <p className="text-gray-700 mb-4">
                If we terminate your account due to violations of our Terms of Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>No refunds will be issued</li>
                <li>All access to paid content will be revoked immediately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">9. Currency and Exchange Rates</h2>
              <p className="text-gray-700 mb-4">
                All prices are in Indian Rupees (INR). If you pay in a different currency:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Currency conversion is handled by your payment provider</li>
                <li>Exchange rate fluctuations are not grounds for refunds</li>
                <li>Any conversion fees are your responsibility</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Refund Policy from time to time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For refund requests, billing questions, or cancellation assistance:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:support@healthscore-ai.com" className="text-blue-600 hover:underline">support@healthscore-ai.com</a></li>
                <li><strong>Subject Line:</strong> "Refund Request - [Your Transaction ID]"</li>
                <li><strong>Response Time:</strong> Within 24-48 hours during business days</li>
              </ul>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
              <p className="text-gray-900 mb-2">
                <strong>Important Reminder:</strong>
              </p>
              <p className="text-gray-700">
                Before making a purchase, please ensure you understand our refund policy. All sales are considered final except in the specific cases outlined above. We recommend trying our free preview features before purchasing to ensure our service meets your needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
