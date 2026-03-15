import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Clinical Nutritionist, Mumbai',
      text: 'As a healthcare professional, I appreciate the scientific rigor behind HealthScore AI. The metabolic age calculation aligns remarkably well with clinical biomarkers I observe in practice. This tool bridges the gap between expensive diagnostic tests and accessible preventive care—I now recommend it to my patients as their first step toward understanding their metabolic health.',
      rating: 5,
      result: 'Metabolic Age: 28 (Actual: 35)',
      highlight: 'Lost 12kg in 4 months'
    },
    {
      name: 'Rahul Khanna',
      role: 'Corporate Executive, Bangalore',
      text: 'The comprehensive health analysis was a wake-up call I desperately needed. Within 2 minutes, I understood risks I had been ignoring for years—my cardiovascular score prompted immediate lifestyle changes. The personalized nutrition plan felt genuinely tailored to my routine. Three months later, my energy has transformed, and my recent health checkup confirmed what the platform predicted.',
      rating: 5,
      result: 'Body Fat: 18% (from 28%)',
      highlight: 'Reversed pre-diabetes markers'
    },
    {
      name: 'Anita Desai',
      role: 'Yoga Instructor & Wellness Coach, Pune',
      text: 'I guide my clients toward holistic health daily, yet HealthScore AI revealed insights about my own body I had overlooked. The stress level analysis was particularly enlightening—showing me how subtle imbalances affect overall wellness. This platform doesn\'t just provide numbers; it bridges the gap between awareness and actionable transformation with remarkable precision.',
      rating: 5,
      result: 'Sleep Quality: 92/100',
      highlight: 'Stress reduced by 40%'
    },
    {
      name: 'Vikram Singh',
      role: 'Entrepreneur, Delhi NCR',
      text: 'Time is my most valuable asset, and HealthScore AI delivered what expensive executive health checkups couldn\'t—clarity in under 2 minutes. The longevity score gave me tangible metrics to optimize. The monthly subscription keeps me accountable with progress tracking that genuinely motivates behavioral change. This is preventive healthcare designed for people who value efficiency without compromising accuracy.',
      rating: 5,
      result: 'Longevity Score: 84/100',
      highlight: 'Heart risk decreased 35%'
    },
    {
      name: 'Meera Patel',
      role: 'Teacher & Mother of Two, Ahmedabad',
      text: 'Between managing a career and raising children, my health took a backseat. This platform made self-care accessible and data-driven without overwhelming me. The meal plans integrate seamlessly into family routines—my children eat the same nutritious meals. Seeing tangible monthly progress through the subscription dashboard is incredibly empowering. I finally feel in control of my health journey.',
      rating: 5,
      result: 'Mental Age: 32 (Actual: 38)',
      highlight: 'Energy levels doubled'
    },
    {
      name: 'Amit Kumar',
      role: 'Software Developer, Hyderabad',
      text: 'As someone who spends 12+ hours at a desk, the cardiovascular risk assessment shocked me into immediate action. The AI-generated recommendations felt genuinely personalized, not generic templated advice. Three months in, my doctor confirmed measurable improvements in my lipid profile and blood pressure. This isn\'t just feel-good metrics—these are real clinical outcomes from following evidence-based guidance.',
      rating: 5,
      result: 'Heart Risk: Low (from High)',
      highlight: 'BP normalized without medication'
    },
    {
      name: 'Kavita Nair',
      role: 'HR Manager, Chennai',
      text: 'I\'ve tried countless fitness apps and diet programs that overpromised and underdelivered. HealthScore AI was refreshingly different—scientifically grounded yet simple to understand. The sleep quality insights helped me identify patterns I never noticed. Within weeks, I felt more rested, focused, and genuinely healthier. This platform respects your intelligence while making complex health data accessible.',
      rating: 5,
      result: 'Sleep Score: 88/100',
      highlight: 'Improved sleep by 2 hours'
    },
    {
      name: 'Sanjay Reddy',
      role: 'Fitness Trainer, Kolkata',
      text: 'Even as a fitness professional, the body composition analysis revealed nuances that standard measurements miss. The metabolic age calculation pushed me to optimize my own nutrition—how can I guide clients if I\'m not exemplifying peak health? This tool has become essential in my practice for baseline assessments. The precision rivals expensive DEXA scans for a fraction of the cost.',
      rating: 5,
      result: 'Body Fat: 9% (from 14%)',
      highlight: 'Gained 5kg lean muscle'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
            <Award className="h-4 w-4" />
            <span>Trusted by Over 10,000+ People</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Real Transformations, Real People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how evidence-based health insights have empowered thousands to reclaim their wellness journey
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 shadow-2xl border-2 border-blue-100 bg-white">
                {/* Testimonial Content */}
                <div className="max-w-4xl mx-auto">
                  <Quote className="h-12 w-12 text-blue-200 mb-6" />
                  
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  {/* Bottom Section */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* User Info */}
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {testimonials[currentIndex].role}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Results Badge */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border-2 border-green-200 min-w-[280px]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Achievement</div>
                          <div className="text-sm text-gray-900 mb-2">
                            {testimonials[currentIndex].result}
                          </div>
                          <div className="text-xs text-green-700 font-medium">
                            ✓ {testimonials[currentIndex].highlight}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Verified User • Assessment Completed</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2 border-blue-200 hover:bg-blue-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-blue-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2 border-blue-200 hover:bg-blue-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl text-blue-600 mb-2">10,000+</div>
            <div className="text-sm text-gray-600">Users Transformed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl text-green-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">Saw Health Improvements</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl text-purple-600 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl text-orange-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}