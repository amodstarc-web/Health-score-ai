import { motion } from 'motion/react';
import { ChefHat, Calendar, TrendingUp, Apple, Target, CheckCircle2, ArrowRight, Utensils, Clock } from 'lucide-react';

export function DietPlanCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
            <ChefHat className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-700">Personalized Nutrition</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Get Your Custom Diet Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock a scientifically-designed nutrition plan tailored to your unique body metrics and health goals
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl text-gray-900 mb-6">What You'll Get:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900 mb-1">Daily Meal Schedules</h4>
                    <p className="text-sm text-gray-600">
                      Complete breakfast, lunch, dinner, and snack plans with exact timings for optimal metabolism
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-xl flex-shrink-0">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900 mb-1">Precise Calorie Targets</h4>
                    <p className="text-sm text-gray-600">
                      Customized daily calorie goals and macro breakdowns (protein, carbs, fats) for your body type
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-xl flex-shrink-0">
                    <Apple className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900 mb-1">Food Recommendations</h4>
                    <p className="text-sm text-gray-600">
                      Specific foods tailored to your health goals - weight loss, gain, or maintenance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900 mb-1">Exercise Integration</h4>
                    <p className="text-sm text-gray-600">
                      Matching workout plans based on your activity level and fitness goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Sample Meal Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Utensils className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      7:00 AM
                    </div>
                    <h4 className="text-lg text-gray-900">Power Breakfast</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-blue-600">450</p>
                  <p className="text-xs text-gray-500">calories</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  3 egg whites + 1 whole egg omelette
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Spinach & tomatoes
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  2 slices whole wheat toast
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  Green tea
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">
                  Protein: 35g
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                  Carbs: 42g
                </span>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs">
                  Fats: 15g
                </span>
              </div>
            </div>

            {/* Sample Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white text-center shadow-lg">
                <p className="text-2xl mb-1">1800</p>
                <p className="text-xs text-blue-100">Daily Calories</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white text-center shadow-lg">
                <p className="text-2xl mb-1">5-6</p>
                <p className="text-xs text-green-100">Meals/Day</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white text-center shadow-lg">
                <p className="text-2xl mb-1">100%</p>
                <p className="text-xs text-purple-100">Customized</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg">Science-Backed Nutrition</h4>
                  <p className="text-sm text-blue-100">Based on WHO & NIH guidelines</p>
                </div>
              </div>
              <p className="text-sm text-blue-50">
                Our diet plans are created using validated nutritional algorithms and reviewed by certified nutritionists
              </p>
            </div>
          </motion.div>
        </div>

        {/* How It Works Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl text-gray-900 mb-8 text-center">How It Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full text-white text-2xl mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-lg text-gray-900 mb-2">Complete Health Test</h4>
              <p className="text-sm text-gray-600">
                Enter your body metrics and lifestyle data in our quick 2-minute assessment
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full text-white text-2xl mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-lg text-gray-900 mb-2">Get Your Health Score</h4>
              <p className="text-sm text-gray-600">
                Receive instant results with your body health score and personalized insights
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full text-white text-2xl mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-lg text-gray-900 mb-2">Access Diet Plan</h4>
              <p className="text-sm text-gray-600">
                Click "Get Diet Plan" to receive your customized meal plan and nutrition guide
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#health-test"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('health-test')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <ChefHat className="h-5 w-5" />
            Start Your Health Test Now
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Free • No signup required • Instant results
          </p>
        </motion.div>
      </div>
    </section>
  );
}