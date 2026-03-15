import { motion } from 'motion/react';
import { 
  Activity, 
  TrendingUp, 
  Droplet, 
  Flame, 
  Heart, 
  AlertCircle 
} from 'lucide-react';
import { Card } from './ui/card';

export function HealthMetrics() {
  const metrics = [
    {
      icon: Activity,
      title: 'BMI Score',
      description: 'Calculate your Body Mass Index',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Metabolic Age',
      description: 'Discover your real biological age',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Droplet,
      title: 'Body Fat Estimate',
      description: 'Estimated body fat percentage',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: Flame,
      title: 'Daily Calorie Requirement',
      description: 'Personalized calorie intake plan',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: AlertCircle,
      title: 'Diabetes Risk Indicator',
      description: 'Early warning signs detection',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Heart,
      title: 'Heart Health Score',
      description: 'Cardiovascular wellness assessment',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Health Metrics You Will Discover
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get comprehensive insights into your health with our AI-powered analysis
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                <div className={`w-14 h-14 ${metric.color} rounded-xl flex items-center justify-center mb-4`}>
                  <metric.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg mb-2 text-gray-900">
                  {metric.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {metric.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
