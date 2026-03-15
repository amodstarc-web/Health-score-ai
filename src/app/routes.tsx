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