import { Heart, Apple, ArrowLeft, Brain, Eye, Bone, Activity, Droplet, Shield, Zap, Wind, Soup } from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';
import { motion } from 'motion/react';

interface Food {
  name: string;
  benefits: string;
  nutrients: string;
}

interface OrganData {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  foods: Food[];
  description: string;
}

export default function BestFoodsPage() {
  const organs: OrganData[] = [
    {
      name: 'Heart',
      icon: <Heart className="h-6 w-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Strengthen your cardiovascular system with heart-healthy foods rich in omega-3s and antioxidants.',
      foods: [
        {
          name: 'Salmon',
          benefits: 'Reduces inflammation and improves heart rhythm',
          nutrients: 'Omega-3 fatty acids, Vitamin D'
        },
        {
          name: 'Oats',
          benefits: 'Lowers cholesterol and regulates blood sugar',
          nutrients: 'Beta-glucan fiber, Magnesium'
        },
        {
          name: 'Walnuts',
          benefits: 'Improves blood vessel function',
          nutrients: 'Omega-3, Antioxidants'
        },
        {
          name: 'Blueberries',
          benefits: 'Reduces blood pressure and arterial stiffness',
          nutrients: 'Anthocyanins, Vitamin C'
        },
        {
          name: 'Spinach',
          benefits: 'Supports healthy blood pressure',
          nutrients: 'Nitrates, Potassium, Folate'
        },
        {
          name: 'Dark Chocolate',
          benefits: 'Improves blood flow and lowers blood pressure',
          nutrients: 'Flavonoids, Iron'
        }
      ]
    },
    {
      name: 'Brain',
      icon: <Brain className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Boost cognitive function and memory with foods that nourish your brain cells.',
      foods: [
        {
          name: 'Fatty Fish',
          benefits: 'Enhances memory and cognitive function',
          nutrients: 'DHA, EPA, Omega-3'
        },
        {
          name: 'Eggs',
          benefits: 'Improves neurotransmitter function',
          nutrients: 'Choline, B-vitamins'
        },
        {
          name: 'Avocados',
          benefits: 'Supports healthy blood flow to brain',
          nutrients: 'Monounsaturated fats, Vitamin K'
        },
        {
          name: 'Turmeric',
          benefits: 'Reduces brain inflammation and boosts memory',
          nutrients: 'Curcumin, Antioxidants'
        },
        {
          name: 'Broccoli',
          benefits: 'Protects brain from damage',
          nutrients: 'Vitamin K, Antioxidants'
        },
        {
          name: 'Pumpkin Seeds',
          benefits: 'Enhances learning and memory',
          nutrients: 'Zinc, Magnesium, Iron'
        }
      ]
    },
    {
      name: 'Eyes',
      icon: <Eye className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Protect your vision and maintain eye health with nutrient-rich foods.',
      foods: [
        {
          name: 'Carrots',
          benefits: 'Improves night vision and prevents macular degeneration',
          nutrients: 'Beta-carotene, Vitamin A'
        },
        {
          name: 'Kale',
          benefits: 'Protects against eye diseases',
          nutrients: 'Lutein, Zeaxanthin, Vitamin C'
        },
        {
          name: 'Sweet Potatoes',
          benefits: 'Supports retinal health',
          nutrients: 'Beta-carotene, Vitamin E'
        },
        {
          name: 'Citrus Fruits',
          benefits: 'Reduces risk of cataracts',
          nutrients: 'Vitamin C, Antioxidants'
        },
        {
          name: 'Bell Peppers',
          benefits: 'Protects blood vessels in eyes',
          nutrients: 'Vitamin A, C, E'
        },
        {
          name: 'Almonds',
          benefits: 'Slows age-related vision decline',
          nutrients: 'Vitamin E, Healthy fats'
        }
      ]
    },
    {
      name: 'Bones',
      icon: <Bone className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Build and maintain strong bones with calcium-rich and bone-supporting foods.',
      foods: [
        {
          name: 'Milk & Yogurt',
          benefits: 'Builds bone density and strength',
          nutrients: 'Calcium, Vitamin D, Protein'
        },
        {
          name: 'Sardines',
          benefits: 'Strengthens bone structure',
          nutrients: 'Calcium, Vitamin D, Omega-3'
        },
        {
          name: 'Almonds',
          benefits: 'Supports bone mineralization',
          nutrients: 'Calcium, Magnesium, Vitamin E'
        },
        {
          name: 'Broccoli',
          benefits: 'Enhances calcium absorption',
          nutrients: 'Calcium, Vitamin K, C'
        },
        {
          name: 'Tofu',
          benefits: 'Plant-based bone support',
          nutrients: 'Calcium, Protein, Isoflavones'
        },
        {
          name: 'Sesame Seeds',
          benefits: 'Improves bone mineral density',
          nutrients: 'Calcium, Magnesium, Zinc'
        }
      ]
    },
    {
      name: 'Liver',
      icon: <Activity className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Support your body\'s detoxification system with liver-friendly foods.',
      foods: [
        {
          name: 'Beetroot',
          benefits: 'Supports liver detoxification',
          nutrients: 'Betaine, Antioxidants, Fiber'
        },
        {
          name: 'Garlic',
          benefits: 'Activates liver detox enzymes',
          nutrients: 'Allicin, Selenium, Vitamin C'
        },
        {
          name: 'Green Tea',
          benefits: 'Reduces fat accumulation in liver',
          nutrients: 'Catechins, Antioxidants'
        },
        {
          name: 'Leafy Greens',
          benefits: 'Neutralizes heavy metals and toxins',
          nutrients: 'Chlorophyll, Vitamins, Minerals'
        },
        {
          name: 'Turmeric',
          benefits: 'Protects against liver damage',
          nutrients: 'Curcumin, Anti-inflammatory compounds'
        },
        {
          name: 'Walnuts',
          benefits: 'Supports liver cleansing',
          nutrients: 'Omega-3, Glutathione, Arginine'
        }
      ]
    },
    {
      name: 'Kidneys',
      icon: <Droplet className="h-6 w-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Keep your kidneys healthy with foods that support filtration and fluid balance.',
      foods: [
        {
          name: 'Cranberries',
          benefits: 'Prevents urinary tract infections',
          nutrients: 'Antioxidants, Vitamin C'
        },
        {
          name: 'Red Bell Peppers',
          benefits: 'Low in potassium, kidney-friendly',
          nutrients: 'Vitamins A, C, B6, Fiber'
        },
        {
          name: 'Cauliflower',
          benefits: 'Supports kidney detoxification',
          nutrients: 'Vitamin C, Folate, Fiber'
        },
        {
          name: 'Cabbage',
          benefits: 'Reduces kidney inflammation',
          nutrients: 'Vitamin K, C, Fiber'
        },
        {
          name: 'Blueberries',
          benefits: 'Protects kidney function',
          nutrients: 'Antioxidants, Vitamin C'
        },
        {
          name: 'Olive Oil',
          benefits: 'Anti-inflammatory for kidneys',
          nutrients: 'Monounsaturated fats, Antioxidants'
        }
      ]
    },
    {
      name: 'Immune System',
      icon: <Shield className="h-6 w-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Strengthen your immune system with powerful immunity-boosting foods.',
      foods: [
        {
          name: 'Citrus Fruits',
          benefits: 'Boosts white blood cell production',
          nutrients: 'Vitamin C, Antioxidants'
        },
        {
          name: 'Ginger',
          benefits: 'Reduces inflammation and fights infections',
          nutrients: 'Gingerol, Anti-inflammatory compounds'
        },
        {
          name: 'Yogurt',
          benefits: 'Enhances gut immunity',
          nutrients: 'Probiotics, Vitamin D, Protein'
        },
        {
          name: 'Spinach',
          benefits: 'Strengthens immune response',
          nutrients: 'Vitamin C, Antioxidants, Beta-carotene'
        },
        {
          name: 'Mushrooms',
          benefits: 'Activates immune cells',
          nutrients: 'Selenium, B-vitamins, Vitamin D'
        },
        {
          name: 'Almonds',
          benefits: 'Supports immune cell function',
          nutrients: 'Vitamin E, Healthy fats'
        }
      ]
    },
    {
      name: 'Muscles',
      icon: <Zap className="h-6 w-6" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Build and repair muscle tissue with protein-rich and recovery-supporting foods.',
      foods: [
        {
          name: 'Chicken Breast',
          benefits: 'Builds lean muscle mass',
          nutrients: 'Protein, B-vitamins, Selenium'
        },
        {
          name: 'Quinoa',
          benefits: 'Complete plant protein for muscles',
          nutrients: 'Protein, Fiber, Magnesium'
        },
        {
          name: 'Greek Yogurt',
          benefits: 'Aids muscle recovery',
          nutrients: 'Protein, Calcium, Probiotics'
        },
        {
          name: 'Lentils',
          benefits: 'Plant-based muscle building',
          nutrients: 'Protein, Iron, Fiber'
        },
        {
          name: 'Cottage Cheese',
          benefits: 'Slow-release protein for muscles',
          nutrients: 'Casein protein, Calcium'
        },
        {
          name: 'Bananas',
          benefits: 'Prevents muscle cramps',
          nutrients: 'Potassium, Carbohydrates, Vitamin B6'
        }
      ]
    },
    {
      name: 'Lungs',
      icon: <Wind className="h-6 w-6" />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Support respiratory health and lung function with these beneficial foods.',
      foods: [
        {
          name: 'Apples',
          benefits: 'Improves lung function and reduces inflammation',
          nutrients: 'Quercetin, Vitamin C, Antioxidants'
        },
        {
          name: 'Tomatoes',
          benefits: 'Reduces airway inflammation',
          nutrients: 'Lycopene, Vitamin C, Potassium'
        },
        {
          name: 'Pumpkin',
          benefits: 'Supports lung tissue health',
          nutrients: 'Beta-carotene, Vitamin C, E'
        },
        {
          name: 'Turmeric',
          benefits: 'Anti-inflammatory for airways',
          nutrients: 'Curcumin, Antioxidants'
        },
        {
          name: 'Beets',
          benefits: 'Improves oxygen uptake',
          nutrients: 'Nitrates, Antioxidants'
        },
        {
          name: 'Green Tea',
          benefits: 'Protects lung tissue',
          nutrients: 'EGCG, Antioxidants'
        }
      ]
    },
    {
      name: 'Digestive System',
      icon: <Soup className="h-6 w-6" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      description: 'Promote healthy digestion and gut health with these digestive-friendly foods.',
      foods: [
        {
          name: 'Kimchi',
          benefits: 'Improves gut bacteria balance',
          nutrients: 'Probiotics, Fiber, Vitamins'
        },
        {
          name: 'Ginger',
          benefits: 'Reduces nausea and aids digestion',
          nutrients: 'Gingerol, Anti-inflammatory compounds'
        },
        {
          name: 'Papaya',
          benefits: 'Breaks down proteins for easier digestion',
          nutrients: 'Papain enzyme, Fiber, Vitamin C'
        },
        {
          name: 'Whole Grains',
          benefits: 'Feeds beneficial gut bacteria',
          nutrients: 'Fiber, B-vitamins, Minerals'
        },
        {
          name: 'Kefir',
          benefits: 'Restores healthy gut flora',
          nutrients: 'Probiotics, Protein, Calcium'
        },
        {
          name: 'Fennel Seeds',
          benefits: 'Reduces bloating and gas',
          nutrients: 'Fiber, Antioxidants, Essential oils'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Apple className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700">Nutrition Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Best Foods for Your Body's Organs
            </h1>
            <p className="text-lg text-gray-600">
              Discover the most beneficial foods for each organ system and learn how proper nutrition can optimize your health
            </p>
          </motion.div>
        </div>
      </section>

      {/* Organs Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-12">
            {organs.map((organ, index) => (
              <motion.div
                key={organ.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                {/* Organ Header */}
                <div className={`${organ.bgColor} p-6 border-b border-gray-100`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`${organ.color} ${organ.bgColor} p-3 rounded-xl`}>
                      {organ.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">{organ.name}</h2>
                      <p className="text-sm text-gray-600 mt-1">{organ.description}</p>
                    </div>
                  </div>
                </div>

                {/* Foods Grid */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organ.foods.map((food, foodIndex) => (
                      <motion.div
                        key={foodIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: foodIndex * 0.05 }}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg text-gray-900 mb-2">{food.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{food.benefits}</p>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 ${organ.bgColor} ${organ.color} rounded-full text-xs`}>
                          <Apple className="h-3 w-3" />
                          {food.nutrients}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl mb-4">Want to Know Your Personal Health Score?</h2>
            <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
              Get personalized health insights and recommendations based on your unique body metrics
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              Take Your Health Test
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}