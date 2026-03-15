import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { getRandomRecentNotification, type UserTestCompletion } from '../utils/notificationTracking';

interface Notification {
  id: number;
  name: string;
  location: string;
  action: string;
  isReal: boolean; // Whether this is a real user or generated
}

const actions = [
  'checked their health report',
  'completed body fat analysis',
  'unlocked full health report',
  'started longevity score test',
  'downloaded diet plan',
  'checked heart risk assessment',
  'completed stress level test',
  'unlocked premium report'
];

const names = [
  'Rahul Sharma',
  'Priya Singh',
  'Amit Patel',
  'Sneha Kumar',
  'Vikram Reddy',
  'Anjali Gupta',
  'Arjun Mehta',
  'Neha Verma',
  'Rohit Joshi',
  'Kavya Rao',
  'Aditya Shah',
  'Pooja Nair'
];

const cities = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Chandigarh',
  'Kochi'
];

export function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Show a notification every 5-10 seconds
    const showNotification = () => {
      // 60% chance to show real user notification if available, 40% random
      const shouldShowReal = Math.random() < 0.6;
      const realNotification = getRandomRecentNotification();
      
      let newNotification: Notification;
      
      if (shouldShowReal && realNotification) {
        // Show real user notification
        newNotification = {
          id: nextId,
          name: realNotification.name,
          location: realNotification.state,
          action: `completed ${realNotification.testName}`,
          isReal: true
        };
      } else {
        // Show random notification (fallback to default behavior)
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        newNotification = {
          id: nextId,
          name: names[Math.floor(Math.random() * names.length)],
          location: cities[Math.floor(Math.random() * cities.length)],
          action: randomAction,
          isReal: false
        };
      }

      setNotifications(prev => [...prev, newNotification]);
      setNextId(prev => prev + 1);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    // Initial notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Subsequent notifications every 7-12 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 5000 + 7000); // Random between 7-12 seconds

    // Listen for real-time user notifications
    const handleNewUserNotification = (event: CustomEvent<UserTestCompletion>) => {
      const userNotification: Notification = {
        id: nextId,
        name: event.detail.name,
        location: event.detail.state,
        action: `completed ${event.detail.testName}`,
        isReal: true
      };
      
      setNotifications(prev => [...prev, userNotification]);
      setNextId(prev => prev + 1);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== userNotification.id));
      }, 5000);
    };

    window.addEventListener('newUserNotification', handleNewUserNotification as EventListener);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      window.removeEventListener('newUserNotification', handleNewUserNotification as EventListener);
    };
  }, [nextId]);

  const handleClose = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm flex items-start gap-3 relative group"
          >
            {/* Animated pulse background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              {/* Blinking indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 relative">
              <p className="text-sm text-gray-900">
                <span className="font-semibold text-blue-600">{notification.name}</span>
                {' '}from{' '}
                <span className="font-medium text-gray-700">{notification.location}</span>
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {notification.action}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <motion.div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-green-600 font-medium">Just now</span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => handleClose(notification.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}