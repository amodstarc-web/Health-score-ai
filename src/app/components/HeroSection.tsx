import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Heart, Brain, Activity, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onStartTest: () => void;
}

export function HeroSection({ onStartTest }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Check Your Real Body Health Score in 2 Minutes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover your metabolic age, body fat level, and hidden health risks instantly.
            </p>
            <Button
              onClick={onStartTest}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Start My Health Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>2 Min Test</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI-Powered</span>
              </div>
            </div>

            {/* Social Proof Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-green-100"
            >
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM1MDQ5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1704927768421-bc9549b5097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MzQ4ODcxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1648577735298-385ccb9755c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczNTA0OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzczNTA1MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-2xl text-blue-600">10,000+</span>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">users discovered their health scores</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Health Facts Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Fact Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl text-gray-900 mb-2">80%</div>
                <p className="text-sm text-gray-600">
                  of heart diseases are preventable with early detection
                </p>
              </motion.div>

              {/* Fact Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl text-gray-900 mb-2">15 years</div>
                <p className="text-sm text-gray-600">
                  Your biological age can differ from your actual age
                </p>
              </motion.div>

              {/* Fact Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl text-gray-900 mb-2">65%</div>
                <p className="text-sm text-gray-600">
                  of people have unhealthy body fat levels without knowing
                </p>
              </motion.div>

              {/* Fact Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl text-gray-900 mb-2">10 years</div>
                <p className="text-sm text-gray-600">
                  Healthy habits can add a decade to your lifespan
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}