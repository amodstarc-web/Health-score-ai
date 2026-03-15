import { motion } from 'motion/react';
import { Apple, ArrowRight, Heart, Brain, Eye } from 'lucide-react';
import { Link } from 'react-router';

export function BestFoodsCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10">
              <Apple className="h-20 w-20 text-white" />
            </div>
            <div className="absolute bottom-10 right-10">
              <Heart className="h-16 w-16 text-white" />
            </div>
            <div className="absolute top-20 right-20">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div className="absolute bottom-20 left-20">
              <Eye className="h-14 w-14 text-white" />
            </div>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Apple className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Nutrition Guide</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                Discover the Best Foods for Every Organ
              </h2>
              <p className="text-blue-50 text-lg mb-6">
                Learn which foods can strengthen your heart, boost your brain, improve vision, and support all your vital organs with our comprehensive nutrition guide.
              </p>
              <Link
                to="/best-foods"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl group"
              >
                Explore Best Foods
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Content - Food Icons Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Heart className="h-6 w-6" />, label: 'Heart' },
                { icon: <Brain className="h-6 w-6" />, label: 'Brain' },
                { icon: <Eye className="h-6 w-6" />, label: 'Eyes' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
                >
                  <div className="flex justify-center mb-2 text-white">
                    {item.icon}
                  </div>
                  <p className="text-white text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
