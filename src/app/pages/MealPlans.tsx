import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, ArrowLeft, CheckCircle2, Clock, Users, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  servings: string;
  color: string;
  bgColor: string;
  meals: {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }[];
}

export default function MealPlans() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const mealPlans: MealPlan[] = [
    {
      id: 'heart-healthy',
      name: 'Heart-Healthy Plan',
      description: 'Designed to support cardiovascular health with omega-3 rich foods and low sodium options',
      duration: '7 days',
      servings: '1 person',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Oatmeal with blueberries and walnuts, Green tea',
          lunch: 'Grilled salmon salad with mixed greens, olive oil dressing',
          dinner: 'Baked chicken breast, quinoa, steamed broccoli',
          snacks: 'Apple slices with almond butter'
        },
        {
          day: 'Tuesday',
          breakfast: 'Greek yogurt with strawberries and chia seeds',
          lunch: 'Tuna wrap with whole wheat tortilla, lettuce, tomatoes',
          dinner: 'Grilled fish with brown rice and asparagus',
          snacks: 'Handful of mixed nuts'
        },
        {
          day: 'Wednesday',
          breakfast: 'Smoothie bowl with banana, spinach, and flaxseeds',
          lunch: 'Chickpea salad with cucumber, tomatoes, and lemon dressing',
          dinner: 'Turkey breast with sweet potato and green beans',
          snacks: 'Carrot sticks with hummus'
        },
        {
          day: 'Thursday',
          breakfast: 'Whole grain toast with avocado and poached egg',
          lunch: 'Grilled chicken Caesar salad (light dressing)',
          dinner: 'Baked salmon with quinoa and roasted vegetables',
          snacks: 'Fresh berries'
        },
        {
          day: 'Friday',
          breakfast: 'Protein smoothie with almond milk and berries',
          lunch: 'Lentil soup with whole grain bread',
          dinner: 'Grilled lean steak with sweet potato and Brussels sprouts',
          snacks: 'Greek yogurt'
        },
        {
          day: 'Saturday',
          breakfast: 'Scrambled eggs with spinach and whole grain toast',
          lunch: 'Mediterranean bowl with falafel, hummus, and vegetables',
          dinner: 'Baked cod with wild rice and steamed vegetables',
          snacks: 'Trail mix (unsalted)'
        },
        {
          day: 'Sunday',
          breakfast: 'Chia pudding with mango and coconut flakes',
          lunch: 'Grilled chicken with quinoa tabbouleh',
          dinner: 'Roasted salmon with cauliflower rice and green beans',
          snacks: 'Sliced cucumber with tzatziki'
        }
      ]
    },
    {
      id: 'weight-loss',
      name: 'Weight Loss Plan',
      description: 'Calorie-controlled meals focusing on lean proteins and high-fiber foods',
      duration: '7 days',
      servings: '1 person',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Egg white omelet with vegetables, whole grain toast',
          lunch: 'Grilled chicken salad with balsamic vinegar',
          dinner: 'Grilled fish with steamed vegetables',
          snacks: 'Celery sticks, apple'
        },
        {
          day: 'Tuesday',
          breakfast: 'Low-fat Greek yogurt with berries',
          lunch: 'Turkey and vegetable wrap (whole wheat)',
          dinner: 'Baked chicken breast with cauliflower rice',
          snacks: 'Cucumber slices, handful of almonds'
        },
        {
          day: 'Wednesday',
          breakfast: 'Green smoothie with protein powder',
          lunch: 'Tuna salad with mixed greens',
          dinner: 'Grilled turkey with zucchini noodles',
          snacks: 'Cherry tomatoes, string cheese'
        },
        {
          day: 'Thursday',
          breakfast: 'Oatmeal with cinnamon and sliced apple',
          lunch: 'Grilled chicken with roasted vegetables',
          dinner: 'Baked salmon with asparagus',
          snacks: 'Hard-boiled egg, bell pepper strips'
        },
        {
          day: 'Friday',
          breakfast: 'Protein shake with spinach and berries',
          lunch: 'Shrimp salad with lemon dressing',
          dinner: 'Lean beef stir-fry with broccoli',
          snacks: 'Low-fat cottage cheese, strawberries'
        },
        {
          day: 'Saturday',
          breakfast: 'Veggie scramble with egg whites',
          lunch: 'Grilled chicken with mixed green salad',
          dinner: 'Baked cod with roasted Brussels sprouts',
          snacks: 'Sliced cucumber, walnuts'
        },
        {
          day: 'Sunday',
          breakfast: 'Chia seed pudding with almond milk',
          lunch: 'Turkey lettuce wraps with vegetables',
          dinner: 'Grilled shrimp with cauliflower mash',
          snacks: 'Baby carrots, hummus'
        }
      ]
    },
    {
      id: 'energy-boost',
      name: 'Energy Boost Plan',
      description: 'Nutrient-dense meals designed to maintain steady energy levels throughout the day',
      duration: '7 days',
      servings: '1 person',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Banana oat pancakes with honey, Green tea',
          lunch: 'Quinoa bowl with chickpeas, avocado, and tahini',
          dinner: 'Grilled salmon with sweet potato and spinach',
          snacks: 'Energy balls (dates, nuts, cocoa)'
        },
        {
          day: 'Tuesday',
          breakfast: 'Smoothie with mango, spinach, and protein powder',
          lunch: 'Brown rice bowl with grilled chicken and vegetables',
          dinner: 'Turkey meatballs with whole wheat pasta',
          snacks: 'Trail mix, orange'
        },
        {
          day: 'Wednesday',
          breakfast: 'Whole grain toast with peanut butter and banana',
          lunch: 'Lentil curry with brown rice',
          dinner: 'Baked chicken with quinoa and roasted vegetables',
          snacks: 'Apple with almond butter'
        },
        {
          day: 'Thursday',
          breakfast: 'Greek yogurt parfait with granola and berries',
          lunch: 'Tuna and avocado wrap with whole grain tortilla',
          dinner: 'Grilled fish with wild rice and broccoli',
          snacks: 'Banana, handful of cashews'
        },
        {
          day: 'Friday',
          breakfast: 'Scrambled eggs with whole grain toast and avocado',
          lunch: 'Chicken and vegetable stir-fry with brown rice',
          dinner: 'Baked salmon with sweet potato fries',
          snacks: 'Protein bar, berries'
        },
        {
          day: 'Saturday',
          breakfast: 'Overnight oats with chia seeds and fruit',
          lunch: 'Mediterranean bowl with falafel and hummus',
          dinner: 'Grilled turkey with quinoa and green beans',
          snacks: 'Mixed nuts, dried fruit'
        },
        {
          day: 'Sunday',
          breakfast: 'Veggie omelet with whole grain muffin',
          lunch: 'Grilled chicken salad with quinoa',
          dinner: 'Baked cod with brown rice and asparagus',
          snacks: 'Energy smoothie, almonds'
        }
      ]
    },
    {
      id: 'anti-inflammatory',
      name: 'Anti-Inflammatory Plan',
      description: 'Foods rich in antioxidants and omega-3s to reduce inflammation',
      duration: '7 days',
      servings: '1 person',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      meals: [
        {
          day: 'Monday',
          breakfast: 'Turmeric smoothie with ginger and berries',
          lunch: 'Wild salmon salad with leafy greens and walnuts',
          dinner: 'Grilled chicken with turmeric rice and broccoli',
          snacks: 'Blueberries, green tea'
        },
        {
          day: 'Tuesday',
          breakfast: 'Chia seed pudding with pomegranate seeds',
          lunch: 'Lentil soup with anti-inflammatory spices',
          dinner: 'Baked mackerel with quinoa and kale',
          snacks: 'Walnuts, cherries'
        },
        {
          day: 'Wednesday',
          breakfast: 'Green smoothie with spinach, pineapple, ginger',
          lunch: 'Mediterranean bowl with olive oil and vegetables',
          dinner: 'Grilled sardines with brown rice and Swiss chard',
          snacks: 'Dark chocolate (70%+), almonds'
        },
        {
          day: 'Thursday',
          breakfast: 'Oatmeal with cinnamon, walnuts, and berries',
          lunch: 'Grilled salmon with sweet potato and spinach',
          dinner: 'Turkey breast with quinoa and Brussels sprouts',
          snacks: 'Fresh berries, green tea'
        },
        {
          day: 'Friday',
          breakfast: 'Avocado toast with tomatoes and flax seeds',
          lunch: 'Chickpea curry with anti-inflammatory spices',
          dinner: 'Baked trout with wild rice and roasted vegetables',
          snacks: 'Turmeric latte, walnuts'
        },
        {
          day: 'Saturday',
          breakfast: 'Berry smoothie bowl with chia and flax seeds',
          lunch: 'Grilled chicken with leafy green salad',
          dinner: 'Baked salmon with cauliflower and asparagus',
          snacks: 'Pomegranate, Brazil nuts'
        },
        {
          day: 'Sunday',
          breakfast: 'Greek yogurt with berries and ground flaxseed',
          lunch: 'Lentil and vegetable stew',
          dinner: 'Grilled mackerel with quinoa and kale',
          snacks: 'Ginger tea, dark chocolate'
        }
      ]
    }
  ];

  const handleDownloadPlan = async (plan: MealPlan) => {
    try {
      toast.loading(`Generating ${plan.name}...`, { id: 'meal-plan-pdf' });

      await new Promise(resolve => setTimeout(resolve, 800));

      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Header
      pdf.setFillColor(37, 99, 235);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.text('HealthScore AI', margin, 20);
      pdf.setFontSize(11);
      pdf.text('Premium Meal Plan', margin, 30);

      yPosition = 55;

      // Plan Title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(plan.name, margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitDesc = pdf.splitTextToSize(plan.description, pageWidth - (margin * 2));
      pdf.text(splitDesc, margin, yPosition);
      yPosition += (splitDesc.length * 5) + 8;

      // Plan Details
      pdf.setFontSize(9);
      pdf.text(`Duration: ${plan.duration} | Servings: ${plan.servings}`, margin, yPosition);
      yPosition += 12;

      // Daily Meals
      plan.meals.forEach((meal, index) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }

        // Day Header
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(meal.day, margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');

        // Breakfast
        pdf.setFont('helvetica', 'bold');
        pdf.text('Breakfast:', margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        yPosition += 5;
        const splitBreakfast = pdf.splitTextToSize(meal.breakfast, pageWidth - (margin * 2) - 10);
        pdf.text(splitBreakfast, margin + 10, yPosition);
        yPosition += (splitBreakfast.length * 4) + 3;

        // Lunch
        pdf.setFont('helvetica', 'bold');
        pdf.text('Lunch:', margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        yPosition += 5;
        const splitLunch = pdf.splitTextToSize(meal.lunch, pageWidth - (margin * 2) - 10);
        pdf.text(splitLunch, margin + 10, yPosition);
        yPosition += (splitLunch.length * 4) + 3;

        // Dinner
        pdf.setFont('helvetica', 'bold');
        pdf.text('Dinner:', margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        yPosition += 5;
        const splitDinner = pdf.splitTextToSize(meal.dinner, pageWidth - (margin * 2) - 10);
        pdf.text(splitDinner, margin + 10, yPosition);
        yPosition += (splitDinner.length * 4) + 3;

        // Snacks
        pdf.setFont('helvetica', 'bold');
        pdf.text('Snacks:', margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        yPosition += 5;
        const splitSnacks = pdf.splitTextToSize(meal.snacks, pageWidth - (margin * 2) - 10);
        pdf.text(splitSnacks, margin + 10, yPosition);
        yPosition += (splitSnacks.length * 4) + 8;
      });

      // Footer
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text('HealthScore AI - Premium Subscription', margin, yPosition);

      pdf.save(`${plan.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);

      toast.success('Meal plan downloaded successfully!', { id: 'meal-plan-pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download meal plan. Please try again.', { id: 'meal-plan-pdf' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/subscriber-dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
              <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Premium</span>
            </Link>
            <Link to="/subscriber-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl text-gray-900 mb-4">Premium Meal Plans</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our curated meal plans designed by nutrition experts to help you achieve your health goals
            </p>
          </motion.div>

          {/* Meal Plans Grid */}
          <div className="space-y-6">
            {mealPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Plan Header */}
                <div className={`${plan.bgColor} p-6 border-b border-gray-200`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className={`text-2xl ${plan.color} mb-2`}>{plan.name}</h2>
                      <p className="text-gray-700 mb-4">{plan.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{plan.servings}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                        variant="outline"
                        size="sm"
                      >
                        {expandedPlan === plan.id ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            View Details
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDownloadPlan(plan)}
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Plan Details (Expandable) */}
                {expandedPlan === plan.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="space-y-6">
                      {plan.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="border-l-4 border-blue-500 pl-4">
                          <h3 className="text-lg text-gray-900 mb-3">{meal.day}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-900">Breakfast:</span>
                                <span className="text-gray-600 ml-2">{meal.breakfast}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-900">Lunch:</span>
                                <span className="text-gray-600 ml-2">{meal.lunch}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-900">Dinner:</span>
                                <span className="text-gray-600 ml-2">{meal.dinner}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium text-gray-900">Snacks:</span>
                                <span className="text-gray-600 ml-2">{meal.snacks}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
