// Notification tracking system for real user test completions

export interface UserTestCompletion {
  id: string;
  name: string;
  state: string;
  testName: string;
  timestamp: number;
}

const NOTIFICATIONS_KEY = 'healthscore_user_notifications';
const MAX_NOTIFICATIONS = 50; // Keep last 50 notifications

// Add a new user test completion notification
export function addUserNotification(name: string, state: string, testName: string): void {
  try {
    const notifications = getUserNotifications();
    
    const newNotification: UserTestCompletion = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      state,
      testName,
      timestamp: Date.now()
    };

    // Add to beginning of array
    notifications.unshift(newNotification);

    // Keep only the most recent MAX_NOTIFICATIONS
    const trimmedNotifications = notifications.slice(0, MAX_NOTIFICATIONS);

    // Save to localStorage
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(trimmedNotifications));

    // Trigger a custom event so LiveNotifications can listen for updates
    window.dispatchEvent(new CustomEvent('newUserNotification', { 
      detail: newNotification 
    }));
  } catch (error) {
    console.error('Error adding user notification:', error);
  }
}

// Get all stored user notifications
export function getUserNotifications(): UserTestCompletion[] {
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!stored) return [];
    
    const notifications = JSON.parse(stored);
    
    // Filter out notifications older than 24 hours
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    return notifications.filter((n: UserTestCompletion) => n.timestamp > oneDayAgo);
  } catch (error) {
    console.error('Error getting user notifications:', error);
    return [];
  }
}

// Get recent notifications (last N)
export function getRecentNotifications(count: number = 10): UserTestCompletion[] {
  const notifications = getUserNotifications();
  return notifications.slice(0, count);
}

// Clear all notifications (for testing/debugging)
export function clearAllNotifications(): void {
  try {
    localStorage.removeItem(NOTIFICATIONS_KEY);
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
}

// Get a random recent notification (for display variety)
export function getRandomRecentNotification(): UserTestCompletion | null {
  const notifications = getRecentNotifications(20);
  if (notifications.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * notifications.length);
  return notifications[randomIndex];
}
