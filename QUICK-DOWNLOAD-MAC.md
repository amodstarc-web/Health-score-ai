# 🚀 Quick Download Guide - Mac (1 Page)

## Step 1: Export from Figma Make
1. Look for **"Export"** or **"Download"** button (top-right corner)
2. Or try: **⌘ + E** (keyboard shortcut)
3. Select **"Download as ZIP"**
4. Click **Download**

## Step 2: Extract the ZIP
1. Open **Finder** → **Downloads** folder (⌘ + Option + L)
2. Find `healthscore-ai.zip`
3. **Double-click** to extract
4. **Drag** the `healthscore-ai` folder to your **Desktop**

## Step 3: Verify Files
Open **Terminal** (⌘ + Space, type "terminal"):

```bash
# Navigate to project
cd ~/Desktop/healthscore-ai

# List files
ls

# Should see: package.json, src, public, index.html, etc.

# Count files
find . -type f | wc -l
# Expected: ~100-120 files
```

## Step 4: Show Hidden Files
In Finder, press: **⌘ + Shift + .** (Command + Shift + Period)

You should now see:
- `.env.example`
- `.gitignore`

## Step 5: Open in VS Code (Optional)
1. Download VS Code: https://code.visualstudio.com
2. **File** → **Open Folder** → Select `healthscore-ai`
3. All files visible in sidebar ✅

## ✅ Verification Checklist

Run this in Terminal:
```bash
cd ~/Desktop/healthscore-ai

echo "Core Files:"
test -f package.json && echo "✅ package.json" || echo "❌ Missing"
test -f src/app/App.tsx && echo "✅ App.tsx" || echo "❌ Missing"
test -f .env.example && echo "✅ .env.example" || echo "❌ Missing"

echo -e "\nHealth Tests:"
test -f src/app/pages/HeartRiskChecker.tsx && echo "✅ Heart Risk" || echo "❌ Missing"
test -f src/app/pages/BodyFatAnalyzer.tsx && echo "✅ Body Fat" || echo "❌ Missing"
test -f src/app/pages/LongevityScoreTest.tsx && echo "✅ Longevity" || echo "❌ Missing"
test -f src/app/pages/MentalAgeTest.tsx && echo "✅ Mental Age" || echo "❌ Missing"
test -f src/app/pages/StressLevelAnalyzer.tsx && echo "✅ Stress" || echo "❌ Missing"
test -f src/app/pages/SleepQualityScore.tsx && echo "✅ Sleep" || echo "❌ Missing"

echo -e "\nFile Count:"
find . -type f | wc -l
echo "Expected: ~100-120 files"
```

**If all ✅ checkmarks appear → Success! All files downloaded!**

## 🚀 Next: Push to GitHub

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - HealthScore AI"

# Connect to GitHub (create repo first at github.com)
git remote add origin https://github.com/YOUR_USERNAME/healthscore-ai.git

# Push
git push -u origin main
```

**When prompted for password, use Personal Access Token:**
Get it here: https://github.com/settings/tokens

---

## 📂 Your Complete Project Structure

```
healthscore-ai/
├── package.json                    (Dependencies)
├── index.html                      (Entry point)
├── vite.config.ts                  (Build config)
├── .env.example                    (Environment template)
├── .gitignore                      (Git rules)
├── vercel.json                     (Deployment config)
│
├── src/
│   ├── app/
│   │   ├── App.tsx                 (Main app)
│   │   ├── routes.tsx              (Routing)
│   │   │
│   │   ├── pages/                  (20+ pages)
│   │   │   ├── HomePage.tsx
│   │   │   ├── HeartRiskChecker.tsx
│   │   │   ├── BodyFatAnalyzer.tsx
│   │   │   ├── LongevityScoreTest.tsx
│   │   │   ├── MentalAgeTest.tsx
│   │   │   ├── StressLevelAnalyzer.tsx
│   │   │   ├── SleepQualityScore.tsx
│   │   │   └── ... (14+ more)
│   │   │
│   │   ├── components/             (80+ components)
│   │   │   ├── HealthTestForm.tsx
│   │   │   ├── HealthResults.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   ├── LiveNotifications.tsx
│   │   │   └── ui/                 (50+ UI components)
│   │   │
│   │   ├── utils/                  (Helper functions)
│   │   └── config/                 (Configurations)
│   │
│   └── styles/                     (CSS files)
│       ├── index.css
│       ├── theme.css
│       └── tailwind.css
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
└── 15+ .md files                   (Documentation)
    ├── README.md
    ├── DEPLOYMENT-GUIDE.md
    ├── QUICK-DEPLOY.md
    └── ... (more guides)
```

**Total: ~120 files, 2-5 MB**

---

## 🆘 Can't Find Export Button?

Try these:
1. **☰** (hamburger menu) → Export
2. **⋮** (three dots) → Download
3. **File** menu → Export
4. **⌘ + E** (keyboard shortcut)
5. **Share** → Download Code

Still stuck? Use **GitHub Desktop** or **VS Code** to publish directly!

---

## 💡 Quick Commands

```bash
# Navigate to project
cd ~/Desktop/healthscore-ai

# View all files (including hidden)
ls -la

# Count total files
find . -type f | wc -l

# Search for specific file
find . -name "App.tsx"

# Check project size
du -sh .

# Open in Finder
open .

# Open in VS Code (if installed)
code .
```

---

**Done! Files downloaded → Next: Push to GitHub → Deploy to Vercel! 🎉**
