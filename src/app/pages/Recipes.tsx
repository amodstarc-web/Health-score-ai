import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, ArrowLeft, Clock, Users, ChefHat, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { Chatbot } from '../components/Chatbot';

interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  tags: string[];
}

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const recipes: Recipe[] = [
    {
      id: 'grilled-salmon',
      name: 'Grilled Salmon with Herbs',
      description: 'Heart-healthy omega-3 rich salmon with a fresh herb marinade',
      category: 'Main Dish',
      prepTime: '25 mins',
      servings: '2',
      difficulty: 'Easy',
      ingredients: [
        '2 salmon fillets (6 oz each)',
        '2 tbsp olive oil',
        '2 cloves garlic, minced',
        '1 tbsp fresh dill, chopped',
        '1 tbsp fresh parsley, chopped',
        '1 lemon, juiced',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Mix olive oil, garlic, herbs, and lemon juice in a bowl',
        'Marinate salmon fillets for 15 minutes',
        'Preheat grill to medium-high heat',
        'Grill salmon for 4-5 minutes per side',
        'Serve immediately with lemon wedges'
      ],
      nutrition: {
        calories: '340',
        protein: '34g',
        carbs: '2g',
        fat: '22g'
      },
      tags: ['High Protein', 'Heart Healthy', 'Omega-3']
    },
    {
      id: 'quinoa-bowl',
      name: 'Mediterranean Quinoa Bowl',
      description: 'Nutritious and filling bowl packed with vegetables and plant-based protein',
      category: 'Main Dish',
      prepTime: '30 mins',
      servings: '2',
      difficulty: 'Easy',
      ingredients: [
        '1 cup quinoa',
        '2 cups water',
        '1 cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/2 red onion, sliced',
        '1/4 cup Kalamata olives',
        '1/4 cup feta cheese',
        '2 tbsp olive oil',
        '1 lemon, juiced',
        'Fresh mint and parsley'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Let quinoa cool to room temperature',
        'Dice cucumber, halve tomatoes, slice onion',
        'Mix all vegetables with cooked quinoa',
        'Drizzle with olive oil and lemon juice',
        'Top with feta cheese and fresh herbs'
      ],
      nutrition: {
        calories: '385',
        protein: '12g',
        carbs: '48g',
        fat: '16g'
      },
      tags: ['Vegetarian', 'High Fiber', 'Mediterranean']
    },
    {
      id: 'green-smoothie',
      name: 'Energizing Green Smoothie',
      description: 'Nutrient-packed breakfast smoothie to start your day right',
      category: 'Breakfast',
      prepTime: '5 mins',
      servings: '1',
      difficulty: 'Easy',
      ingredients: [
        '1 cup spinach',
        '1 banana',
        '1/2 cup frozen mango',
        '1 tbsp chia seeds',
        '1 tbsp almond butter',
        '1 cup almond milk',
        '1 scoop protein powder (optional)'
      ],
      instructions: [
        'Add all ingredients to a high-speed blender',
        'Blend until smooth and creamy',
        'Add more liquid if needed for desired consistency',
        'Pour into a glass and serve immediately'
      ],
      nutrition: {
        calories: '285',
        protein: '8g',
        carbs: '42g',
        fat: '11g'
      },
      tags: ['Quick', 'Breakfast', 'Energy Boost']
    },
    {
      id: 'chicken-stir-fry',
      name: 'Healthy Chicken Stir-Fry',
      description: 'Quick and easy stir-fry loaded with colorful vegetables',
      category: 'Main Dish',
      prepTime: '20 mins',
      servings: '2',
      difficulty: 'Easy',
      ingredients: [
        '2 chicken breasts, sliced',
        '2 cups broccoli florets',
        '1 bell pepper, sliced',
        '1 carrot, julienned',
        '2 cloves garlic, minced',
        '1 tbsp ginger, grated',
        '2 tbsp low-sodium soy sauce',
        '1 tbsp sesame oil',
        '1 tsp cornstarch'
      ],
      instructions: [
        'Heat sesame oil in a wok or large pan',
        'Cook chicken until golden brown, set aside',
        'Stir-fry vegetables until tender-crisp',
        'Add garlic and ginger, cook for 1 minute',
        'Return chicken to pan',
        'Mix soy sauce with cornstarch, add to pan',
        'Toss everything together and serve hot'
      ],
      nutrition: {
        calories: '310',
        protein: '38g',
        carbs: '18g',
        fat: '10g'
      },
      tags: ['High Protein', 'Low Carb', 'Quick']
    },
    {
      id: 'greek-yogurt-parfait',
      name: 'Greek Yogurt Parfait',
      description: 'Protein-rich breakfast parfait with fresh berries and granola',
      category: 'Breakfast',
      prepTime: '10 mins',
      servings: '1',
      difficulty: 'Easy',
      ingredients: [
        '1 cup Greek yogurt (plain, non-fat)',
        '1/2 cup mixed berries',
        '2 tbsp granola',
        '1 tbsp honey',
        '1 tbsp chia seeds',
        '1 tbsp sliced almonds'
      ],
      instructions: [
        'Layer half the Greek yogurt in a glass',
        'Add half the berries',
        'Repeat layers',
        'Top with granola, chia seeds, and almonds',
        'Drizzle with honey',
        'Serve immediately'
      ],
      nutrition: {
        calories: '295',
        protein: '20g',
        carbs: '38g',
        fat: '8g'
      },
      tags: ['Breakfast', 'High Protein', 'Quick']
    },
    {
      id: 'lentil-soup',
      name: 'Hearty Lentil Soup',
      description: 'Warming and nutritious soup packed with plant-based protein and fiber',
      category: 'Soup',
      prepTime: '45 mins',
      servings: '4',
      difficulty: 'Easy',
      ingredients: [
        '1 cup red lentils',
        '1 onion, diced',
        '2 carrots, diced',
        '2 celery stalks, diced',
        '3 cloves garlic, minced',
        '6 cups vegetable broth',
        '1 can diced tomatoes',
        '1 tsp cumin',
        '1 tsp turmeric',
        '2 tbsp olive oil',
        'Fresh cilantro'
      ],
      instructions: [
        'Heat olive oil in a large pot',
        'Sauté onion, carrots, and celery until soft',
        'Add garlic and spices, cook for 1 minute',
        'Add lentils, broth, and tomatoes',
        'Bring to boil, then simmer for 25-30 minutes',
        'Season with salt and pepper',
        'Garnish with fresh cilantro'
      ],
      nutrition: {
        calories: '245',
        protein: '14g',
        carbs: '38g',
        fat: '5g'
      },
      tags: ['Vegan', 'High Fiber', 'Anti-Inflammatory']
    },
    {
      id: 'avocado-toast',
      name: 'Deluxe Avocado Toast',
      description: 'Elevated avocado toast with poached egg and microgreens',
      category: 'Breakfast',
      prepTime: '15 mins',
      servings: '1',
      difficulty: 'Medium',
      ingredients: [
        '2 slices whole grain bread',
        '1 ripe avocado',
        '1 egg',
        '1/4 cup cherry tomatoes, halved',
        '1 tbsp microgreens',
        'Red pepper flakes',
        'Lemon juice',
        'Salt and pepper'
      ],
      instructions: [
        'Toast bread until golden brown',
        'Mash avocado with lemon juice, salt, and pepper',
        'Poach egg in simmering water for 3-4 minutes',
        'Spread avocado on toast',
        'Top with poached egg and cherry tomatoes',
        'Garnish with microgreens and red pepper flakes'
      ],
      nutrition: {
        calories: '420',
        protein: '16g',
        carbs: '36g',
        fat: '26g'
      },
      tags: ['Breakfast', 'Healthy Fats', 'Trendy']
    },
    {
      id: 'berry-chia-pudding',
      name: 'Berry Chia Pudding',
      description: 'Creamy overnight chia pudding with fresh berries',
      category: 'Breakfast',
      prepTime: '5 mins + overnight',
      servings: '2',
      difficulty: 'Easy',
      ingredients: [
        '1/4 cup chia seeds',
        '1 cup almond milk',
        '1 tbsp maple syrup',
        '1/2 tsp vanilla extract',
        '1/2 cup mixed berries',
        '2 tbsp sliced almonds',
        'Fresh mint for garnish'
      ],
      instructions: [
        'Mix chia seeds, almond milk, maple syrup, and vanilla',
        'Stir well and refrigerate overnight',
        'Stir again in the morning',
        'Top with fresh berries and sliced almonds',
        'Garnish with fresh mint',
        'Serve chilled'
      ],
      nutrition: {
        calories: '195',
        protein: '6g',
        carbs: '24g',
        fat: '10g'
      },
      tags: ['Breakfast', 'Make-Ahead', 'Omega-3']
    },
    {
      id: 'turkey-lettuce-wraps',
      name: 'Asian Turkey Lettuce Wraps',
      description: 'Light and flavorful lettuce wraps perfect for lunch',
      category: 'Snack',
      prepTime: '20 mins',
      servings: '2',
      difficulty: 'Easy',
      ingredients: [
        '1 lb ground turkey',
        '1 tbsp sesame oil',
        '2 cloves garlic, minced',
        '1 tbsp ginger, grated',
        '2 tbsp low-sodium soy sauce',
        '1 tbsp rice vinegar',
        '1/4 cup water chestnuts, diced',
        '2 green onions, sliced',
        '1 head butter lettuce',
        'Sriracha (optional)'
      ],
      instructions: [
        'Heat sesame oil in a pan',
        'Cook ground turkey until browned',
        'Add garlic and ginger, cook for 1 minute',
        'Add soy sauce, rice vinegar, and water chestnuts',
        'Cook for 5 minutes until flavors combine',
        'Spoon mixture into lettuce leaves',
        'Top with green onions and sriracha'
      ],
      nutrition: {
        calories: '285',
        protein: '32g',
        carbs: '12g',
        fat: '12g'
      },
      tags: ['Low Carb', 'High Protein', 'Asian Inspired']
    },
    {
      id: 'roasted-vegetables',
      name: 'Herb-Roasted Vegetables',
      description: 'Colorful medley of roasted vegetables with herbs',
      category: 'Side Dish',
      prepTime: '35 mins',
      servings: '4',
      difficulty: 'Easy',
      ingredients: [
        '2 cups broccoli florets',
        '2 cups cauliflower florets',
        '1 red bell pepper, chopped',
        '1 zucchini, sliced',
        '2 tbsp olive oil',
        '2 cloves garlic, minced',
        '1 tsp dried thyme',
        '1 tsp dried rosemary',
        'Salt and pepper'
      ],
      instructions: [
        'Preheat oven to 425°F (220°C)',
        'Toss vegetables with olive oil and garlic',
        'Season with herbs, salt, and pepper',
        'Spread on a baking sheet in single layer',
        'Roast for 25-30 minutes until tender and golden',
        'Toss halfway through cooking',
        'Serve hot'
      ],
      nutrition: {
        calories: '110',
        protein: '4g',
        carbs: '12g',
        fat: '7g'
      },
      tags: ['Vegan', 'Side Dish', 'Low Calorie']
    }
  ];

  const categories = ['All', 'Breakfast', 'Main Dish', 'Soup', 'Snack', 'Side Dish'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl text-gray-900 mb-4">Healthy Recipes</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Over 100 delicious, nutritious recipes to support your health journey
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100"
          >
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recipes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Recipe Header */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                    <ChefHat className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{recipe.servings}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/60 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="p-6">
                  {/* Nutrition */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-xs text-gray-600 mb-2">Nutrition per serving</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Calories:</span>
                        <span className="ml-1 text-gray-900">{recipe.nutrition.calories}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-1 text-gray-900">{recipe.nutrition.protein}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carbs:</span>
                        <span className="ml-1 text-gray-900">{recipe.nutrition.carbs}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fat:</span>
                        <span className="ml-1 text-gray-900">{recipe.nutrition.fat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-900 mb-2">Ingredients</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-xs text-blue-600">
                          + {recipe.ingredients.length - 3} more ingredients
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Instructions Preview */}
                  <div>
                    <h4 className="text-sm text-gray-900 mb-2">Instructions</h4>
                    <ol className="space-y-1 text-sm text-gray-600 list-decimal list-inside">
                      {recipe.instructions.slice(0, 2).map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                      {recipe.instructions.length > 2 && (
                        <li className="text-xs text-blue-600">
                          + {recipe.instructions.length - 2} more steps
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No recipes found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
