# 📦 SECTION 2: Core Source Files (3 files)

**Location:** `src/` folder

**Files to create:** 3

---

## 📂 FIRST: Create the `src` folder

1. In VS Code, right-click on the root folder (`healthscore-ai`)
2. Click "New Folder"
3. Name it `src`

---

## FILE 1/3: `src/main.tsx`

**Instructions:**
1. Right-click on `src` folder
2. New File → Name it `main.tsx`
3. Paste the content below
4. Save (⌘ + S)

**Content:**

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/theme.css';
import './styles/fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

✅ **File 1 complete!**

---

## 📂 SECOND: Create the `src/app` folder

1. Right-click on `src` folder
2. Click "New Folder"
3. Name it `app`

---

## FILE 2/3: `src/app/App.tsx`

**Instructions:**
1. Right-click on `src/app` folder
2. New File → Name it `App.tsx`
3. Paste the content below
4. Save (⌘ + S)

**Content:**

```App.tsxApp.tsx```

✅ **File 2 complete!**

---

## FILE 3/3: `src/app/routes.tsx`

**Instructions:**
1. Right-click on `src/app` folder
2. New File → Name it `routes.tsx`
3. Paste the content below
4. Save (⌘ + S)

**Content:**

```typescript
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import BestFoodsPage from "./pages/BestFoodsPage";
import DietPlanFormPage from "./pages/DietPlanFormPage";
import DietPlanPage from "./pages/DietPlanPage";
import BodyFatAnalyzer from "./pages/BodyFatAnalyzer";
import LongevityScoreTest from "./pages/LongevityScoreTest";
import HeartRiskChecker from "./pages/HeartRiskChecker";
import StressLevelAnalyzer from "./pages/StressLevelAnalyzer";
import MentalAgeTest from "./pages/MentalAgeTest";
import SleepQualityScore from "./pages/SleepQualityScore";
import Subscription from "./pages/Subscription";
import SubscriberDashboard from "./pages/SubscriberDashboard";
import MealPlans from "./pages/MealPlans";
import Recipes from "./pages/Recipes";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary";

// Redirect components for old URL patterns
const RedirectToStressLevel = () => <Navigate to="/stress-level" replace />;
const RedirectToMentalAge = () => <Navigate to="/mental-age" replace />;
const RedirectToSleepQuality = () => <Navigate to="/sleep-quality" replace />;
const RedirectToDashboard = () => <Navigate to="/subscriber-dashboard" replace />;

// Root layout component
const RootLayout = () => <Outlet />;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "best-foods",
        Component: BestFoodsPage,
      },
      {
        path: "diet-plan-form",
        Component: DietPlanFormPage,
      },
      {
        path: "diet-plan",
        Component: DietPlanPage,
      },
      {
        path: "body-fat-analyzer",
        Component: BodyFatAnalyzer,
      },
      {
        path: "longevity-score",
        Component: LongevityScoreTest,
      },
      {
        path: "heart-risk",
        Component: HeartRiskChecker,
      },
      {
        path: "stress-level",
        Component: StressLevelAnalyzer,
      },
      {
        path: "mental-age",
        Component: MentalAgeTest,
      },
      {
        path: "sleep-quality",
        Component: SleepQualityScore,
      },
      {
        path: "subscription",
        Component: Subscription,
      },
      {
        path: "subscriber-dashboard",
        Component: SubscriberDashboard,
      },
      {
        path: "meal-plans",
        Component: MealPlans,
      },
      {
        path: "recipes",
        Component: Recipes,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "terms-of-service",
        Component: TermsOfService,
      },
      {
        path: "refund-policy",
        Component: RefundPolicy,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      // Redirects for old URL patterns (for backwards compatibility)
      {
        path: "stress-level-analyzer",
        Component: RedirectToStressLevel,
      },
      {
        path: "mental-age-test",
        Component: RedirectToMentalAge,
      },
      {
        path: "sleep-quality-score",
        Component: RedirectToSleepQuality,
      },
      {
        path: "dashboard",
        Component: RedirectToDashboard,
      },
      // Catch-all 404 route
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
```

✅ **File 3 complete!**

---

## ✅ SECTION 2 COMPLETE! (3/3 files)

**Progress:** 11 of 137 files created (8 from Section 1 + 3 from Section 2)

**Your folder structure should now look like:**

```
healthscore-ai/
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.mjs
├── vercel.json
├── vite.config.ts
└── src/
    ├── main.tsx           ✅ NEW
    └── app/
        ├── App.tsx        ✅ NEW
        └── routes.tsx     ✅ NEW
```

---

## 🚨 **RED ERRORS = NORMAL!**

You'll see LOTS of red errors in VS Code because:
- ❌ Missing page files (we'll create them next!)
- ❌ Missing styles files
- ❌ No node_modules yet

**DON'T WORRY!** Keep creating files. Errors will disappear later! ✅

---

## 📋 Checklist

- [ ] src/main.tsx
- [ ] src/app/App.tsx
- [ ] src/app/routes.tsx

---

## 🚀 NEXT STEP

**Reply:** "Section 2 done! Give me Section 3"

**Section 3 will create:** All the page files (22 files) in `src/app/pages/`

This is a big section but I'll organize it well for you! 💪
