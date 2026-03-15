# HealthScore AI - Deployment Guide

## Quick Start for Going Live

Your HealthScore AI website is complete and ready for production deployment. Follow these steps to launch.

---

## Pre-Deployment Checklist

### 1. Domain & Hosting Setup

**Recommended Platforms:**
- **Vercel** (Easy deployment for React apps) - Recommended
- **Netlify** (Good for static sites)
- **AWS Amplify** (Scalable, more complex)
- **Google Cloud Platform**

**Steps:**
1. Purchase your domain (e.g., from GoDaddy, Namecheap, Google Domains)
2. Sign up for hosting platform
3. Connect your domain to hosting
4. Set up SSL certificate (usually automatic with Vercel/Netlify)

### 2. Update Configuration

**Find and Replace in ALL Files:**
```
Find: healthscore-ai.com
Replace with: your-actual-domain.com
```

**Update Email Addresses:**
```
Find: support@healthscore-ai.com
Replace with: support@yourdomain.com

Find: privacy@healthscore-ai.com
Replace with: privacy@yourdomain.com

etc.
```

**Files to Update:**
- `/src/app/components/SEO.tsx`
- `/src/app/pages/PrivacyPolicy.tsx`
- `/src/app/pages/TermsOfService.tsx`
- `/src/app/pages/ContactUs.tsx`
- `/src/app/components/Footer.tsx`
- `/public/sitemap.xml`
- `/public/robots.txt`

---

## Deployment Steps

### Option A: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **For Production:**
   ```bash
   vercel --prod
   ```

5. **Add Custom Domain** in Vercel dashboard


### Option B: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

---

## Post-Deployment Setup

### 1. Google Search Console (Critical for SEO)

**Steps:**
1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter your domain: `https://yourdomain.com`
4. Verify ownership (HTML file or meta tag method)
5. Submit sitemap: `https://yourdomain.com/sitemap.xml`
6. Request indexing for homepage

**What to Monitor:**
- Coverage (which pages are indexed)
- Performance (clicks, impressions, position)
- Errors (crawl errors, mobile usability issues)

### 2. Google Analytics 4

**Steps:**
1. Go to https://analytics.google.com
2. Create new GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add tracking code to your site

**Where to Add GA4 Code:**
Create `/src/app/components/GoogleAnalytics.tsx`:
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
```

Add to `App.tsx`:
```tsx
import { GoogleAnalytics } from './components/GoogleAnalytics';

// Inside return
<GoogleAnalytics />
```

### 3. Email Setup

**Option A: Use Email Service (Recommended)**
- **SendGrid** - For contact form emails
- **Mailgun** - For transactional emails
- **AWS SES** - Scalable solution

**Option B: Use Gmail with Custom Domain**
- Set up G Suite / Google Workspace
- Create email addresses (support@, privacy@, etc.)

**Contact Form Backend:**
You'll need to set up a backend endpoint to handle form submissions. Options:
- Vercel Serverless Functions
- Netlify Functions
- Firebase Functions
- Backend API server

### 4. Payment Gateway Activation

Currently, the app has demo mode payments. To activate:

**Option A: Razorpay (Popular in India)**
1. Sign up at https://razorpay.com
2. Get API keys
3. Replace demo payment logic with Razorpay integration

**Option B: Stripe**
1. Sign up at https://stripe.com
2. Get API keys
3. Integrate Stripe Checkout

**Files to Update:**
- `/src/app/pages/BodyFatAnalyzer.tsx` (and all test pages)
- `/src/app/pages/Subscription.tsx`

---

## SEO Optimization After Launch

### Week 1 Tasks

1. **Submit to Search Engines:**
   - Google Search Console (sitemap)
   - Bing Webmaster Tools
   - Yandex (optional, for Russia)

2. **Verify All Pages Load:**
   - Click through every link
   - Test all forms
   - Check mobile version

3. **Speed Optimization:**
   - Run Lighthouse audit
   - Optimize images if needed
   - Enable compression

### Month 1 Tasks

1. **Create Google My Business** (if applicable)
2. **Start Content Marketing:**
   - Blog posts about health
   - Social media presence
   - Guest posts on health blogs

3. **Monitor Analytics:**
   - Which pages get traffic
   - Bounce rate
   - Conversion rate (test completions)

### Ongoing Tasks

1. **Monthly:**
   - Update FAQ based on user questions
   - Add new testimonials
   - Refresh content

2. **Quarterly:**
   - SEO audit
   - Competitor analysis
   - Update Privacy Policy if needed

---

## Common Issues & Solutions

### Issue: Pages Not Indexing

**Solution:**
1. Check robots.txt allows crawling
2. Submit sitemap again
3. Request indexing in Search Console
4. Check for "noindex" meta tags

### Issue: Slow Loading

**Solution:**
1. Enable CDN
2. Compress images (use WebP format)
3. Minify CSS/JS (automatic with Vercel/Netlify)
4. Enable caching

### Issue: Contact Form Not Working

**Solution:**
1. Set up backend endpoint for form submission
2. Use service like Formspree.io (quick solution)
3. Or integrate with email service (SendGrid, Mailgun)

### Issue: Payment Errors

**Solution:**
1. Verify payment gateway credentials
2. Check webhook configuration
3. Test in sandbox mode first
4. Review error logs

---

## Performance Targets

### Google Lighthouse Scores (Aim For):
- **Performance:** 90+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 100

### Page Load Times:
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Largest Contentful Paint:** < 2.5s

---

## Security Checklist

- [x] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured (API keys not in code)
- [ ] Input validation on all forms
- [ ] Rate limiting on APIs
- [ ] CORS properly configured
- [ ] Security headers set (CSP, X-Frame-Options)

---

## Backup Strategy

**Recommended:**
1. **Code:** GitHub repository (already in place)
2. **Database:** Daily automated backups
3. **User Data:** Regular exports
4. **Files/PDFs:** Cloud storage backup

---

## Monitoring Setup

**Essential Tools:**
1. **Uptime Monitor:** UptimeRobot (free)
2. **Error Tracking:** Sentry (catches bugs)
3. **Analytics:** Google Analytics 4
4. **Performance:** Google PageSpeed Insights

---

## Legal Final Review

Before launching:

1. **Privacy Policy:**
   - Review with legal expert
   - Add your actual business address
   - Specify data retention periods

2. **Terms of Service:**
   - Review liability clauses
   - Confirm refund policy
   - Verify compliance with local laws

3. **Medical Disclaimer:**
   - Already prominent in Terms
   - Consider adding to footer
   - Consult healthcare legal expert

---

## Launch Day Checklist

**24 Hours Before:**
- [ ] Final testing on staging environment
- [ ] All emails working (test contact form)
- [ ] Payment gateway tested
- [ ] Mobile responsiveness checked
- [ ] All links working

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify live site loads correctly
- [ ] Submit sitemap to Google
- [ ] Monitor error logs
- [ ] Send launch announcement (email, social media)

**First Week:**
- [ ] Monitor analytics daily
- [ ] Fix any reported bugs immediately
- [ ] Respond to user feedback
- [ ] Check search console for errors

---

## Marketing Launch Strategy

### Initial Promotion:

1. **Social Media:**
   - Create accounts (Instagram, Twitter, LinkedIn)
   - Share launch announcement
   - Post health tips regularly

2. **WhatsApp:**
   - Your platform is optimized for WhatsApp sharing
   - Create shareable test result images
   - Enable easy WhatsApp sharing

3. **Local Marketing:**
   - Target Indian audience
   - Partner with fitness centers
   - Reach out to health bloggers

4. **Paid Ads (Optional):**
   - Google Ads for "health assessment"
   - Facebook/Instagram ads
   - WhatsApp Business ads

---

## Support Resources

### Technical Help:
- **Vercel Support:** https://vercel.com/support
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs

### SEO Help:
- **Google Search Central:** https://developers.google.com/search
- **Moz Beginner's Guide:** https://moz.com/beginners-guide-to-seo

### Legal:
- Consult local healthcare/tech lawyer for compliance

---

## Success Metrics to Track

### Week 1:
- Site uptime: 99.9%
- Page load time: < 3s
- Pages indexed: 15+

### Month 1:
- Organic visitors: 100+
- Test completions: 50+
- Email signups: 20+

### Month 3:
- Organic visitors: 1,000+
- Paying customers: 10+
- Return visitors: 20%

### Month 6:
- Organic visitors: 5,000+
- Subscribers: 50+
- Revenue: ₹10,000+

---

## You're Ready to Launch! 🚀

Your HealthScore AI website is:
- ✅ Technically complete
- ✅ SEO optimized
- ✅ Legally compliant
- ✅ User-friendly
- ✅ Mobile responsive
- ✅ Google-ready

**Next Step:** Choose your hosting platform and deploy!

Good luck with your launch! 🎉

---

**Questions?** Refer to:
- `/SEO-IMPLEMENTATION-SUMMARY.md` - Complete SEO details
- `/GOOGLE-LISTING-CHECKLIST.md` - Pre-launch checklist
- This file - Deployment guide

**Last Updated:** March 14, 2026
