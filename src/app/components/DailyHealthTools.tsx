import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calculator, Droplet, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function DailyHealthTools() {
  // Calorie Calculator State
  const [calorieInputs, setCalorieInputs] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate'
  });
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  // Water Intake State
  const [waterInputs, setWaterInputs] = useState({
    weight: '',
    activityLevel: 'moderate',
    weather: 'normal'
  });
  const [waterResult, setWaterResult] = useState<number | null>(null);

  // Step Goal State
  const [stepInputs, setStepInputs] = useState({
    age: '',
    fitnessGoal: 'general',
    activityLevel: 'moderate'
  });
  const [stepResult, setStepResult] = useState<number | null>(null);

  // Calculate Daily Calories
  const calculateCalories = () => {
    const { age, gender, height, weight, activityLevel } = calorieInputs;
    
    if (!age || !height || !weight) return;

    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const dailyCalories = Math.round(bmr * activityMultipliers[activityLevel]);
    setCalorieResult(dailyCalories);
  };

  // Calculate Water Intake
  const calculateWater = () => {
    const { weight, activityLevel, weather } = waterInputs;
    
    if (!weight) return;

    // Base calculation: 35ml per kg of body weight
    let waterNeeded = (Number(weight) * 35) / 1000;

    // Adjust for activity level
    if (activityLevel === 'active' || activityLevel === 'veryActive') {
      waterNeeded += 0.5;
    }

    // Adjust for weather
    if (weather === 'hot') {
      waterNeeded += 0.5;
    }

    setWaterResult(Math.round(waterNeeded * 10) / 10);
  };

  // Calculate Step Goal
  const calculateSteps = () => {
    const { age, fitnessGoal, activityLevel } = stepInputs;
    
    if (!age) return;

    let baseSteps = 7000;

    // Adjust for age
    const ageNum = Number(age);
    if (ageNum < 30) {
      baseSteps = 10000;
    } else if (ageNum < 50) {
      baseSteps = 8000;
    }

    // Adjust for fitness goal
    const goalMultipliers: Record<string, number> = {
      weightLoss: 1.4,
      fitness: 1.2,
      general: 1
    };

    // Adjust for activity level
    const activityAdjustment: Record<string, number> = {
      sedentary: 0.8,
      light: 0.9,
      moderate: 1,
      active: 1.1,
      veryActive: 1.2
    };

    const steps = Math.round(
      baseSteps * goalMultipliers[fitnessGoal] * activityAdjustment[activityLevel]
    );
    
    setStepResult(steps);
  };

  return (
    <section id="daily-tools" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Daily Health Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple calculators to help you understand your body's daily needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Tool 1: Daily Calorie Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-xl transition-shadow bg-white border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Daily Calorie Calculator</h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Estimate how many calories your body needs each day.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={calorieInputs.age}
                    onChange={(e) => setCalorieInputs({ ...calorieInputs, age: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Gender</label>
                  <select
                    value={calorieInputs.gender}
                    onChange={(e) => setCalorieInputs({ ...calorieInputs, gender: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={calorieInputs.height}
                    onChange={(e) => setCalorieInputs({ ...calorieInputs, height: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter height in cm"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={calorieInputs.weight}
                    onChange={(e) => setCalorieInputs({ ...calorieInputs, weight: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Activity Level</label>
                  <select
                    value={calorieInputs.activityLevel}
                    onChange={(e) => setCalorieInputs({ ...calorieInputs, activityLevel: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (exercise 1-3 times/week)</option>
                    <option value="moderate">Moderate (exercise 4-5 times/week)</option>
                    <option value="active">Active (daily exercise)</option>
                    <option value="veryActive">Very Active (intense exercise daily)</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={calculateCalories}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg py-3"
              >
                Calculate Calories
              </Button>

              {calorieResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200"
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Daily Calorie Requirement</div>
                    <div className="text-4xl text-orange-600 mb-2">{calorieResult}</div>
                    <div className="text-sm text-gray-600">calories per day</div>
                  </div>
                  
                  {/* Simple Gauge */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Low</span>
                      <span>Optimal</span>
                      <span>High</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all"
                        style={{ width: `${Math.min((calorieResult / 3000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Tool 2: Water Intake Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 h-full hover:shadow-xl transition-shadow bg-white border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Water Intake Tracker</h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Track how much water your body needs daily.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={waterInputs.weight}
                    onChange={(e) => setWaterInputs({ ...waterInputs, weight: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Activity Level</label>
                  <select
                    value={waterInputs.activityLevel}
                    onChange={(e) => setWaterInputs({ ...waterInputs, activityLevel: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light Activity</option>
                    <option value="moderate">Moderate Activity</option>
                    <option value="active">Active</option>
                    <option value="veryActive">Very Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Weather Condition</label>
                  <select
                    value={waterInputs.weather}
                    onChange={(e) => setWaterInputs({ ...waterInputs, weather: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="hot">Hot/Humid</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={calculateWater}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg py-3"
              >
                Calculate Water Intake
              </Button>

              {waterResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200"
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Daily Water Intake</div>
                    <div className="text-4xl text-blue-600 mb-2">{waterResult}L</div>
                    <div className="text-sm text-gray-600">liters per day</div>
                  </div>
                  
                  {/* Water Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>0L</span>
                      <span>Goal: {waterResult}L</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="text-xs text-center text-gray-600 mt-2">
                      💧 Drink approximately {Math.round(waterResult / 8)} glasses (250ml each)
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Tool 3: Step Counter Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 h-full hover:shadow-xl transition-shadow bg-white border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Daily Step Goal</h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Find the ideal number of steps for your lifestyle.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={stepInputs.age}
                    onChange={(e) => setStepInputs({ ...stepInputs, age: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Fitness Goal</label>
                  <select
                    value={stepInputs.fitnessGoal}
                    onChange={(e) => setStepInputs({ ...stepInputs, fitnessGoal: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="general">General Health</option>
                    <option value="fitness">Fitness & Strength</option>
                    <option value="weightLoss">Weight Loss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Activity Level</label>
                  <select
                    value={stepInputs.activityLevel}
                    onChange={(e) => setStepInputs({ ...stepInputs, activityLevel: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Light Activity</option>
                    <option value="moderate">Moderate Activity</option>
                    <option value="active">Active</option>
                    <option value="veryActive">Very Active</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={calculateSteps}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg py-3"
              >
                Calculate Step Goal
              </Button>

              {stepResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Daily Step Goal</div>
                    <div className="text-4xl text-green-600 mb-2">
                      {stepResult.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">steps per day</div>
                  </div>
                  
                  {/* Circular Progress Meter */}
                  <div className="mt-4 flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#greenGradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * 0.25}`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl text-green-600">75%</div>
                          <div className="text-xs text-gray-600">to goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Track Your Health Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-3xl md:text-4xl text-white mb-4">
              Track Your Health Progress
            </h3>
            
            <p className="text-lg text-white/90 mb-8">
              Save your results and track your health progress every week with personalized insights and recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg"
                onClick={() => window.location.href = '/subscription'}
              >
                Start Monthly Health Tracker – ₹99/month
              </Button>
              
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Cancel anytime • No commitment</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl text-white mb-1">✓</div>
                <div className="text-sm text-white/80">Weekly Progress Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white mb-1">✓</div>
                <div className="text-sm text-white/80">Personalized Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white mb-1">✓</div>
                <div className="text-sm text-white/80">Goal Tracking</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
