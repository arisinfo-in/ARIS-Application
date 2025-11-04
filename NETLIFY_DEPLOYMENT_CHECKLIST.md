# 🚀 Netlify Deployment Checklist for ARIS Application

## ✅ Pre-Deployment Verification

### 1. Git Repository Status
- ✅ Remote repository configured: `https://github.com/arisinfo-in/ARIS-Application.git`
- ✅ All new features committed and ready to push
- ✅ `.env` file is in `.gitignore` (security ✅)

### 2. Code Status
- ✅ All Firestore indexes deployed and enabled
- ✅ Firestore security rules updated
- ✅ User-specific storage implemented (SQL & Python)
- ✅ Enhanced dashboard metrics working
- ✅ No critical errors in console

### 3. Netlify Configuration
- ✅ `netlify.toml` configured correctly
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ Netlify Functions configured: `netlify/functions`
- ✅ Security headers configured
- ✅ CSP headers configured for Firebase and Google APIs

## 📋 Environment Variables Required in Netlify

### Frontend Environment Variables (Build-time)
Set these in **Netlify Dashboard → Site Settings → Environment Variables**:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=aris-aidataanlayst.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://aris-aidataanlayst-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=aris-aidataanlayst
VITE_FIREBASE_STORAGE_BUCKET=aris-aidataanlayst.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Netlify Functions Environment Variables (Runtime)
Set these in **Netlify Dashboard → Site Settings → Environment Variables**:

```
GROQ_API_KEY=your_groq_api_key
```

**Note:** All Netlify functions use `GROQ_API_KEY`, not `GEMINI_API_KEY`. The functions are:
- `ai-tutor.js`
- `generate-test.js`
- `generate-theory-question.js`
- `generate-practical-question.js`
- `speech-analysis.js`
- `validate-code.js`
- `news-feed.js`

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Add user-specific storage for SQL and Python, enhanced dashboard metrics"

# Push to GitHub
git push origin main
```

### Step 2: Connect to Netlify

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Add New Site** → **Import from Git**
3. **Connect to GitHub** → Select `arisinfo-in/ARIS-Application`
4. **Configure build settings** (should auto-detect from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### Step 3: Set Environment Variables

1. Go to **Site Settings → Environment Variables**
2. Add all the variables listed above
3. **IMPORTANT:** Set `GROQ_API_KEY` for Netlify Functions

### Step 4: Deploy

1. Click **Deploy site**
2. Wait for build to complete
3. Check deployment logs for any errors

## ✅ Post-Deployment Verification

### Test These Features:
- [ ] User authentication (Google OAuth)
- [ ] Dashboard loads with real-time metrics
- [ ] SQL Editor - Save/Load queries
- [ ] Python Notebook - Save/Load notebooks
- [ ] AI Tutor - All modules working
- [ ] Practice Tests - Taking and scoring
- [ ] Study Plans - Create and track progress
- [ ] All Firestore indexes working (no errors)

### Check Console:
- [ ] No critical errors
- [ ] Cross-Origin warnings are acceptable (non-blocking)
- [ ] All API calls working

## 🔧 Troubleshooting

### If Build Fails:
1. Check Node version (should be 20+)
2. Verify all environment variables are set
3. Check build logs for specific errors

### If Functions Fail:
1. Verify `GROQ_API_KEY` is set in Netlify environment variables
2. Check function logs in Netlify dashboard
3. Ensure `node-fetch` is available (functions use it)

### If Firestore Errors:
1. Verify Firestore rules are deployed: `firebase deploy --only firestore:rules`
2. Verify all indexes are enabled in Firebase Console
3. Check that indexes are built (can take 5-10 minutes)

## 📝 Notes

- **GitHub Repository**: https://github.com/arisinfo-in/ARIS-Application.git
- **Netlify Functions**: All functions use `GROQ_API_KEY` (not Gemini)
- **Firebase Project**: `aris-aidataanlayst`
- **Build Command**: `npm run build`
- **Node Version**: 20 (configured in netlify.toml)

## ✅ Ready for Deployment!

All systems are ready. Just push to GitHub and configure Netlify with the environment variables above.

