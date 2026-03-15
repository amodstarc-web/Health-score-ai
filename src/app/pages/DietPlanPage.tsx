import { useState, useRef } from 'react';
import { Heart, ArrowLeft, Download, Apple, Coffee, Sun, Moon, Printer, ChefHat, Clock, Target, TrendingUp, Flame, Droplet, CalendarDays, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  activityLevel: string;
  sleepHours: string;
  smoking: string;
}

interface Meal {
  time: string;
  name: string;
  foods: string[];
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  benefits: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
  totalCalories: number;
  hydration: string;
  supplements: string[];
}

export default function DietPlanPage() {
  const location = useLocation();
  const planRef = useRef<HTMLDivElement>(null);
  
  // Try to get data from location state first, then from localStorage
  let formData = (location.state as any)?.formData as FormData | undefined;
  let userName = (location.state as any)?.userName as string | undefined;
  
  // If not in location state, try localStorage
  if (!formData) {
    const storedData = localStorage.getItem('healthAssessmentData');
    if (storedData) {
      try {
        formData = JSON.parse(storedData) as FormData;
      } catch (e) {
        console.error('Error parsing stored health data:', e);
      }
    }
  }
  
  // If no userName in state, use a default
  if (!userName) {
    userName = 'User';
  }

  // Redirect if no form data
  if (!formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">No Health Data Found</h2>
          <p className="text-gray-600 mb-6">Please complete the health assessment first.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }

  // Calculate health metrics
  const heightInMeters = parseFloat(formData.height) / 100;
  const weight = parseFloat(formData.weight);
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  const age = parseInt(formData.age);
  const waist = parseFloat(formData.waist);

  // Calculate BMR
  const bmr = formData.gender === 'male'
    ? Math.round(88.362 + (13.397 * weight) + (4.799 * parseFloat(formData.height)) - (5.677 * age))
    : Math.round(447.593 + (9.247 * weight) + (3.098 * parseFloat(formData.height)) - (4.330 * age));

  const activityMultiplier = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  }[formData.activityLevel] || 1.2;

  const maintenanceCalories = Math.round(bmr * activityMultiplier);
  
  // Determine goal based on BMI
  const bmiNum = parseFloat(bmi);
  let goal: 'weight-loss' | 'weight-gain' | 'maintenance';
  let targetCalories: number;
  
  if (bmiNum < 18.5) {
    goal = 'weight-gain';
    targetCalories = maintenanceCalories + 300;
  } else if (bmiNum > 25) {
    goal = 'weight-loss';
    targetCalories = maintenanceCalories - 500;
  } else {
    goal = 'maintenance';
    targetCalories = maintenanceCalories;
  }

  // Calculate macros (Protein: 30%, Carbs: 40%, Fats: 30%)
  const proteinGrams = Math.round((targetCalories * 0.30) / 4);
  const carbsGrams = Math.round((targetCalories * 0.40) / 4);
  const fatsGrams = Math.round((targetCalories * 0.30) / 9);

  // Generate meal plans based on goal
  const generateMealPlans = (): DayPlan[] => {
    if (goal === 'weight-loss') {
      // Week 1: High Protein Focus
      const week1 = [
        {
          day: 'Week 1 - Day 1: High Protein Start',
          totalCalories: targetCalories,
          hydration: '3-4 liters of water',
          supplements: ['Multivitamin', 'Omega-3 Fish Oil', 'Vitamin D'],
          meals: [
            {
              time: '7:00 AM',
              name: 'Power Breakfast',
              foods: ['3 egg whites + 1 whole egg omelette', 'Spinach & tomatoes', '2 slices whole wheat toast', '1 tbsp peanut butter', 'Green tea'],
              calories: Math.round(targetCalories * 0.25),
              protein: `${Math.round(proteinGrams * 0.30)}g`,
              carbs: `${Math.round(carbsGrams * 0.25)}g`,
              fats: `${Math.round(fatsGrams * 0.25)}g`,
              benefits: 'High protein breakfast kickstarts metabolism and keeps you full'
            },
            {
              time: '10:30 AM',
              name: 'Mid-Morning Snack',
              foods: ['1 medium apple', '10-12 almonds', 'Black coffee or green tea'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Healthy fats and fiber prevent mid-morning hunger'
            },
            {
              time: '1:00 PM',
              name: 'Balanced Lunch',
              foods: ['150g grilled chicken breast', '1 cup brown rice or quinoa', 'Mixed vegetable salad', 'Olive oil dressing', 'Cucumber & mint raita'],
              calories: Math.round(targetCalories * 0.35),
              protein: `${Math.round(proteinGrams * 0.35)}g`,
              carbs: `${Math.round(carbsGrams * 0.35)}g`,
              fats: `${Math.round(fatsGrams * 0.30)}g`,
              benefits: 'Complete meal with lean protein, complex carbs, and veggies'
            },
            {
              time: '4:30 PM',
              name: 'Evening Snack',
              foods: ['Greek yogurt (100g)', 'Handful of berries', 'Chia seeds (1 tsp)'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.15)}g`,
              carbs: `${Math.round(carbsGrams * 0.10)}g`,
              fats: `${Math.round(fatsGrams * 0.10)}g`,
              benefits: 'Protein-rich snack supports muscle recovery'
            },
            {
              time: '7:30 PM',
              name: 'Light Dinner',
              foods: ['Grilled fish or paneer (120g)', 'Steamed broccoli & beans', 'Small portion of dal', '1 roti or ½ cup brown rice'],
              calories: Math.round(targetCalories * 0.20),
              protein: `${Math.round(proteinGrams * 0.20)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.20)}g`,
              benefits: 'Light dinner aids digestion and better sleep'
            }
          ]
        },
        {
          day: 'Week 1 - Day 2: Fiber Focus',
          totalCalories: targetCalories,
          hydration: '3-4 liters of water',
          supplements: ['Multivitamin', 'Probiotics'],
          meals: [
            {
              time: '7:00 AM',
              name: 'Fiber-Rich Start',
              foods: ['Oatmeal with berries', 'Flaxseeds & walnuts', 'Low-fat milk or almond milk', 'Cinnamon powder'],
              calories: Math.round(targetCalories * 0.25),
              protein: `${Math.round(proteinGrams * 0.25)}g`,
              carbs: `${Math.round(carbsGrams * 0.30)}g`,
              fats: `${Math.round(fatsGrams * 0.25)}g`,
              benefits: 'Soluble fiber reduces cholesterol and improves gut health'
            },
            {
              time: '10:30 AM',
              name: 'Fruit & Nuts',
              foods: ['1 banana', 'Mixed nuts (20g)', 'Herbal tea'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Natural sugars and healthy fats for sustained energy'
            },
            {
              time: '1:00 PM',
              name: 'Vegetable Power Bowl',
              foods: ['Chickpea curry', 'Mixed vegetable sabzi', 'Whole wheat roti (2)', 'Green salad with lemon', 'Buttermilk'],
              calories: Math.round(targetCalories * 0.35),
              protein: `${Math.round(proteinGrams * 0.30)}g`,
              carbs: `${Math.round(carbsGrams * 0.35)}g`,
              fats: `${Math.round(fatsGrams * 0.30)}g`,
              benefits: 'Plant-based protein and fiber support digestive health'
            },
            {
              time: '4:30 PM',
              name: 'Vegetable Snack',
              foods: ['Carrot & cucumber sticks', 'Hummus dip', 'Green tea'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.10)}g`,
              fats: `${Math.round(fatsGrams * 0.10)}g`,
              benefits: 'Low-calorie, nutrient-dense snack'
            },
            {
              time: '7:30 PM',
              name: 'Soup & Salad Dinner',
              foods: ['Clear vegetable soup', 'Grilled tofu or chicken (100g)', 'Large mixed salad', 'Olive oil & vinegar dressing'],
              calories: Math.round(targetCalories * 0.20),
              protein: `${Math.round(proteinGrams * 0.25)}g`,
              carbs: `${Math.round(carbsGrams * 0.10)}g`,
              fats: `${Math.round(fatsGrams * 0.20)}g`,
              benefits: 'Light, hydrating dinner promotes better sleep'
            }
          ]
        },
        // Days 3-7 of Week 1
        ...Array.from({ length: 5 }, (_, i) => ({
          day: `Week 1 - Day ${i + 3}: Balanced Nutrition`,
          totalCalories: targetCalories,
          hydration: '3-4 liters of water',
          supplements: ['Multivitamin', i % 2 === 0 ? 'Omega-3' : 'Vitamin D'],
          meals: [
            {
              time: '7:00 AM',
              name: 'Energizing Breakfast',
              foods: [
                i % 2 === 0 ? 'Moong dal chilla with vegetables' : 'Poha with peanuts & vegetables',
                'Greek yogurt',
                'Fresh fruit',
                'Green tea'
              ],
              calories: Math.round(targetCalories * 0.25),
              protein: `${Math.round(proteinGrams * 0.25)}g`,
              carbs: `${Math.round(carbsGrams * 0.25)}g`,
              fats: `${Math.round(fatsGrams * 0.25)}g`,
              benefits: 'Traditional Indian breakfast with complete nutrition'
            },
            {
              time: '10:30 AM',
              name: 'Morning Boost',
              foods: ['Seasonal fruit', 'Handful of nuts', 'Black coffee'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Quick energy and healthy fats'
            },
            {
              time: '1:00 PM',
              name: 'Complete Lunch',
              foods: [
                i % 3 === 0 ? 'Grilled fish (150g)' : i % 3 === 1 ? 'Chicken curry (150g)' : 'Paneer tikka (150g)',
                'Brown rice or roti (2)',
                'Mixed dal',
                'Vegetable curry',
                'Salad'
              ],
              calories: Math.round(targetCalories * 0.35),
              protein: `${Math.round(proteinGrams * 0.35)}g`,
              carbs: `${Math.round(carbsGrams * 0.35)}g`,
              fats: `${Math.round(fatsGrams * 0.30)}g`,
              benefits: 'Balanced Indian meal with protein and complex carbs'
            },
            {
              time: '4:30 PM',
              name: 'Tea Time Snack',
              foods: ['Roasted makhana', 'Herbal tea', 'Apple slices'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.10)}g`,
              fats: `${Math.round(fatsGrams * 0.10)}g`,
              benefits: 'Low-calorie traditional snack'
            },
            {
              time: '7:30 PM',
              name: 'Light Dinner',
              foods: ['Vegetable soup', 'Grilled protein (100g)', 'Sautéed vegetables', 'Small roti'],
              calories: Math.round(targetCalories * 0.20),
              protein: `${Math.round(proteinGrams * 0.20)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.20)}g`,
              benefits: 'Easily digestible dinner for good sleep'
            }
          ]
        }))
      ];

      // Week 2: Variety & Energy
      const week2 = Array.from({ length: 7 }, (_, i) => ({
        day: `Week 2 - Day ${i + 1}: ${i % 2 === 0 ? 'Energy Boost' : 'Clean Eating'}`,
        totalCalories: targetCalories,
        hydration: '3-4 liters of water',
        supplements: ['Multivitamin', 'Omega-3'],
        meals: [
          {
            time: '7:00 AM',
            name: 'Morning Power',
            foods: [
              i % 3 === 0 ? 'Idli with sambar' : i % 3 === 1 ? 'Upma with vegetables' : 'Dosa with chutney',
              'Boiled egg whites (2)',
              'Fresh juice',
              'Green tea'
            ],
            calories: Math.round(targetCalories * 0.25),
            protein: `${Math.round(proteinGrams * 0.28)}g`,
            carbs: `${Math.round(carbsGrams * 0.25)}g`,
            fats: `${Math.round(fatsGrams * 0.22)}g`,
            benefits: 'South Indian breakfast - light yet filling'
          },
          {
            time: '10:30 AM',
            name: 'Mid-Morning Fuel',
            foods: ['Protein smoothie', 'Chia seeds', 'Berries'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.12)}g`,
            carbs: `${Math.round(carbsGrams * 0.12)}g`,
            fats: `${Math.round(fatsGrams * 0.12)}g`,
            benefits: 'Liquid nutrition for quick absorption'
          },
          {
            time: '1:00 PM',
            name: 'Balanced Lunch',
            foods: [
              i % 2 === 0 ? 'Grilled chicken salad bowl' : 'Fish curry with vegetables',
              'Quinoa or brown rice',
              'Raita',
              'Mixed vegetables'
            ],
            calories: Math.round(targetCalories * 0.35),
            protein: `${Math.round(proteinGrams * 0.35)}g`,
            carbs: `${Math.round(carbsGrams * 0.33)}g`,
            fats: `${Math.round(fatsGrams * 0.32)}g`,
            benefits: 'Lean protein with complex carbohydrates'
          },
          {
            time: '4:30 PM',
            name: 'Afternoon Snack',
            foods: ['Sprouts salad', 'Green tea', 'Roasted nuts (10-12)'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.12)}g`,
            carbs: `${Math.round(carbsGrams * 0.12)}g`,
            fats: `${Math.round(fatsGrams * 0.12)}g`,
            benefits: 'High protein, low-calorie snack'
          },
          {
            time: '7:30 PM',
            name: 'Dinner',
            foods: ['Grilled paneer or tofu', 'Vegetable stir-fry', 'Clear soup', 'Small portion dal'],
            calories: Math.round(targetCalories * 0.20),
            protein: `${Math.round(proteinGrams * 0.20)}g`,
            carbs: `${Math.round(carbsGrams * 0.18)}g`,
            fats: `${Math.round(fatsGrams * 0.22)}g`,
            benefits: 'Protein-rich dinner without heavy carbs'
          }
        ]
      }));

      // Week 3: Metabolism Boost
      const week3 = Array.from({ length: 7 }, (_, i) => ({
        day: `Week 3 - Day ${i + 1}: ${i % 2 === 0 ? 'Metabolism Boost' : 'Fat Burning'}`,
        totalCalories: targetCalories,
        hydration: '3-4 liters of water',
        supplements: ['Multivitamin', 'Green Tea Extract', 'L-Carnitine'],
        meals: [
          {
            time: '7:00 AM',
            name: 'Fat-Burning Breakfast',
            foods: [
              'Egg white omelette with vegetables',
              'Multigrain toast',
              'Avocado slices',
              'Black coffee'
            ],
            calories: Math.round(targetCalories * 0.25),
            protein: `${Math.round(proteinGrams * 0.30)}g`,
            carbs: `${Math.round(carbsGrams * 0.23)}g`,
            fats: `${Math.round(fatsGrams * 0.27)}g`,
            benefits: 'High protein, healthy fats to boost metabolism'
          },
          {
            time: '10:30 AM',
            name: 'Metabolic Snack',
            foods: ['Green tea', 'Almonds (10)', 'Apple'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.10)}g`,
            carbs: `${Math.round(carbsGrams * 0.15)}g`,
            fats: `${Math.round(fatsGrams * 0.15)}g`,
            benefits: 'Thermogenic foods increase calorie burn'
          },
          {
            time: '1:00 PM',
            name: 'Protein-Packed Lunch',
            foods: [
              i % 3 === 0 ? 'Grilled salmon (150g)' : i % 3 === 1 ? 'Chicken breast (150g)' : 'Tofu tikka (150g)',
              'Cauliflower rice',
              'Grilled vegetables',
              'Green salad'
            ],
            calories: Math.round(targetCalories * 0.35),
            protein: `${Math.round(proteinGrams * 0.38)}g`,
            carbs: `${Math.round(carbsGrams * 0.30)}g`,
            fats: `${Math.round(fatsGrams * 0.32)}g`,
            benefits: 'Low-carb, high-protein for fat loss'
          },
          {
            time: '4:30 PM',
            name: 'Energy Snack',
            foods: ['Boiled chickpeas', 'Cucumber & tomato salad', 'Lemon water'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.12)}g`,
            carbs: `${Math.round(carbsGrams * 0.12)}g`,
            fats: `${Math.round(fatsGrams * 0.08)}g`,
            benefits: 'Plant protein with minimal calories'
          },
          {
            time: '7:30 PM',
            name: 'Light Dinner',
            foods: ['Vegetable soup', 'Grilled fish or paneer (100g)', 'Steamed vegetables', 'Herbal tea'],
            calories: Math.round(targetCalories * 0.20),
            protein: `${Math.round(proteinGrams * 0.22)}g`,
            carbs: `${Math.round(carbsGrams * 0.15)}g`,
            fats: `${Math.round(fatsGrams * 0.18)}g`,
            benefits: 'Very light dinner for overnight fat burning'
          }
        ]
      }));

      // Week 4: Maintenance & Variety
      const week4 = Array.from({ length: 7 }, (_, i) => ({
        day: `Week 4 - Day ${i + 1}: ${i % 2 === 0 ? 'Balanced Maintenance' : 'Nutrient Dense'}`,
        totalCalories: targetCalories,
        hydration: '3-4 liters of water',
        supplements: ['Multivitamin', 'Omega-3', 'Vitamin D'],
        meals: [
          {
            time: '7:00 AM',
            name: 'Wholesome Breakfast',
            foods: [
              i % 4 === 0 ? 'Besan chilla with vegetables' : 
              i % 4 === 1 ? 'Oats idli with chutney' :
              i % 4 === 2 ? 'Ragi dosa with sambar' : 'Whole wheat paratha with curd',
              'Boiled eggs (2)',
              'Fresh fruit'
            ],
            calories: Math.round(targetCalories * 0.25),
            protein: `${Math.round(proteinGrams * 0.28)}g`,
            carbs: `${Math.round(carbsGrams * 0.26)}g`,
            fats: `${Math.round(fatsGrams * 0.24)}g`,
            benefits: 'Traditional Indian breakfast with modern nutrition'
          },
          {
            time: '10:30 AM',
            name: 'Morning Snack',
            foods: ['Roasted chana', 'Seasonal fruit', 'Green tea'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.11)}g`,
            carbs: `${Math.round(carbsGrams * 0.13)}g`,
            fats: `${Math.round(fatsGrams * 0.11)}g`,
            benefits: 'Indian superfoods for sustained energy'
          },
          {
            time: '1:00 PM',
            name: 'Complete Lunch',
            foods: [
              'Mixed dal',
              i % 2 === 0 ? 'Chicken curry' : 'Paneer bhurji',
              'Brown rice or roti (2)',
              'Vegetable sabzi',
              'Salad',
              'Raita'
            ],
            calories: Math.round(targetCalories * 0.35),
            protein: `${Math.round(proteinGrams * 0.35)}g`,
            carbs: `${Math.round(carbsGrams * 0.35)}g`,
            fats: `${Math.round(fatsGrams * 0.32)}g`,
            benefits: 'Complete Indian thali for balanced nutrition'
          },
          {
            time: '4:30 PM',
            name: 'Evening Snack',
            foods: ['Dhokla or khakhra', 'Green chutney', 'Herbal tea'],
            calories: Math.round(targetCalories * 0.10),
            protein: `${Math.round(proteinGrams * 0.10)}g`,
            carbs: `${Math.round(carbsGrams * 0.12)}g`,
            fats: `${Math.round(fatsGrams * 0.10)}g`,
            benefits: 'Healthy Indian snacks'
          },
          {
            time: '7:30 PM',
            name: 'Dinner',
            foods: [
              'Grilled fish or soya chunks',
              'Vegetable soup',
              'Mixed vegetables',
              'Small roti or khichdi'
            ],
            calories: Math.round(targetCalories * 0.20),
            protein: `${Math.round(proteinGrams * 0.22)}g`,
            carbs: `${Math.round(carbsGrams * 0.18)}g`,
            fats: `${Math.round(fatsGrams * 0.20)}g`,
            benefits: 'Light, nutritious dinner for good sleep'
          }
        ]
      }));

      return [...week1, ...week2, ...week3, ...week4];
    } else if (goal === 'weight-gain') {
      // Week 1-4: Muscle Building Focus (28 days)
      const allWeeks = [];
      
      for (let week = 1; week <= 4; week++) {
        const weekPlans = Array.from({ length: 7 }, (_, i) => ({
          day: `Week ${week} - Day ${i + 1}: ${week === 1 ? 'Foundation Building' : week === 2 ? 'Power Meals' : week === 3 ? 'Strength Focus' : 'Mass Gaining'}`,
          totalCalories: targetCalories,
          hydration: '3-4 liters of water',
          supplements: ['Multivitamin', 'Protein Powder', 'Creatine', week > 2 ? 'BCAA' : 'Omega-3'],
          meals: [
            {
              time: '7:00 AM',
              name: 'High-Calorie Breakfast',
              foods: [
                i % 4 === 0 ? '4 whole eggs scrambled' : i % 4 === 1 ? 'Egg bhurji with 3 eggs' : i % 4 === 2 ? 'Omelette with cheese & vegetables' : 'Boiled eggs (4) with whole wheat toast',
                'Cheese slices (2)',
                '3-4 slices whole wheat bread',
                i % 2 === 0 ? 'Avocado' : 'Peanut butter',
                'Banana smoothie with milk & nuts'
              ],
              calories: Math.round(targetCalories * 0.30),
              protein: `${Math.round(proteinGrams * 0.30)}g`,
              carbs: `${Math.round(carbsGrams * 0.30)}g`,
              fats: `${Math.round(fatsGrams * 0.35)}g`,
              benefits: 'Calorie-dense breakfast fuels muscle growth'
            },
            {
              time: '10:30 AM',
              name: 'Protein Shake',
              foods: ['Whey protein shake', 'Oats', 'Banana', 'Peanut butter (2 tbsp)', 'Whole milk', i % 2 === 0 ? 'Honey' : 'Dates (3-4)'],
              calories: Math.round(targetCalories * 0.15),
              protein: `${Math.round(proteinGrams * 0.25)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Quick protein absorption for muscle recovery'
            },
            {
              time: '1:00 PM',
              name: 'Power Lunch',
              foods: [
                i % 3 === 0 ? '200g chicken curry' : i % 3 === 1 ? '200g fish with gravy' : '200g paneer butter masala',
                'Sweet potato or regular potato (200g)',
                'Brown rice (1.5 cups)',
                'Mixed dal',
                'Vegetable sabzi in oil',
                'Whole milk curd'
              ],
              calories: Math.round(targetCalories * 0.30),
              protein: `${Math.round(proteinGrams * 0.30)}g`,
              carbs: `${Math.round(carbsGrams * 0.35)}g`,
              fats: `${Math.round(fatsGrams * 0.25)}g`,
              benefits: 'Complex carbs and protein support muscle building'
            },
            {
              time: '4:30 PM',
              name: 'Pre-Workout Snack',
              foods: ['2 Bananas', 'Dates (5-6)', 'Mixed nuts & seeds (50g)', i % 2 === 0 ? 'Protein bar' : 'Peanut chikki'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Fast-acting energy for workout performance'
            },
            {
              time: '7:30 PM',
              name: 'Muscle-Building Dinner',
              foods: [
                i % 3 === 0 ? 'Lean beef (150g)' : i % 3 === 1 ? 'Chicken breast (150g)' : 'Paneer (200g)',
                'Quinoa or pasta (1.5 cups)',
                'Sautéed vegetables in butter',
                i % 2 === 0 ? 'Cheese topping' : 'Cream-based gravy',
                'Glass of whole milk with protein powder'
              ],
              calories: Math.round(targetCalories * 0.15),
              protein: `${Math.round(proteinGrams * 0.20)}g`,
              carbs: `${Math.round(carbsGrams * 0.20)}g`,
              fats: `${Math.round(fatsGrams * 0.20)}g`,
              benefits: 'Slow-digesting protein aids overnight muscle repair'
            }
          ]
        }));
        allWeeks.push(...weekPlans);
      }
      
      return allWeeks;
    } else {
      // Maintenance plan - 28 days
      const allWeeks = [];
      
      for (let week = 1; week <= 4; week++) {
        const weekPlans = Array.from({ length: 7 }, (_, i) => ({
          day: `Week ${week} - Day ${i + 1}: ${week === 1 ? 'Balanced Start' : week === 2 ? 'Nutrient Focus' : week === 3 ? 'Variety Week' : 'Optimal Health'}`,
          totalCalories: targetCalories,
          hydration: '2.5-3 liters of water',
          supplements: ['Multivitamin', i % 2 === 0 ? 'Omega-3' : 'Vitamin D'],
          meals: [
            {
              time: '7:00 AM',
              name: 'Balanced Breakfast',
              foods: [
                i % 5 === 0 ? '2 whole eggs & toast' : 
                i % 5 === 1 ? 'Poha with peanuts' :
                i % 5 === 2 ? 'Idli with sambar' :
                i % 5 === 3 ? 'Upma with vegetables' : 'Dosa with chutney',
                i % 2 === 0 ? 'Avocado spread' : 'Greek yogurt',
                'Fresh fruit salad',
                'Green tea or black coffee'
              ],
              calories: Math.round(targetCalories * 0.25),
              protein: `${Math.round(proteinGrams * 0.25)}g`,
              carbs: `${Math.round(carbsGrams * 0.25)}g`,
              fats: `${Math.round(fatsGrams * 0.25)}g`,
              benefits: 'Balanced macros provide sustained energy'
            },
            {
              time: '10:30 AM',
              name: 'Morning Snack',
              foods: [i % 3 === 0 ? 'Greek yogurt with granola' : i % 3 === 1 ? 'Fruit smoothie' : 'Roasted makhana with fruit', 'Honey drizzle', 'Green tea'],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.15)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.10)}g`,
              benefits: 'Probiotics support digestive health'
            },
            {
              time: '1:00 PM',
              name: 'Wholesome Lunch',
              foods: [
                i % 4 === 0 ? 'Grilled salmon (150g)' : i % 4 === 1 ? 'Chicken curry (150g)' : i % 4 === 2 ? 'Paneer tikka (150g)' : 'Fish tikka (150g)',
                i % 2 === 0 ? 'Quinoa salad' : 'Brown rice',
                'Roasted vegetables',
                'Mixed dal',
                'Olive oil dressing or raita',
                'Fresh fruit'
              ],
              calories: Math.round(targetCalories * 0.35),
              protein: `${Math.round(proteinGrams * 0.35)}g`,
              carbs: `${Math.round(carbsGrams * 0.35)}g`,
              fats: `${Math.round(fatsGrams * 0.35)}g`,
              benefits: 'Omega-3 rich meal supports heart and brain health'
            },
            {
              time: '4:30 PM',
              name: 'Afternoon Snack',
              foods: [
                i % 4 === 0 ? 'Apple with almond butter' : i % 4 === 1 ? 'Roasted chana' : i % 4 === 2 ? 'Sprouts salad' : 'Dhokla',
                i % 2 === 0 ? 'Dark chocolate (20g)' : 'Green tea'
              ],
              calories: Math.round(targetCalories * 0.10),
              protein: `${Math.round(proteinGrams * 0.10)}g`,
              carbs: `${Math.round(carbsGrams * 0.10)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Antioxidants and healthy fats'
            },
            {
              time: '7:30 PM',
              name: 'Nutritious Dinner',
              foods: [
                i % 4 === 0 ? 'Turkey stir-fry' : i % 4 === 1 ? 'Tofu curry' : i % 4 === 2 ? 'Grilled fish' : 'Chicken soup',
                i % 2 === 0 ? 'Brown rice (small portion)' : 'Whole wheat roti (1)',
                'Mixed vegetables',
                'Clear soup or dal',
                'Herbal tea'
              ],
              calories: Math.round(targetCalories * 0.20),
              protein: `${Math.round(proteinGrams * 0.20)}g`,
              carbs: `${Math.round(carbsGrams * 0.15)}g`,
              fats: `${Math.round(fatsGrams * 0.15)}g`,
              benefits: 'Light dinner with complete nutrition'
            }
          ]
        }));
        allWeeks.push(...weekPlans);
      }
      
      return allWeeks;
    }
  };

  const mealPlans = generateMealPlans();

  // Get goal-specific recommendations
  const getGoalGuidance = () => {
    if (goal === 'weight-loss') {
      return {
        title: 'Weight Loss Strategy',
        icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
        targetWeight: `${(weight - (weight * 0.1)).toFixed(1)} kg`,
        timeframe: '3-6 months',
        weeklyGoal: '0.5-1 kg per week',
        tips: [
          'Create a consistent calorie deficit through diet and exercise',
          'Drink water before meals to reduce appetite',
          'Avoid liquid calories (sodas, juices, alcohol)',
          'Sleep 7-9 hours for optimal hormone balance',
          'Track your meals and stay accountable',
          'Include strength training to preserve muscle mass',
          'Manage stress to prevent emotional eating'
        ],
        exercises: [
          '30-45 minutes cardio (walking, jogging, cycling) 5x/week',
          'Strength training 3x/week (full body workouts)',
          '10,000+ steps daily',
          'HIIT sessions 2x/week for fat burning'
        ]
      };
    } else if (goal === 'weight-gain') {
      return {
        title: 'Healthy Weight Gain Plan',
        icon: <Target className="h-8 w-8 text-green-600" />,
        targetWeight: `${(weight + (weight * 0.1)).toFixed(1)} kg`,
        timeframe: '3-6 months',
        weeklyGoal: '0.25-0.5 kg per week',
        tips: [
          'Eat calorie-dense, nutrient-rich foods',
          'Increase meal frequency to 5-6 times daily',
          'Add healthy fats: nuts, avocados, olive oil',
          'Drink smoothies and shakes between meals',
          'Focus on strength training over cardio',
          'Get adequate rest for muscle recovery',
          'Be consistent with meal timing'
        ],
        exercises: [
          'Strength training 4-5x/week (progressive overload)',
          'Compound exercises: squats, deadlifts, bench press',
          'Limit cardio to 20 minutes 2x/week',
          'Focus on muscle-building movements'
        ]
      };
    } else {
      return {
        title: 'Maintenance & Optimization',
        icon: <CheckCircle2 className="h-8 w-8 text-green-600" />,
        targetWeight: `${weight.toFixed(1)} kg`,
        timeframe: 'Ongoing',
        weeklyGoal: 'Maintain current weight',
        tips: [
          'Maintain current eating habits and activity levels',
          'Focus on nutrient quality over quantity',
          'Stay hydrated throughout the day',
          'Practice intuitive eating and mindful portions',
          'Mix up your workouts to prevent plateaus',
          'Get annual health checkups',
          'Prioritize sleep and stress management'
        ],
        exercises: [
          'Mix of cardio and strength training 4-5x/week',
          '150-300 minutes moderate exercise weekly',
          'Include flexibility and mobility work',
          'Try new activities to stay motivated'
        ]
      };
    }
  };

  const guidance = getGoalGuidance();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 print:hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl text-gray-900">HealthScore AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print Plan</span>
              </Button>
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16" ref={planRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <ChefHat className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-700">Personalized Diet Plan</span>
            </div>
            {userName && (
              <p className="text-lg text-gray-600 mb-2">
                Hello, <span className="text-blue-600 font-semibold">{userName}</span>! 👋
              </p>
            )}
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Your 30-Day Custom Nutrition Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your health assessment, here's a comprehensive month-long diet plan to help you achieve your health goals
            </p>
          </motion.div>

          {/* Health Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Daily Calories</p>
              <p className="text-2xl text-gray-900">{targetCalories}</p>
            </Card>
            <Card className="p-6 text-center">
              <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Protein</p>
              <p className="text-2xl text-gray-900">{proteinGrams}g</p>
            </Card>
            <Card className="p-6 text-center">
              <Apple className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Carbs</p>
              <p className="text-2xl text-gray-900">{carbsGrams}g</p>
            </Card>
            <Card className="p-6 text-center">
              <Droplet className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Fats</p>
              <p className="text-2xl text-gray-900">{fatsGrams}g</p>
            </Card>
          </div>

          {/* Goal Guidance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {guidance.icon}
              </div>
              <div>
                <h2 className="text-3xl text-gray-900">{guidance.title}</h2>
                <p className="text-gray-600">Timeframe: {guidance.timeframe}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Target Weight</p>
                <p className="text-2xl text-blue-600">{guidance.targetWeight}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Weekly Goal</p>
                <p className="text-2xl text-green-600">{guidance.weeklyGoal}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Current BMI</p>
                <p className="text-2xl text-orange-600">{bmi}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <Apple className="h-5 w-5 text-blue-600" />
                  Nutrition Tips
                </h3>
                <ul className="space-y-2">
                  {guidance.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Exercise Plan
                </h3>
                <ul className="space-y-2">
                  {guidance.exercises.map((exercise, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{exercise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Weekly Meal Plans */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-gray-900 mb-2">Your Complete 30-Day Meal Plan</h2>
              <p className="text-gray-600">Follow this comprehensive monthly nutrition plan to achieve your health goals - {mealPlans.length} days of varied, delicious meals!</p>
            </div>

            {mealPlans.map((dayPlan, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-6 w-6" />
                      <h3 className="text-2xl">{dayPlan.day}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-100">Total Calories</p>
                      <p className="text-2xl">{dayPlan.totalCalories}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4" />
                      {dayPlan.hydration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Apple className="h-4 w-4" />
                      Supplements: {dayPlan.supplements.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Meals */}
                <div className="p-6 space-y-6">
                  {dayPlan.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                      {/* Meal Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {mealIndex === 0 && <Sun className="h-5 w-5 text-orange-600" />}
                            {mealIndex === 1 && <Coffee className="h-5 w-5 text-brown-600" />}
                            {mealIndex === 2 && <Sun className="h-5 w-5 text-yellow-600" />}
                            {mealIndex === 3 && <Coffee className="h-5 w-5 text-blue-600" />}
                            {mealIndex === 4 && <Moon className="h-5 w-5 text-indigo-600" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <p className="text-sm text-gray-600">{meal.time}</p>
                            </div>
                            <h4 className="text-xl text-gray-900">{meal.name}</h4>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl text-blue-600">{meal.calories}</p>
                          <p className="text-xs text-gray-500">calories</p>
                        </div>
                      </div>

                      {/* Food Items */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Food Items:</p>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {meal.foods.map((food, foodIndex) => (
                            <li key={foodIndex} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {food}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Macros */}
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs">
                          <Flame className="h-3 w-3" />
                          Protein: {meal.protein}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                          <Apple className="h-3 w-3" />
                          Carbs: {meal.carbs}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs">
                          <Droplet className="h-3 w-3" />
                          Fats: {meal.fats}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Benefits:</strong> {meal.benefits}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl text-gray-900 mb-6 text-center">Important Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Do's
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Drink water 30 minutes before meals</li>
                  <li>• Eat slowly and chew thoroughly (20-30 times)</li>
                  <li>• Prepare meals in advance to stay consistent</li>
                  <li>• Track your progress weekly</li>
                  <li>• Include variety in your diet</li>
                  <li>• Listen to your body's hunger cues</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Don'ts
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Skip meals (disrupts metabolism)</li>
                  <li>• Eat 2-3 hours before bedtime</li>
                  <li>• Consume excessive processed foods</li>
                  <li>• Drastically cut calories suddenly</li>
                  <li>• Compare your progress to others</li>
                  <li>• Give up if you miss a meal or workout</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white print:hidden"
          >
            <h3 className="text-3xl mb-4">Need More Personalized Guidance?</h3>
            <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
              Consult with our nutrition experts for customized meal plans tailored to your specific needs and preferences
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/" className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                Retake Health Test
              </Link>
              <Link to="/best-foods" className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                Explore Best Foods
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Chatbot */}
      <div className="print:hidden">
        <Chatbot />
      </div>
    </div>
  );
}