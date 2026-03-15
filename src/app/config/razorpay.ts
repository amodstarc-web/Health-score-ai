/**
 * Razorpay Payment Gateway Configuration
 * 
 * This file contains configuration and helper functions for Razorpay integration.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create Razorpay account at https://razorpay.com
 * 2. Get your API keys from Dashboard → Settings → API Keys
 * 3. Add VITE_RAZORPAY_KEY_ID to your .env file
 * 4. For production, switch to LIVE keys after KYC verification
 */

// Get Razorpay Key ID from environment variables
// This is the PUBLIC key - safe to expose in frontend
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_KEY_ID_HERE';

// Pricing Configuration (in paise: 1 rupee = 100 paise)
export const PRICING = {
  // One-time test unlock: ₹199 = 19900 paise
  TEST_UNLOCK: parseInt(import.meta.env.VITE_TEST_UNLOCK_PRICE || '19900'),
  
  // Monthly subscription: ₹299 = 29900 paise
  SUBSCRIPTION: parseInt(import.meta.env.VITE_SUBSCRIPTION_PRICE || '29900'),
};

// Company/Business Details
export const BUSINESS_INFO = {
  name: 'HealthScore AI',
  description: 'AI-Powered Health Assessment Platform',
  logo: 'https://healthscore-ai.com/logo.png', // Update with actual logo URL
  contact: import.meta.env.VITE_SUPPORT_EMAIL || 'support@healthscore-ai.com',
};

// Razorpay Color Theme
export const RAZORPAY_THEME = {
  color: '#2563eb', // Blue-600 to match your brand
};

/**
 * Load Razorpay SDK dynamically
 * This loads the Razorpay checkout script from their CDN
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Check if Razorpay is properly configured
 */
export const isRazorpayConfigured = (): boolean => {
  return RAZORPAY_KEY_ID !== 'YOUR_KEY_ID_HERE' && RAZORPAY_KEY_ID.length > 0;
};

/**
 * Payment Options Interface
 */
export interface PaymentOptions {
  amount: number; // Amount in paise
  currency?: string;
  name?: string;
  description?: string;
  orderId?: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillContact?: string;
  notes?: Record<string, string>;
}

/**
 * Payment Handler Response
 */
export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/**
 * Create and open Razorpay payment modal
 * 
 * @param options - Payment configuration options
 * @param onSuccess - Callback when payment succeeds
 * @param onFailure - Callback when payment fails
 */
export const initiatePayment = async (
  options: PaymentOptions,
  onSuccess: (response: PaymentResponse) => void,
  onFailure: (error: any) => void
): Promise<void> => {
  // Load Razorpay SDK
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    onFailure(new Error('Failed to load Razorpay SDK'));
    return;
  }

  // Check if Razorpay is configured
  if (!isRazorpayConfigured()) {
    console.error('Razorpay is not configured. Please add VITE_RAZORPAY_KEY_ID to your .env file');
    onFailure(new Error('Payment gateway not configured'));
    return;
  }

  // Configure Razorpay options
  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: BUSINESS_INFO.name,
    description: options.description || BUSINESS_INFO.description,
    image: BUSINESS_INFO.logo,
    order_id: options.orderId, // Optional: for order-based payments
    
    // Prefill user details
    prefill: {
      name: options.prefillName || '',
      email: options.prefillEmail || '',
      contact: options.prefillContact || '',
    },
    
    // Additional notes
    notes: options.notes || {},
    
    // Theme customization
    theme: RAZORPAY_THEME,
    
    // Success handler
    handler: function (response: PaymentResponse) {
      console.log('Payment successful:', response);
      onSuccess(response);
    },
    
    // Modal configuration
    modal: {
      ondismiss: function () {
        console.log('Payment cancelled by user');
        onFailure(new Error('Payment cancelled'));
      },
      
      // Prevent accidental closure
      confirm_close: true,
      
      // Escape key handling
      escape: false,
      
      // Animation
      animation: true,
      
      // Handle errors
      onerror: function (error: any) {
        console.error('Payment error:', error);
        onFailure(error);
      },
    },
  };

  // Create Razorpay instance and open checkout
  const razorpayInstance = new window.Razorpay(razorpayOptions);
  razorpayInstance.open();
};

/**
 * Format amount for display (paise to rupees)
 */
export const formatAmount = (amountInPaise: number): string => {
  const rupees = amountInPaise / 100;
  return `₹${rupees.toLocaleString('en-IN')}`;
};

/**
 * Helper function to unlock a health test report
 */
export const unlockTestReport = (
  testName: string,
  userName: string,
  userEmail: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: string) => void
): void => {
  const options: PaymentOptions = {
    amount: PRICING.TEST_UNLOCK,
    description: `Unlock ${testName} Report`,
    prefillName: userName,
    prefillEmail: userEmail,
    notes: {
      test_name: testName,
      purchase_type: 'one_time_unlock',
    },
  };

  initiatePayment(
    options,
    (response) => {
      // Payment successful
      onSuccess(response.razorpay_payment_id);
    },
    (error) => {
      // Payment failed
      onFailure(error.message || 'Payment failed');
    }
  );
};

/**
 * Helper function to subscribe to monthly plan
 */
export const subscribeMonthly = (
  userName: string,
  userEmail: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: string) => void
): void => {
  const options: PaymentOptions = {
    amount: PRICING.SUBSCRIPTION,
    description: 'Monthly Health Tracking Subscription',
    prefillName: userName,
    prefillEmail: userEmail,
    notes: {
      subscription_type: 'monthly',
      purchase_type: 'subscription',
    },
  };

  initiatePayment(
    options,
    (response) => {
      // Subscription payment successful
      onSuccess(response.razorpay_payment_id);
    },
    (error) => {
      // Subscription payment failed
      onFailure(error.message || 'Subscription failed');
    }
  );
};

// TypeScript declaration for Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}