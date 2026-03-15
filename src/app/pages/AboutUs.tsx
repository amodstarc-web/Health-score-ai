import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { Heart, ArrowLeft, Target, Shield, Users, Award, TrendingUp, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Us - Our Mission to Democratize Preventive Healthcare"
        description="Learn about HealthScore AI's mission to make preventive healthcare accessible to everyone through AI-powered health assessments and personalized wellness guidance."
        url="https://healthscore-ai.com/about"
      />
      
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
            <Link to="/" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 mb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Empowering India with Accessible Preventive Healthcare
            </h1>
            <p className="text-xl text-gray-700">
              HealthScore AI is on a mission to democratize health awareness through AI-powered assessments that help millions understand their bodies and make informed wellness decisions.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              HealthScore AI was founded with a simple yet powerful vision: to make comprehensive health assessments accessible to everyone, regardless of location or economic status. In a country where preventive healthcare often takes a backseat to reactive treatment, we saw an opportunity to change the narrative.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Traditional health checkups can be expensive, time-consuming, and geographically limited. We believed technology could bridge this gap. By combining evidence-based medical algorithms with artificial intelligence, we created a platform that delivers clinically-validated health insights in under 2 minutes—completely accessible from your smartphone.
            </p>
            <p className="text-lg text-gray-700">
              Today, over 10,000 Indians have discovered their health scores through our platform, taking the first crucial step toward preventive wellness. But we're just getting started.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To empower every Indian with accessible, accurate, and actionable health insights that enable preventive care and informed lifestyle choices—bridging the gap between awareness and action.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-100">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  A future where preventive healthcare is the norm, not the exception—where millions of people proactively manage their health through data-driven insights before problems arise.
                </p>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-16">
            <h2 className="text-3xl text-gray-900 mb-8">What We Offer</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Comprehensive Health Assessments</h3>
                  <p className="text-gray-700">
                    Six specialized tests covering body composition, longevity, cardiovascular health, stress levels, mental age, and sleep quality—all validated against clinical benchmarks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-700">
                    AI-generated nutrition plans, lifestyle modifications, and actionable steps tailored to your unique health profile—downloadable as PDFs for easy reference.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Monthly Health Tracking</h3>
                  <p className="text-gray-700">
                    Subscription-based monitoring that tracks your progress over time, provides trend analysis, and adjusts recommendations as your health evolves.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Privacy & Security First</h3>
                  <p className="text-gray-700">
                    Your health data is encrypted, securely stored, and never sold to third parties. We adhere to the highest standards of data protection and medical privacy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl text-gray-900 mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Accuracy</h3>
                <p className="text-gray-700 text-sm">
                  Evidence-based algorithms validated against clinical standards
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-700 text-sm">
                  Making preventive care available to everyone, everywhere
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Empowerment</h3>
                <p className="text-gray-700 text-sm">
                  Providing knowledge that enables informed health decisions
                </p>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="mb-16">
            <h2 className="text-3xl text-gray-900 mb-8">Our Impact</h2>
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl mb-2">10,000+</div>
                  <div className="text-white/90">Health Assessments Completed</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl mb-2">95%</div>
                  <div className="text-white/90">User Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl mb-2">500+</div>
                  <div className="text-white/90">Cities Across India</div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Trust Us */}
          <section className="mb-16">
            <h2 className="text-3xl text-gray-900 mb-6">Why Trust HealthScore AI?</h2>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span><strong>Clinically Validated:</strong> Our algorithms are based on established medical research and validated formulas (BMI, Mifflin-St Jeor, Framingham Risk Score, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span><strong>Transparent:</strong> We clearly state our assessments are for informational purposes and encourage consultation with healthcare professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span><strong>Privacy-Focused:</strong> Your data is encrypted, secured, and never shared without your consent</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span><strong>Continuously Improving:</strong> We update our algorithms regularly based on the latest medical research and user feedback</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="text-center py-12 bg-blue-50 rounded-2xl">
            <h2 className="text-3xl text-gray-900 mb-4">Join Thousands Taking Control of Their Health</h2>
            <p className="text-lg text-gray-700 mb-8">
              Start your health journey today with a free assessment.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg transition-all shadow-lg"
            >
              <Heart className="h-5 w-5" />
              Get Your Free Health Score
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
