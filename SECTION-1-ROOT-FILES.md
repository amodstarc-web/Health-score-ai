# 📦 SECTION 1: Root Configuration Files (8 files)

**Make sure you're in the project directory:**
```bash
cd ~/Desktop/healthscore-ai
pwd
# Should show: /Users/YourName/Desktop/healthscore-ai
```

---

## FILE 1/8: package.json

```bash
cat > package.json << 'EOF'
{
  "name": "@figma/my-make-file",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "@mui/icons-material": "7.3.5",
    "@mui/material": "7.3.5",
    "@popperjs/core": "2.11.8",
    "@radix-ui/react-accordion": "1.2.3",
    "@radix-ui/react-alert-dialog": "1.1.6",
    "@radix-ui/react-aspect-ratio": "1.1.2",
    "@radix-ui/react-avatar": "1.1.3",
    "@radix-ui/react-checkbox": "1.1.4",
    "@radix-ui/react-collapsible": "1.1.3",
    "@radix-ui/react-context-menu": "2.2.6",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-hover-card": "1.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-menubar": "1.1.6",
    "@radix-ui/react-navigation-menu": "1.2.5",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-progress": "1.1.2",
    "@radix-ui/react-radio-group": "1.2.3",
    "@radix-ui/react-scroll-area": "1.2.3",
    "@radix-ui/react-select": "2.1.6",
    "@radix-ui/react-separator": "1.1.2",
    "@radix-ui/react-slider": "1.2.3",
    "@radix-ui/react-slot": "1.1.2",
    "@radix-ui/react-switch": "1.1.3",
    "@radix-ui/react-tabs": "1.1.3",
    "@radix-ui/react-toggle": "1.1.2",
    "@radix-ui/react-toggle-group": "1.1.2",
    "@radix-ui/react-tooltip": "1.1.8",
    "canvas-confetti": "1.9.4",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.1.1",
    "date-fns": "3.6.0",
    "embla-carousel-react": "8.6.0",
    "html2canvas": "^1.4.1",
    "input-otp": "1.4.2",
    "jspdf": "^2.5.2",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "next-themes": "0.4.6",
    "react-day-picker": "8.10.1",
    "react-dnd": "16.0.1",
    "react-dnd-html5-backend": "16.0.1",
    "react-helmet-async": "^3.0.0",
    "react-hook-form": "7.55.0",
    "react-popper": "2.3.0",
    "react-resizable-panels": "2.1.7",
    "react-responsive-masonry": "2.7.1",
    "react-router": "7.13.0",
    "react-slick": "0.31.0",
    "recharts": "2.15.2",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.3.8",
    "vaul": "1.1.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  },
  "pnpm": {
    "overrides": {
      "vite": "6.3.5"
    }
  }
}
EOF
```

✅ **File 1 created!** Verify: `ls -la package.json`

---

## FILE 2/8: index.html

```bash
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>HealthScore AI - Comprehensive Health Assessment & Wellness Platform</title>
    <meta name="title" content="HealthScore AI - Comprehensive Health Assessment & Wellness Platform" />
    <meta name="description" content="Get your complete health score in 2 minutes. AI-powered health assessments including Body Health, Longevity Score, Heart Risk, Stress Level, Mental Age, and Sleep Quality analysis. Personalized nutrition recommendations and monthly health tracking." />
    <meta name="keywords" content="health assessment, body fat calculator, metabolic age, longevity score, heart risk checker, stress analyzer, mental age test, sleep quality, health tracking, wellness, nutrition recommendations, preventive healthcare, India health" />
    <meta name="author" content="HealthScore AI" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://healthscore-ai.com/" />
    <meta property="og:title" content="HealthScore AI - Comprehensive Health Assessment & Wellness Platform" />
    <meta property="og:description" content="Get your complete health score in 2 minutes. AI-powered health assessments including Body Health, Longevity Score, Heart Risk, Stress Level, Mental Age, and Sleep Quality analysis." />
    <meta property="og:image" content="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200" />
    <meta property="og:site_name" content="HealthScore AI" />
    <meta property="og:locale" content="en_IN" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://healthscore-ai.com/" />
    <meta property="twitter:title" content="HealthScore AI - Comprehensive Health Assessment & Wellness Platform" />
    <meta property="twitter:description" content="Get your complete health score in 2 minutes. AI-powered health assessments for better health decisions." />
    <meta property="twitter:image" content="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://healthscore-ai.com/" />
    
    <!-- Preconnect for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      "name": "HealthScore AI",
      "description": "AI-powered comprehensive health assessment platform offering Body Health Score, Longevity Score, Heart Risk, Stress Level, Mental Age, and Sleep Quality tests with personalized nutrition recommendations.",
      "url": "https://healthscore-ai.com",
      "logo": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "10000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": "₹99 - ₹199",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@healthscore-ai.com",
        "contactType": "Customer Support"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Monthly Health Tracking Subscription",
          "price": "199",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      ],
      "sameAs": []
    }
    </script>
    
    <!-- Medical Service Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": "HealthScore AI - Health Assessment Platform",
      "description": "Comprehensive AI-powered health assessment tools",
      "medicalAudience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient"
      },
      "about": {
        "@type": "MedicalCondition",
        "name": "Preventive Healthcare",
        "alternateName": "Wellness Assessment"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
```

✅ **File 2 created!** Verify: `ls -la index.html`

---

## FILE 3/8: vite.config.ts

```bash
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
EOF
```

✅ **File 3 created!** Verify: `ls -la vite.config.ts`

---

## FILE 4/8: vercel.json

```bash
cat > vercel.json << 'EOF'
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/robots.txt",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain"
        }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        }
      ]
    }
  ]
}
EOF
```

✅ **File 4 created!** Verify: `ls -la vercel.json`

---

## FILE 5/8: netlify.toml

```bash
cat > netlify.toml << 'EOF'
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/robots.txt"
  [headers.values]
    Content-Type = "text/plain"

[[headers]]
  for = "/sitemap.xml"
  [headers.values]
    Content-Type = "application/xml"
EOF
```

✅ **File 5 created!** Verify: `ls -la netlify.toml`

---

## FILE 6/8: postcss.config.mjs

```bash
cat > postcss.config.mjs << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
  },
}
EOF
```

✅ **File 6 created!** Verify: `ls -la postcss.config.mjs`

---

## FILE 7/8: .gitignore

```bash
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production

# Build output
build/
.vercel
.netlify

# OS files
Thumbs.db
EOF
```

✅ **File 7 created!** Verify: `ls -la .gitignore`

---

## FILE 8/8: .env.example

```bash
cat > .env.example << 'EOF'
# Razorpay Payment Gateway (Get from: https://dashboard.razorpay.com/app/keys)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# App Configuration
VITE_APP_URL=http://localhost:5173

# Feature Flags
VITE_ENABLE_PAYMENTS=false
VITE_DEMO_MODE=true

# Analytics (Optional)
VITE_GA_TRACKING_ID=
VITE_GTM_ID=

# Email Service (Optional)
VITE_EMAIL_SERVICE_ID=
VITE_EMAIL_TEMPLATE_ID=
VITE_EMAIL_PUBLIC_KEY=
EOF
```

✅ **File 8 created!** Verify: `ls -la .env.example`

---

## ✅ SECTION 1 COMPLETE!

**Verify all files created:**
```bash
ls -la
```

**You should see:**
- package.json
- index.html
- vite.config.ts
- vercel.json
- netlify.toml
- postcss.config.mjs
- .gitignore
- .env.example

**Count files:**
```bash
find . -maxdepth 1 -type f | wc -l
```
**Expected:** At least 8 files

---

## 🎯 NEXT STEP

**Reply:** "Section 1 complete! Ready for Section 2"

And I'll provide the next files:
- Section 2: Core app files (App.tsx, routes.tsx, main.tsx)

**Keep your Terminal open and stay in the healthscore-ai directory!**
