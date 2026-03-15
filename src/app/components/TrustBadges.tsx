import { motion } from 'motion/react';
import { Shield, Award, Users, Star, CheckCircle2, TrendingUp } from 'lucide-react';

export function TrustBadges() {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {/* Badge 1 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">10,000+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          {/* Badge 2 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">94%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          {/* Badge 3 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          {/* Badge 4 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">Verified</div>
              <div className="text-sm text-gray-600">Clinical Data</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          {/* Badge 5 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Secure & Private</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
