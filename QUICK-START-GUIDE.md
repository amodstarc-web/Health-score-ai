# 🚀 HealthScore AI - Quick Start Guide

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Git (optional)

### Step 1: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 2: Run Development Server
```bash
npm run dev
# or
pnpm dev
```

The website will be available at `http://localhost:5173`

---

## 🏗️ Build for Production

```bash
npm run build
# or
pnpm build
```

This creates an optimized production build in the `/dist` folder.

---

## 📁 Project Structure

```
healthscore-ai/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── SEO.tsx         # SEO meta tags component
│   │   │   ├── DailyHealthTools.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── ...
│   │   ├── pages/              # All page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── BodyFatAnalyzer.tsx
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   ├── TermsOfService.tsx
│   │   │   ├── AboutUs.tsx
│   │   │   ├── ContactUs.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── ...
│   │   ├── utils/              # Utility functions
│   │   ├── routes.tsx          # Route configuration
│   │   └── App.tsx             # Main app component
│   ├── styles/                 # Global styles
│   └── main.tsx                # Entry point
├── public/
│   ├── robots.txt              # SEO: Search engine rules
│   └── sitemap.xml             # SEO: Site structure
├── index.html                  # Root HTML with meta tags
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── GOOGLE-READY-CHECKLIST.md   # SEO deployment guide
├── WEBSITE-COMPLETE-SUMMARY.md # Complete documentation
└── QUICK-START-GUIDE.md        # This file
```

---

## 🎨 Key Components

### SEO Component
```tsx
import { SEO } from '../components/SEO';

// In your page component:
<SEO 
  title="Your Page Title"
  description="Your page description"
  url="https://healthscore-ai.com/your-page"
/>
```

### Daily Health Tools
Three interactive calculators:
1. Calorie Calculator
2. Water Intake Tracker
3. Step Goal Calculator

Located at: `/src/app/components/DailyHealthTools.tsx`

### Health Tests
Six comprehensive health assessment tests:
1. Body Fat Analyzer
2. Longevity Score
3. Heart Risk Checker
4. Stress Level Analyzer
5. Mental Age Test
6. Sleep Quality Score

---

## 🔧 Configuration

### Update Domain Name
Search and replace `healthscore-ai.com` with your actual domain in:
- `/public/sitemap.xml`
- `/public/robots.txt`
- `/index.html`
- `/src/app/components/SEO.tsx`

### Update Contact Emails
Replace placeholder emails in:
- `/src/app/pages/PrivacyPolicy.tsx`
- `/src/app/pages/ContactUs.tsx`
- `/src/app/components/Footer.tsx`

---

## 💳 Payment Integration

### Current Status: Demo Mode

To integrate real payments:

#### Option 1: Razorpay (Recommended for India)
```bash
npm install razorpay
```

#### Option 2: Stripe
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

Update payment logic in:
- `/src/app/components/HealthResults.tsx`
- `/src/app/pages/Subscription.tsx`

---

## 📊 Analytics Setup

### Google Analytics
1. Create GA4 property
2. Add tracking code to `/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Manual Deployment
1. Run `npm run build`
2. Upload `/dist` folder to your server
3. Configure server for SPA routing

---

## 🔍 SEO Checklist After Deployment

1. [ ] Verify sitemap is accessible: `yoursite.com/sitemap.xml`
2. [ ] Verify robots.txt: `yoursite.com/robots.txt`
3. [ ] Test all pages load correctly
4. [ ] Submit to Google Search Console
5. [ ] Request indexing for key pages
6. [ ] Set up Google Analytics
7. [ ] Test social sharing (WhatsApp, Facebook)

---

## 🐛 Common Issues

### Issue: React Helmet not working
**Solution:** Ensure `<HelmetProvider>` wraps your app in `App.tsx`

### Issue: Routes not working after deployment
**Solution:** Configure your hosting for SPA routing (all routes → index.html)

### Issue: Sitemap not accessible
**Solution:** Ensure `/public` folder contents are copied to build output

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Google Search Console](https://search.google.com/search-console/)

---

## 🆘 Support

For issues or questions:
1. Check `/WEBSITE-COMPLETE-SUMMARY.md` for detailed documentation
2. Check `/GOOGLE-READY-CHECKLIST.md` for deployment steps
3. Review component code for implementation examples

---

## 🎉 You're Ready!

Your HealthScore AI platform is fully configured and ready to launch. Follow the deployment guide and start helping people improve their health!

**Good luck! 🚀**
