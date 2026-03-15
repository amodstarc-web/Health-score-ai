import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Heart, TrendingUp, Calendar, Target, Bell, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export function SubscriptionCTA() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/30">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Unlock Premium Features</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl text-white mb-4">
            Track Your Health Journey Every Month
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Subscribe for unlimited access to all health tests, personalized monthly tracking, and expert nutrition recommendations.
          </p>

          {/* Pricing Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-white/50"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-5xl lg:text-6xl text-gray-900">₹299</div>
              <div className="text-left">
                <div className="text-gray-600">/month</div>
                <div className="text-xs text-gray-500">Cancel anytime</div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Unlimited health tests monthly</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">WhatsApp support & motivation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Clean diet plans & recipes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Monthly progress tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Personalized nutrition plans</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Daily wellness tips & reminders</span>
              </div>
            </div>

            <Link to="/subscription">
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                Start Your Health Journey
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>

            <p className="text-xs text-gray-500 mt-4">
              🎁 First month includes free personalized health report worth ₹500
            </p>
          </motion.div>
        </motion.div>

        {/* Cost Savings Highlight - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 mb-12 shadow-2xl"
        >
          <div className="text-center text-gray-900">
            <h3 className="text-2xl lg:text-3xl mb-4">💰 Save ₹894 Every Month!</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm mb-2 opacity-90">❌ Without Subscription:</p>
                <ul className="text-sm space-y-1">
                  <li>• 6 Health Tests: ₹199 × 6 = ₹1,194</li>
                  <li>• Total Cost: <strong className="text-xl">₹1,194/month</strong></li>
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm mb-2 opacity-90">✅ With Subscription:</p>
                <ul className="text-sm space-y-1">
                  <li>• Unlimited Tests + WhatsApp Support</li>
                  <li>• Monthly Cost: <strong className="text-xl text-green-700">₹299/month</strong></li>
                  <li className="text-green-700 font-semibold">💚 You Save: ₹894!</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-lg">
              <strong>Plus:</strong> Direct WhatsApp access for motivation, clean diet recommendations, and personalized guidance! 📱
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Calendar,
              title: 'Monthly Health Tracking',
              description: 'Complete all 6 health tests each month and see your progress over time',
            },
            {
              icon: TrendingUp,
              title: 'Progress Analytics',
              description: 'Visual charts and insights showing improvements in your health metrics',
            },
            {
              icon: Target,
              title: 'Personalized Goals',
              description: 'Set and track monthly health goals with expert recommendations',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block">
            <p className="text-white text-lg mb-2">
              <strong>Individual Tests:</strong> ₹254 one-time only
            </p>
            <p className="text-blue-100 text-lg">
              <strong>Subscription:</strong> ₹199/month for unlimited tests + tracking + recommendations
            </p>
            <div className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full inline-block text-sm">
              Better value for continuous health improvement! 💪
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}