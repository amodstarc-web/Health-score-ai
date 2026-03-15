# ⚡ Quick Reference Card - Mac to GitHub

**Keep this handy! Print it out or bookmark it.**

---

## 🚀 FIRST TIME SETUP (Do Once)

### 1️⃣ Download from Figma Make
```
Figma Make → Export/Download → Extract ZIP → Move to Desktop
```

### 2️⃣ Install Git
```bash
xcode-select --install
```

### 3️⃣ Create GitHub Account
```
Visit: github.com → Sign Up
Generate token: github.com/settings/tokens → Generate new token (classic)
→ Check "repo" → Generate → SAVE TOKEN
```

### 4️⃣ Push to GitHub
```bash
cd ~/Desktop/healthscore-ai
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/healthscore-ai.git
git push -u origin main
# Username: your-github-username
# Password: ghp_xxxxx (paste your token)
```

### 5️⃣ Deploy to Vercel
```
Visit: vercel.com → Sign up with GitHub
→ Import healthscore-ai → Deploy
```

**Done! Website is live! 🎉**

---

## 🔄 DAILY WORKFLOW (Future Updates)

```bash
# Navigate to project
cd ~/Desktop/healthscore-ai

# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push

# Vercel auto-deploys in 2-3 minutes ✨
```

---

## 📋 ESSENTIAL COMMANDS

### Navigation
```bash
cd ~/Desktop/healthscore-ai    # Go to project
ls                              # List files
pwd                             # Show current location
cd ..                           # Go up one folder
```

### Git Basics
```bash
git status                      # See what changed
git add .                       # Stage all changes
git commit -m "message"         # Commit changes
git push                        # Push to GitHub
git log                         # See history
```

### File Management
```bash
ls -la                          # Show all files (including hidden)
find . -type f | wc -l         # Count files
du -sh .                        # Check folder size
open .                          # Open in Finder
```

### Keyboard Shortcuts (Mac)
```
⌘ + Space               # Spotlight search
⌘ + Shift + .          # Show/hide hidden files in Finder
⌘ + V                  # Paste
⌘ + C                  # Copy
⌃ + C                  # Cancel command in Terminal
Tab                    # Auto-complete in Terminal
```

---

## 🆘 QUICK TROUBLESHOOTING

### "git: command not found"
```bash
xcode-select --install
```

### "Permission denied"
```bash
# Use HTTPS, not SSH
git remote set-url origin https://github.com/YOUR_USERNAME/healthscore-ai.git
```

### "Password authentication not supported"
```
Use Personal Access Token (not GitHub password)
Get it: github.com/settings/tokens
```

### "Can't see .env.example or .gitignore"
```
In Finder: Press ⌘ + Shift + .
```

### "Files not uploading to GitHub"
```bash
git status              # Check if files staged
git add .              # Stage files
git commit -m "msg"    # Commit
git push               # Push
```

---

## 📁 FILE STRUCTURE

```
healthscore-ai/
├── package.json                   (Config)
├── index.html                     (Entry)
├── vite.config.ts                 (Build)
├── .env.example                   (Env vars)
├── .gitignore                     (Git rules)
├── src/
│   ├── app/
│   │   ├── App.tsx                (Main)
│   │   ├── routes.tsx             (Routes)
│   │   ├── pages/                 (22 pages)
│   │   ├── components/            (80+ components)
│   │   ├── config/                (Configs)
│   │   └── utils/                 (Utilities)
│   └── styles/                    (CSS)
└── public/                        (Static files)

Total: ~137 files
```

---

## ✅ VERIFICATION CHECKLIST

### After Download:
- [ ] ~137 files in folder
- [ ] package.json exists
- [ ] src/app/App.tsx exists
- [ ] All 6 health tests exist

### After Git Setup:
- [ ] `git --version` shows version
- [ ] `git status` works
- [ ] No error messages

### After GitHub Push:
- [ ] Files visible on github.com
- [ ] Can browse folders online
- [ ] Repository URL works

### After Vercel Deploy:
- [ ] Build succeeded (green ✓)
- [ ] Got .vercel.app URL
- [ ] Website loads in browser
- [ ] All features work

---

## 🔗 IMPORTANT LINKS

**Your Project URLs:**
```
Local:    http://localhost:5173
GitHub:   https://github.com/YOUR_USERNAME/healthscore-ai
Live:     https://healthscore-ai.vercel.app
```

**Resources:**
```
GitHub Tokens:    github.com/settings/tokens
Vercel Dashboard: vercel.com/dashboard
Git Docs:         git-scm.com/doc
```

---

## 💡 PRO TIPS

1. **Always commit with clear messages**
   ```bash
   git commit -m "Fixed payment button on homepage"
   # Better than: git commit -m "update"
   ```

2. **Check status before pushing**
   ```bash
   git status        # See what will be pushed
   git add .         # Add all changes
   git push          # Then push
   ```

3. **Use Tab completion**
   ```bash
   cd ~/Desk[TAB]           # Auto-completes to Desktop
   cd health[TAB]           # Auto-completes to healthscore-ai
   ```

4. **Verify before pushing**
   ```bash
   git diff          # See exact changes
   git log --oneline # See recent commits
   ```

5. **Backup important work**
   ```bash
   # Create ZIP backup
   cd ~/Desktop
   zip -r backup-$(date +%Y%m%d).zip healthscore-ai/
   ```

---

## 🎯 COMMON WORKFLOWS

### Add New Feature
```bash
# Edit files locally
# Then:
git add .
git commit -m "Added new health test"
git push
# Wait 2-3 mins → Live on website ✅
```

### Fix Bug
```bash
# Fix the bug in your code
# Then:
git add .
git commit -m "Fixed payment button bug"
git push
# Auto-deploys ✅
```

### Update Content
```bash
# Update text/images
# Then:
git add .
git commit -m "Updated homepage text"
git push
# Live in 2-3 mins ✅
```

---

## 📊 FILE COUNTS (Expected)

| Type | Count |
|------|-------|
| Total Files | ~137 |
| TypeScript Files (.tsx/.ts) | ~100 |
| CSS Files | 4 |
| Config Files | 8 |
| Documentation (.md) | ~21 |
| Health Test Pages | 6 |
| Other Pages | 16 |
| Main Components | ~20 |
| UI Components | 52 |

---

## ⚡ SPEED RUN (Already Set Up)

**Quick update in 60 seconds:**

```bash
cd ~/Desktop/healthscore-ai
# [Edit your files]
git add . && git commit -m "Updated X" && git push
# Done! Auto-deploys to live site ✨
```

---

## 🎓 WHAT EACH COMMAND DOES

```bash
git init                        # Creates .git folder (one-time)
git add .                       # Stages files for commit
git commit -m "msg"             # Saves snapshot with message
git remote add origin URL       # Connects to GitHub (one-time)
git push                        # Uploads to GitHub
git status                      # Shows current state
git log                         # Shows history
git diff                        # Shows exact changes
```

---

## 🌟 SUCCESS CRITERIA

**You've succeeded when:**

✅ Files on your Mac (Desktop/healthscore-ai/)  
✅ Files on GitHub (github.com/YOUR_USERNAME/healthscore-ai)  
✅ Website live on Vercel (healthscore-ai.vercel.app)  
✅ Can make updates and they go live automatically  
✅ All 6 health tests work  
✅ Payment modal opens  
✅ Chatbot works (⌘ + K)  
✅ Mobile responsive  

---

## 🔢 EMERGENCY CONTACTS

**Stuck? Check these guides:**

1. **DOWNLOAD-TO-MAC-GUIDE.md** - Complete download instructions
2. **FILE-MANIFEST.md** - List of all 137 files
3. **MAC-GITHUB-COMPLETE-GUIDE.md** - Full step-by-step guide
4. **VISUAL-WORKFLOW.md** - Visual diagrams
5. **QUICK-DOWNLOAD-MAC.md** - One-page download guide

**External Help:**
- GitHub Docs: docs.github.com
- Vercel Docs: vercel.com/docs
- Git Docs: git-scm.com/doc

---

## 📝 NOTES SECTION

**Write your credentials here (keep safe!):**

```
GitHub Username: _______________________

GitHub Token (ghp_...): 
_______________________________________

Vercel URL:
https://_________.vercel.app

GitHub Repo:
https://github.com/_______/healthscore-ai

Local Path:
/Users/_______/Desktop/healthscore-ai/
```

---

## 🎯 DAILY CHECKLIST

**Before pushing changes:**
- [ ] Tested locally (npm run dev)
- [ ] No console errors
- [ ] Changes work as expected
- [ ] git status shows correct files
- [ ] Committed with clear message
- [ ] Pushed to GitHub
- [ ] Verified on live site after 2-3 mins

---

**🎉 You're all set! Keep this reference handy! 🚀**

**Print this page or bookmark it for quick access!**

---

## 📌 PIN THIS!

**Most used commands:**
```bash
cd ~/Desktop/healthscore-ai     # Navigate to project
git add .                        # Stage changes
git commit -m "Update XYZ"       # Commit changes
git push                         # Push to GitHub (auto-deploys!)
git status                       # Check status
```

**That's it! These 5 commands are 90% of your daily work! 🎯**
