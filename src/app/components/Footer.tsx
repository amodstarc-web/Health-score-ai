import { Heart, Mail } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-white">HealthScore AI</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md mb-4">
              Your trusted AI-powered health assessment platform. Get instant insights into your body health score, 
              metabolic age, and personalized wellness recommendations.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@healthscore-ai.com" className="hover:text-white transition-colors">
                  support@healthscore-ai.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 HealthScore AI. All rights reserved.</p>
          <p className="mt-2">
            This tool provides wellness insights and is not a substitute for professional medical advice, 
            diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}