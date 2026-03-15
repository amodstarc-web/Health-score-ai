import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Sparkles, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  activityLevel: string;
  sleepHours: string;
  smoking: string;
  state: string;
}

interface HealthTestFormProps {
  onSubmit: (data: FormData) => void;
}

export function HealthTestForm({ onSubmit }: HealthTestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    waist: '',
    activityLevel: '',
    sleepHours: '',
    smoking: 'no',
    state: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate all fields are filled
    if (!formData.gender || !formData.activityLevel) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Small delay to ensure smooth transition
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section id="health-test" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Start Your Health Test
          </h2>
          <p className="text-lg text-gray-600">
            Fill in your details to get your personalized health score
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 shadow-xl border-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Age and Gender */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 30"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                    <SelectItem value="Assam">Assam</SelectItem>
                    <SelectItem value="Bihar">Bihar</SelectItem>
                    <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="Goa">Goa</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Haryana">Haryana</SelectItem>
                    <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                    <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Manipur">Manipur</SelectItem>
                    <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                    <SelectItem value="Mizoram">Mizoram</SelectItem>
                    <SelectItem value="Nagaland">Nagaland</SelectItem>
                    <SelectItem value="Odisha">Odisha</SelectItem>
                    <SelectItem value="Punjab">Punjab</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Sikkim">Sikkim</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="Tripura">Tripura</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>
                    <SelectItem value="Ladakh">Ladakh</SelectItem>
                    <SelectItem value="Puducherry">Puducherry</SelectItem>
                    <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                    <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>
                    <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                    <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height and Weight */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 170"
                    required
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 70"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Waist Size */}
              <div className="space-y-2">
                <Label htmlFor="waist">Waist Size (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="e.g., 85"
                  required
                  value={formData.waist}
                  onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (intense daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sleep Hours */}
              <div className="space-y-2">
                <Label htmlFor="sleep">Average Sleep Hours per Night</Label>
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 7"
                  required
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Smoking */}
              <div className="space-y-3">
                <Label>Do you smoke?</Label>
                <RadioGroup
                  value={formData.smoking}
                  onValueChange={(value) => setFormData({ ...formData, smoking: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-20 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Analyzing Your Health Data...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6" />
                      <span>Generate My Health Score</span>
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Get instant results in seconds • 100% secure
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}