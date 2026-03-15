# 🍎 Complete Guide: Download All HealthScore AI Files to Your Mac

This guide will help you download **all 100+ files** from your Figma Make project to your Mac computer.

---

## 📦 WHAT YOU'RE DOWNLOADING

Your HealthScore AI project contains:
- ✅ **100+ files** across multiple directories
- ✅ React components (30+ components)
- ✅ UI library (50+ UI components)
- ✅ Pages (20+ pages including all health tests)
- ✅ Configuration files (package.json, vite.config.ts, etc.)
- ✅ Styles (CSS files)
- ✅ Documentation (15+ markdown files)
- ✅ Deployment configs (.env.example, vercel.json, etc.)

**Total Project Size:** ~2-5 MB (text files)

---

## 🎯 METHOD 1: Download from Figma Make (RECOMMENDED)

### Step 1: Find the Export Button

In your **Figma Make browser tab**, look for one of these:

**Option A: Top Menu Bar**
- Look for **"Export"**, **"Download"**, or **"Download Code"** button
- Usually in the top-right corner near your profile icon

**Option B: File Menu**
- Click **"File"** in the menu bar
- Select **"Export"** or **"Download"**

**Option C: Keyboard Shortcut**
- Try pressing: **⌘ + E** (Command + E)
- Or: **⌘ + Shift + E**

**Option D: Three Dots Menu**
- Look for **⋮** (vertical dots) or **•••** (horizontal dots)
- Click it → Select **"Export"** or **"Download"**

### Step 2: Choose Download Format

When the export dialog appears:

1. **Select: "Download as ZIP"** or **"Export Project"**
2. ✅ Make sure **"Include all files"** is checked
3. ✅ Make sure **"Include dependencies"** is checked (if available)
4. Click **"Download"** or **"Export"**

### Step 3: Wait for Download

- **File name will be:** `healthscore-ai.zip` or `make-project.zip`
- **Download location:** Your **Downloads** folder
- **Time:** 5-30 seconds (depending on internet speed)

### Step 4: Locate Downloaded File

1. Open **Finder**
2. Press **⌘ + Option + L** (opens Downloads folder)
3. Look for: `healthscore-ai.zip` or similar
4. **File size should be:** 2-5 MB

---

## 📂 METHOD 2: Manual Download (If Export Doesn't Work)

If Figma Make doesn't have an export button, use this method:

### Step 1: Select All Files in Figma Make

1. In Figma Make, look for **file explorer/sidebar** (usually left side)
2. **Right-click** on the root folder
3. Select **"Select All"** or press **⌘ + A**

### Step 2: Copy Files

1. **Right-click** on selected files
2. Choose **"Copy"** or **"Download Selected"**
3. Or use keyboard: **⌘ + C**

### Step 3: Check Browser Downloads

- Open your **Downloads** folder
- Look for multiple files or a ZIP file
- Files might download individually or as a package

---

## 🗜️ STEP 5: Extract the ZIP File

### Automatic Extraction (Easiest):

1. Open **Finder** → **Downloads** folder
2. Find `healthscore-ai.zip`
3. **Double-click** the ZIP file
4. **Automatically extracts** to: `healthscore-ai` folder
5. ✅ Done!

### Manual Extraction (If Needed):

1. **Right-click** the ZIP file
2. Select **"Open With"** → **"Archive Utility"**
3. Extracts to same folder

---

## 📁 STEP 6: Move to Desktop (Recommended)

For easier access:

1. In **Finder**, locate the extracted `healthscore-ai` folder
2. **Drag it** to your **Desktop**
3. Now it's at: `/Users/YourName/Desktop/healthscore-ai/`

---

## ✅ STEP 7: Verify All Files Downloaded

Open the folder and check:

### Root Directory Files:
```
healthscore-ai/
├── README.md                    ✅
├── package.json                 ✅
├── index.html                   ✅
├── vite.config.ts              ✅
├── .env.example                 ✅
├── .gitignore                   ✅ (might be hidden)
├── vercel.json                  ✅
├── netlify.toml                 ✅
└── ... (15+ more .md files)
```

### Source Code Folders:
```
healthscore-ai/
├── src/
│   ├── app/
│   │   ├── App.tsx              ✅
│   │   ├── routes.tsx           ✅
│   │   ├── components/          ✅ (30+ files)
│   │   ├── pages/               ✅ (20+ files)
│   │   ├── utils/               ✅
│   │   └── config/              ✅
│   └── styles/                  ✅ (4 CSS files)
├── public/
│   ├── robots.txt               ✅
│   └── sitemap.xml              ✅
└── guidelines/                   ✅
```

### Count Your Files:

**Open Terminal and run:**
```bash
cd ~/Desktop/healthscore-ai
find . -type f | wc -l
```

**Expected result:** ~100-120 files

**If you see this number ✅ All files downloaded!**

---

## 🔍 STEP 8: View Hidden Files (Important!)

Some important files are hidden (start with `.`):

### Show Hidden Files in Finder:

**Method 1 - Keyboard Shortcut:**
1. In Finder, navigate to your project folder
2. Press: **⌘ + Shift + .** (Command + Shift + Period)
3. Hidden files now visible!

**Method 2 - Terminal Command:**
```bash
defaults write com.apple.finder AppleShowAllFiles TRUE
killall Finder
```

**You should now see:**
- `.env.example` (environment variables)
- `.gitignore` (Git ignore rules)
- Any other hidden config files

---

## 📊 VERIFY PROJECT STRUCTURE

### Check Key Folders Exist:

**Open Terminal:**
```bash
cd ~/Desktop/healthscore-ai
ls -la
```

**You should see:**
```
total 200
drwxr-xr-x   30 you  staff    960 Mar 15 10:30 .
drwx------+  50 you  staff   1600 Mar 15 10:30 ..
-rw-r--r--    1 you  staff   1234 Mar 15 10:30 .env.example
-rw-r--r--    1 you  staff    456 Mar 15 10:30 .gitignore
-rw-r--r--    1 you  staff   5678 Mar 15 10:30 README.md
-rw-r--r--    1 you  staff   2345 Mar 15 10:30 package.json
drwxr-xr-x   50 you  staff   1600 Mar 15 10:30 src
drwxr-xr-x    4 you  staff    128 Mar 15 10:30 public
... (more files)
```

### Verify Specific Important Files:

```bash
# Check if package.json exists
ls package.json

# Check if main App exists
ls src/app/App.tsx

# Check all health test pages
ls src/app/pages/*.tsx

# Count components
ls src/app/components/*.tsx | wc -l
# Should show: ~30

# Count UI components
ls src/app/components/ui/*.tsx | wc -l
# Should show: ~50
```

**If all these commands work ✅ Everything downloaded correctly!**

---

## 🔧 STEP 9: Open Project in Code Editor

### Option 1: Visual Studio Code (Recommended)

**Download VS Code:**
```
https://code.visualstudio.com/download
```

**Open Project:**
1. Launch **VS Code**
2. **File** → **Open Folder...**
3. Select `healthscore-ai` folder
4. Click **"Open"**
5. **Trust the project** when prompted
6. ✅ All files visible in left sidebar!

### Option 2: Terminal Text Editors

```bash
# Open in nano (simple)
nano src/app/App.tsx

# Open in vim (advanced)
vim src/app/App.tsx

# Open entire folder in system editor
open .
```

---

## 📦 STEP 10: Verify Package Dependencies

Check what needs to be installed:

```bash
cd ~/Desktop/healthscore-ai
cat package.json
```

**You should see dependencies like:**
```json
{
  "dependencies": {
    "react": "^18.x.x",
    "react-router": "^6.x.x",
    "lucide-react": "^0.x.x",
    "recharts": "^2.x.x",
    "sonner": "^1.x.x",
    ...
  }
}
```

**✅ If package.json exists with dependencies, you're good!**

---

## 🚀 NEXT STEPS AFTER DOWNLOAD

### 1. Install Dependencies

```bash
# Make sure you're in the project folder
cd ~/Desktop/healthscore-ai

# Install all packages (choose one):
npm install
# OR
pnpm install
# OR
yarn install
```

**Wait 2-5 minutes for installation to complete.**

### 2. Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Edit it (add your real API keys later)
nano .env
```

### 3. Test Locally

```bash
# Start development server
npm run dev

# Open in browser
# Visit: http://localhost:5173
```

**If website opens ✅ Everything works!**

### 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - HealthScore AI"
git remote add origin https://github.com/YOUR_USERNAME/healthscore-ai.git
git push -u origin main
```

### 5. Deploy to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Import `healthscore-ai` repository
4. Click **Deploy**
5. ✅ **Live in 2 minutes!**

---

## 🆘 TROUBLESHOOTING

### Issue 1: "Can't find Export button in Figma Make"

**Try these locations:**
- ☰ Menu (hamburger icon) → Export
- ⋮ (vertical dots) → Download
- File → Export
- Share → Download
- **⌘ + E** keyboard shortcut

**Still can't find?**
- Take a screenshot of your Figma Make interface
- Look for "Share", "Publish", or "Code" options
- Contact Figma Make support

### Issue 2: "ZIP file is corrupt or won't extract"

**Solution:**
```bash
# Try extracting via Terminal
cd ~/Downloads
unzip healthscore-ai.zip -d ~/Desktop/
```

**Or download again:**
- Delete the corrupted ZIP
- Re-download from Figma Make
- Try a different browser (Safari → Chrome or vice versa)

### Issue 3: "Some files are missing"

**Check hidden files:**
```bash
cd ~/Desktop/healthscore-ai
ls -la
```

**Re-download with different settings:**
- In Figma Make export dialog
- Make sure "Include all files" is checked
- Try "Download source code" instead of "Download build"

### Issue 4: "Folder is empty after extraction"

**The files might be nested:**
```bash
cd ~/Desktop/healthscore-ai
ls -R
```

**If nested, move them up:**
```bash
# If files are in subfolder like "healthscore-ai/healthscore-ai/"
mv healthscore-ai/* .
```

### Issue 5: "node_modules folder is huge (500MB+)"

**This is normal!** But you don't need to commit it to Git:

1. **Delete node_modules** (you can reinstall later):
   ```bash
   rm -rf node_modules
   ```

2. Make sure `.gitignore` includes:
   ```
   node_modules/
   .env
   dist/
   ```

3. Reinstall when needed:
   ```bash
   npm install
   ```

---

## 📋 DOWNLOAD CHECKLIST

Complete this checklist:

- [ ] ✅ Found Export/Download button in Figma Make
- [ ] ✅ Downloaded ZIP file (2-5 MB)
- [ ] ✅ ZIP file in Downloads folder
- [ ] ✅ Extracted ZIP file
- [ ] ✅ Moved `healthscore-ai` folder to Desktop
- [ ] ✅ Verified ~100+ files exist
- [ ] ✅ Showed hidden files (⌘ + Shift + .)
- [ ] ✅ Verified `.env.example` exists
- [ ] ✅ Verified `package.json` exists
- [ ] ✅ Verified `src/app/App.tsx` exists
- [ ] ✅ Opened in VS Code
- [ ] ✅ All folders visible (src, public, guidelines)
- [ ] ✅ All health test pages exist (20+ files in src/app/pages/)
- [ ] ✅ All components exist (30+ files in src/app/components/)
- [ ] ✅ All UI components exist (50+ files in src/app/components/ui/)
- [ ] ✅ Ready to install dependencies!

**All checked? You're ready to push to GitHub! 🎉**

---

## 🎯 QUICK REFERENCE: File Count

Your complete project should have:

| Category | Count | Location |
|----------|-------|----------|
| **Health Test Pages** | 11 | src/app/pages/ |
| **Regular Pages** | 11 | src/app/pages/ |
| **Main Components** | 20+ | src/app/components/ |
| **UI Components** | 50+ | src/app/components/ui/ |
| **Config Files** | 10+ | Root directory |
| **Documentation** | 15+ | Root directory (.md files) |
| **CSS Files** | 4 | src/styles/ |
| **Utility Files** | 5+ | src/app/utils/, src/app/config/ |
| **Total Files** | **~120** | Entire project |

---

## 📱 VERIFY SPECIFIC KEY FILES

Run these commands to verify critical files exist:

```bash
cd ~/Desktop/healthscore-ai

# Core files
test -f package.json && echo "✅ package.json exists" || echo "❌ Missing"
test -f index.html && echo "✅ index.html exists" || echo "❌ Missing"
test -f vite.config.ts && echo "✅ vite.config.ts exists" || echo "❌ Missing"

# Main app
test -f src/app/App.tsx && echo "✅ App.tsx exists" || echo "❌ Missing"
test -f src/app/routes.tsx && echo "✅ routes.tsx exists" || echo "❌ Missing"

# Health tests (should all exist)
test -f src/app/pages/HeartRiskChecker.tsx && echo "✅ Heart Risk" || echo "❌ Missing"
test -f src/app/pages/BodyFatAnalyzer.tsx && echo "✅ Body Fat" || echo "❌ Missing"
test -f src/app/pages/LongevityScoreTest.tsx && echo "✅ Longevity" || echo "❌ Missing"
test -f src/app/pages/MentalAgeTest.tsx && echo "✅ Mental Age" || echo "❌ Missing"
test -f src/app/pages/StressLevelAnalyzer.tsx && echo "✅ Stress" || echo "❌ Missing"
test -f src/app/pages/SleepQualityScore.tsx && echo "✅ Sleep" || echo "❌ Missing"

# Key components
test -f src/app/components/HealthTestForm.tsx && echo "✅ Test Form" || echo "❌ Missing"
test -f src/app/components/HealthResults.tsx && echo "✅ Results" || echo "❌ Missing"
test -f src/app/components/Chatbot.tsx && echo "✅ Chatbot" || echo "❌ Missing"

# Environment
test -f .env.example && echo "✅ .env.example exists" || echo "❌ Missing"
test -f .gitignore && echo "✅ .gitignore exists" || echo "❌ Missing"
```

**If you see all ✅ checkmarks, everything downloaded perfectly!**

---

## 🎉 SUCCESS!

You now have all **~120 files** of your HealthScore AI project on your Mac!

**Your complete project structure:**
```
~/Desktop/healthscore-ai/
├── 📄 package.json (dependencies list)
├── 📄 index.html (entry point)
├── 📄 vite.config.ts (build config)
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 App.tsx (main component)
│   │   ├── 📄 routes.tsx (routing)
│   │   ├── 📁 pages/ (20+ pages)
│   │   ├── 📁 components/ (80+ components)
│   │   ├── 📁 utils/ (helper functions)
│   │   └── 📁 config/ (configurations)
│   └── 📁 styles/ (CSS files)
├── 📁 public/ (static files)
├── 📁 guidelines/ (documentation)
└── 📄 15+ .md files (guides & docs)
```

**Next step:** [Push to GitHub](see previous guide)

---

## 💡 PRO TIPS

### Backup Your Project
```bash
# Create a backup ZIP
cd ~/Desktop
zip -r healthscore-ai-backup.zip healthscore-ai/
# Backup saved as: healthscore-ai-backup.zip
```

### Search for Specific Files
```bash
# Find all TypeScript files
find . -name "*.tsx" -o -name "*.ts"

# Find all CSS files
find . -name "*.css"

# Search for text in files
grep -r "Razorpay" src/
```

### Check Project Size
```bash
cd ~/Desktop/healthscore-ai
du -sh .
# Shows: ~2-5 MB (without node_modules)
```

---

**You're all set! Your entire HealthScore AI project is now on your Mac and ready to push to GitHub! 🚀**
