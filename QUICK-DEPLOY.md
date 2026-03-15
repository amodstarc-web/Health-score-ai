# ⚡ QUICK DEPLOY GUIDE

## Pre-Deployment Checklist: ✅ APPLIED

Your website is ready! Choose your deployment speed:

---

## 🚀 SUPER FAST (15 minutes) - Demo Deploy

Perfect for: Showing clients, testing, sharing

### Commands:
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Deploy on Vercel
# Go to: https://vercel.com
# Sign up → Import healthscore-ai repo → Deploy

# 3. DONE!
# Your site: https://healthscore-ai.vercel.app
```

**What works:** Everything except real payments  
**Payment:** Demo mode (unlocks without payment)

---

## 💰 FULL PRODUCTION (2-3 hours) - Real Money

Perfect for: Accepting real payments, making money

### Step 1: Do Super Fast Deploy First ☝️

### Step 2: Razorpay Setup

```bash
# A. Create account
# https://razorpay.com → Sign Up

# B. Get TEST keys
# Dashboard → Settings → API Keys
# Make sure TEST MODE is ON
# Generate Test Key
# Copy: rzp_test_xxxxxxxxxxxxxx

# C. Add to Vercel
# Vercel Dashboard → Project → Settings
# Environment Variables → Add:
# Name: VITE_RAZORPAY_KEY_ID
# Value: rzp_test_xxxxxxxxxxxxxx
# Save → Auto redeploys (2 min)

# D. Test payment
# Visit site → Complete test → Click unlock
# Use test card: 4111 1111 1111 1111
# Payment works! ✓

# E. Go LIVE (later)
# Complete KYC in Razorpay (2-3 days)
# Get LIVE keys → Update Vercel
# Real payments! 💰
```

---

## 📁 FILES CHANGED

```
✅ Created:
/.env.example          - Environment variables
/.gitignore           - Git security
/START-HERE.md        - Detailed guide
/QUICK-DEPLOY.md      - This file

✅ Updated:
/src/app/routes.tsx           - Added refund route
/src/app/components/Footer.tsx - Added refund link
/src/app/components/HealthResults.tsx - Real payment integration
```

---

## 🎯 WHAT TO DO NOW

### Option 1: Show Demo
```bash
git push
# Deploy on Vercel.com
# Share link with clients
```

### Option 2: Make Money
```bash
# 1. Deploy demo (Option 1)
# 2. Get Razorpay keys
# 3. Add to Vercel
# 4. Start earning!
```

---

## 📚 MORE INFO

- **Simple Guide:** `/START-HERE.md`
- **What Changed:** `/READY-TO-DEPLOY-SUMMARY.md`
- **Full Details:** `/DEPLOYMENT-CHECKLIST-COMPLETE.md`
- **Verification:** `/FINAL-VERIFICATION.md`

---

## 🆘 STUCK?

**Payment not working?**
→ Did you add `VITE_RAZORPAY_KEY_ID` to Vercel?

**Can't push to GitHub?**
→ Use Personal Access Token as password

**Build failed?**
→ Check Vercel logs in dashboard

---

## ✅ YOU'RE READY!

Pick Option 1 or 2 above and go! 🚀

**Good luck!** 🎉
