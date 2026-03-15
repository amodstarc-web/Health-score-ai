# 📥 How to Download HealthScore AI to Your Mac

## 🎯 EASIEST METHOD: Export from Figma Make

### Step 1: Locate the Export Button

In your Figma Make browser tab, look for the **Export** or **Download** button. It's usually in one of these locations:

1. **Top-right corner** of the screen
2. **File menu** → Export/Download
3. **Three dots menu (⋯)** → Export/Download
4. **Hamburger menu (☰)** → Export/Download
5. Try keyboard shortcut: **⌘ + E** or **⌘ + Shift + E**

### Step 2: Download

1. Click **"Export"** or **"Download Code"** or **"Download Project"**
2. A `.zip` file downloads to your **Downloads** folder
3. The file might be named:
   - `healthscore-ai.zip`
   - `make-project.zip`
   - `figma-make-export.zip`
   - Or similar

### Step 3: Extract on Your Mac

1. Open **Finder**
2. Go to **Downloads** folder (⌘ + Option + L)
3. Find the `.zip` file you just downloaded
4. **Double-click** the `.zip` file
5. It extracts automatically! You'll see a new folder

### Step 4: Move to Desktop (Recommended)

1. **Drag** the extracted folder to your **Desktop**
2. Rename it to `healthscore-ai` if it has a different name
3. **Done!** All 100+ files are now on your Mac ✅

---

## 📂 What You Should See After Download

Your `healthscore-ai` folder should contain:

```
healthscore-ai/
├── package.json                    ← Dependencies & scripts
├── index.html                      ← Entry HTML file
├── vite.config.ts                  ← Build configuration
├── .env.example                    ← Environment variables template
├── .gitignore                      ← Git security
├── vercel.json                     ← Deployment config
├── netlify.toml                    ← Alternative deployment
│
├── src/                            ← Source code (100+ files)
│   ├── app/
│   │   ├── App.tsx                ← Main app component
│   │   ├── routes.tsx             ← Page routing
│   │   ├── components/            ← 50+ components
│   │   ├── pages/                 ← 20+ pages
│   │   ├── config/                ← Configuration files
│   │   └── utils/                 ← Utility functions
│   │
│   └── styles/                    ← CSS styles
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
│
├── public/                        ← Static files
│   ├── robots.txt
│   └── sitemap.xml
│
└── [Multiple .md files]           ← Documentation & guides
    ├── README.md
    ├── START-HERE.md
    ├── QUICK-DEPLOY.md
    └── ... (15+ guide files)
```

**Total:** 100+ files and folders!

---

## ✅ Verify the Download

Open **Terminal** and check:

```bash
# Navigate to the folder
cd ~/Desktop/healthscore-ai

# List all files
ls -la

# You should see:
# - package.json
# - src/
# - public/
# - .env.example
# - .gitignore
# - README.md
# ... and many more
```

**If you see these files ✅ Download successful!**

---

## 🚀 Next Steps After Download

### 1. Install Dependencies

```bash
cd ~/Desktop/healthscore-ai
npm install
```

This downloads all the required packages (React, Tailwind, etc.)

### 2. Create Your Environment File

```bash
# Copy the template
cp .env.example .env

# Edit it (opens in TextEdit)
open .env

# Add your Razorpay Test Key:
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

### 3. Run Locally

```bash
npm run dev
```

Your website opens at: `http://localhost:5173` 🎉

### 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/healthscore-ai.git
git push -u origin main
```

### 5. Deploy to Vercel

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import `healthscore-ai` repository
4. Add environment variables in Vercel dashboard
5. Deploy!

---

## 🆘 ALTERNATIVE: If Export Button Doesn't Exist

If you can't find the export button in Figma Make, you have two options:

### Option A: Screenshot for Help

1. Take a screenshot of your Figma Make interface (⌘ + Shift + 4)
2. Look for any download/export icons in:
   - Top toolbar
   - Side panels
   - Right-click menus
   - Settings/preferences

### Option B: Manual File Copy

If Figma Make doesn't provide export functionality, I've prepared all the essential files for you. You'll need to:

1. **Create the project structure manually** (instructions below)
2. **Copy files one by one** from the Figma Make interface

This is tedious, so **try Option A first!**

---

## 📋 Manual Setup Guide (If Export Unavailable)

### Step 1: Create Project Folder

```bash
# Open Terminal
cd ~/Desktop

# Create folder
mkdir healthscore-ai
cd healthscore-ai
```

### Step 2: Initialize Node.js Project

```bash
# Create package.json
npm init -y
```

### Step 3: Install All Dependencies

```bash
# Core dependencies
npm install react@18.3.1 react-dom@18.3.1 react-router@7.13.0

# UI libraries
npm install @mui/material@7.3.5 @mui/icons-material@7.3.5
npm install @emotion/react@11.14.0 @emotion/styled@11.14.1

# Radix UI components (50+ packages)
npm install @radix-ui/react-accordion@1.2.3 @radix-ui/react-alert-dialog@1.1.6 @radix-ui/react-avatar@1.1.3 @radix-ui/react-checkbox@1.1.4 @radix-ui/react-dialog@1.1.6 @radix-ui/react-dropdown-menu@2.1.6 @radix-ui/react-label@2.1.2 @radix-ui/react-popover@1.1.6 @radix-ui/react-progress@1.1.2 @radix-ui/react-select@2.1.6 @radix-ui/react-separator@1.1.2 @radix-ui/react-slider@1.2.3 @radix-ui/react-slot@1.1.2 @radix-ui/react-switch@1.1.3 @radix-ui/react-tabs@1.1.3 @radix-ui/react-tooltip@1.1.8

# Utility libraries
npm install lucide-react@0.487.0 motion@12.23.24 recharts@2.15.2 sonner@2.0.3
npm install canvas-confetti@1.9.4 html2canvas@1.4.1 jspdf@2.5.2
npm install react-helmet-async@3.0.0 react-hook-form@7.55.0
npm install clsx@2.1.1 tailwind-merge@3.2.0 class-variance-authority@0.7.1

# Dev dependencies
npm install -D vite@6.3.5 @vitejs/plugin-react@4.7.0
npm install -D tailwindcss@4.1.12 @tailwindcss/vite@4.1.12
```

### Step 4: Create Folder Structure

```bash
mkdir -p src/app/components/ui
mkdir -p src/app/pages
mkdir -p src/app/config
mkdir -p src/app/utils
mkdir -p src/styles
mkdir -p public
```

### Step 5: Download Configuration Files

I've created these essential files for you:

- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Git security
- ✅ `package.json` - Dependencies list
- ✅ All 100+ source files

**These are already in your Figma Make project!**

---

## 🎯 Project Structure Overview

### Essential Files (Must Have):

```
✅ package.json          - Dependencies & scripts
✅ vite.config.ts        - Build configuration
✅ index.html            - Entry HTML
✅ .env.example          - Environment template
✅ .gitignore            - Git security
✅ tsconfig.json         - TypeScript config
```

### Source Code:

```
✅ src/app/App.tsx                  - Main component
✅ src/app/routes.tsx               - Page routing
✅ src/app/components/              - 50+ components
✅ src/app/pages/                   - 20+ pages
✅ src/styles/                      - CSS files
```

### Documentation:

```
✅ README.md                - Project overview
✅ START-HERE.md            - Quick start guide
✅ QUICK-DEPLOY.md          - Deployment guide
✅ DEPLOYMENT-READY.md      - Production checklist
```

---

## 💡 Tips for Mac Users

### Use VS Code for Easy Access

1. **Download VS Code:** https://code.visualstudio.com
2. Install it
3. **File → Open Folder** → Select `healthscore-ai`
4. You can now see and edit all files easily!

### Use Finder Shortcuts

```
⌘ + Shift + G     - Go to folder (type path)
⌘ + Option + L    - Go to Downloads
⌘ + Space         - Spotlight search
```

### Use Terminal Shortcuts

```
⌘ + T             - New terminal tab
⌘ + K             - Clear screen
⌘ + C             - Stop running process
⌘ + V             - Paste (may be invisible for passwords!)
```

---

## 🔍 File Count Verification

After download, you should have:

```bash
# Count all files
find . -type f | wc -l
# Should show: 100+ files

# Count TypeScript/React files
find src/ -name "*.tsx" | wc -l
# Should show: 70+ files

# Count components
ls src/app/components/ | wc -l
# Should show: 30+ components

# Count pages
ls src/app/pages/ | wc -l
# Should show: 20+ pages
```

---

## ✅ Final Checklist

Before proceeding to GitHub, verify:

- [ ] ✅ All files downloaded
- [ ] ✅ Folder on Desktop (or preferred location)
- [ ] ✅ `package.json` exists
- [ ] ✅ `src/` folder with 100+ files
- [ ] ✅ `.env.example` exists
- [ ] ✅ `.gitignore` exists
- [ ] ✅ `npm install` runs successfully
- [ ] ✅ `npm run dev` works locally

**All checked? Ready for GitHub! 🚀**

---

## 🆘 Troubleshooting

### "I can't find the export button"

**Try:**
1. Look for download icon (⬇)
2. Check File menu
3. Try ⌘ + E keyboard shortcut
4. Look in settings/preferences
5. Check Figma Make documentation

### "The zip file is corrupted"

**Try:**
1. Download again
2. Try different browser (Safari → Chrome or vice versa)
3. Clear browser cache and retry

### "Too many files to count"

**That's normal!** Modern web apps have:
- 100+ source files
- 1000+ node_modules files (after npm install)
- Total: 10,000+ files including dependencies

**Don't worry!** You only edit the files in `src/`.

---

## 📞 Need Help?

If you're stuck:

1. **Check if export button exists** in Figma Make
2. **Screenshot your screen** so I can help locate it
3. **Tell me what you see** in the Figma Make interface
4. I can provide alternative download methods!

---

## 🚀 What's Next?

Once you have all files on your Mac:

1. ✅ Files downloaded → **You are here!**
2. ⏭️ Push to GitHub → **Next step**
3. ⏭️ Deploy to Vercel → **Final step**
4. 🎉 Website is live!

**Total time:** 10-15 minutes from download to deployed website!

---

## 📁 Quick Summary

```bash
# 1. Export from Figma Make (click Export button)
# ↓ healthscore-ai.zip downloads

# 2. Extract (double-click zip file)
# ↓ healthscore-ai/ folder created

# 3. Move to Desktop
cd ~/Desktop/healthscore-ai

# 4. Verify files
ls -la
# ✅ You should see 100+ files

# 5. Install dependencies
npm install

# 6. Test locally
npm run dev

# 7. Push to GitHub (next guide!)
```

**You've got this! 🎉**

