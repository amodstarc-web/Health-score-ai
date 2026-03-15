import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<UserData>>({});

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save user data to localStorage
      localStorage.setItem('healthScoreUser', JSON.stringify(formData));
      onLogin(formData);
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white p-8 rounded-t-3xl">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl mb-2">Welcome to HealthScore AI</h2>
              <p className="text-blue-100 text-sm">
                Please enter your details to personalize your health dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-500/20'
                          : 'border-gray-300 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-500/20'
                          : 'border-gray-300 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-500/20'
                          : 'border-gray-300 focus:ring-blue-500/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-xs text-blue-900">
                  🔒 Your information is secure and will only be used to personalize your health dashboard and send important updates about your subscription.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-6 rounded-xl"
              >
                Continue to Subscription
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
