import { motion } from 'motion/react';
import { Award, Users, Shield, TrendingUp, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { Card } from './ui/card';

export function CredentialsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-5 py-2.5 rounded-full text-sm mb-5">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Trusted Healthcare Intelligence Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
            Evidence-Based Health Assessments You Can Trust
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines clinical research with cutting-edge technology to deliver medical-grade insights accessible to everyone
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 text-center bg-white border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl text-blue-600 mb-2">10,000+</div>
              <div className="text-lg text-gray-900 mb-2">Health Assessments Completed</div>
              <p className="text-sm text-gray-600">
                Thousands have discovered their true health status and transformed their lives with our comprehensive analysis
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 text-center bg-white border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl text-green-600 mb-2">94%</div>
              <div className="text-lg text-gray-900 mb-2">Experienced Measurable Improvements</div>
              <p className="text-sm text-gray-600">
                Users who followed our personalized recommendations reported significant health improvements within 90 days
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-8 text-center bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl text-purple-600 mb-2">4.9/5</div>
              <div className="text-lg text-gray-900 mb-2">Average User Rating</div>
              <p className="text-sm text-gray-600">
                Consistently rated excellent for accuracy, ease of use, and actionable insights by our community
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Credentials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">Clinically Validated</h3>
                <p className="text-sm text-gray-600">
                  Algorithms validated against peer-reviewed clinical research and biomarker data
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border border-green-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">Data Privacy First</h3>
                <p className="text-sm text-gray-600">
                  Your health information remains completely private and secure with industry-leading encryption
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">Expert-Designed</h3>
                <p className="text-sm text-gray-600">
                  Developed in collaboration with nutritionists, physicians, and health technology specialists
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border border-orange-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-medium mb-1">AI-Powered Precision</h3>
                <p className="text-sm text-gray-600">
                  Advanced machine learning delivers personalized insights tailored to your unique profile
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg">No Hidden Charges</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg">Instant Results</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg">100% Private & Secure</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg">Scientifically Backed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
