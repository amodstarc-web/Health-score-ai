import { motion } from 'motion/react';
import { ClipboardList, Brain, FileText } from 'lucide-react';
import { Card } from './ui/card';

export function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Enter your body details',
      description: 'Fill in your age, height, weight, and lifestyle information',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Brain,
      title: 'AI analyzes your health metrics',
      description: 'Our advanced AI processes your data instantly',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: 'Get your health report and metabolic age',
      description: 'Receive a comprehensive health assessment with actionable insights',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your complete health assessment in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full border-2 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <step.icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
