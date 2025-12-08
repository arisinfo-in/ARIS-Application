# Firebase Phone Authentication Setup Checklist

## ⚠️ CRITICAL: You MUST complete these steps in Firebase Console

The error `auth/invalid-app-credential` means **Phone Authentication is not enabled** in your Firebase project.

## ✅ Step-by-Step Fix

### Step 1: Enable Phone Authentication (REQUIRED)

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** (the one matching your `.env` file)
3. **Navigate to**: Authentication → **Sign-in method** (left sidebar)
4. **Find "Phone"** in the providers list
5. **Click on "Phone"**
6. **Toggle "Enable"** to ON
7. **Click "Save"**

### Step 2: Verify Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** (gear icon)
2. Scroll to **Authorized domains**
3. Ensure these are listed:
   - ✅ `localhost` (for development)
   - ✅ Your production domain (if deployed)
   - ✅ Your Firebase Hosting domain (e.g., `yourproject.web.app`)

### Step 3: Verify Firebase Config in `.env`

Check that your `.env` file has correct values:

```env
VITE_FIREBASE_API_KEY=AIzaSyDXoFyPkjgyspJy4cpqaPYHe70h-DqNf7k
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

**Important**: Make sure the `VITE_FIREBASE_PROJECT_ID` matches the project where you enabled Phone Auth.

### Step 4: Restart Development Server

After enabling Phone Authentication:

1. Stop your server (Ctrl+C or Cmd+C)
2. Run `npm run dev` again
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Try the phone number again

## 🔍 How to Verify It's Working

After completing the steps above:

1. The error should disappear
2. When you click "Send OTP", you should see:
   - No error message
   - The modal should switch to "Enter OTP Code" step
   - You should receive an SMS (or see it in Firebase Console if using test numbers)

## 🧪 Testing with Test Phone Numbers

To avoid SMS charges during development:

1. Go to **Authentication** → **Sign-in method** → **Phone**
2. Scroll to **Phone numbers for testing**
3. Click **Add phone number**
4. Add a test number (e.g., `+1 650-555-1234`)
5. Set a test code (e.g., `123456`)
6. Use this number in your app for testing

## ❌ Common Mistakes

- ❌ Enabling Phone Auth in the wrong Firebase project
- ❌ Not saving after enabling Phone Auth
- ❌ Using wrong `VITE_FIREBASE_PROJECT_ID` in `.env`
- ❌ Not restarting the dev server after enabling
- ❌ Domain not authorized (check localhost is in authorized domains)

## 🆘 Still Not Working?

If you still get the error after completing all steps:

1. **Double-check**: Go to Firebase Console → Authentication → Sign-in method
   - Is "Phone" showing as **Enabled**? (should be green/ON)
   
2. **Verify Project ID**: 
   - Check Firebase Console URL: `console.firebase.google.com/project/YOUR-PROJECT-ID`
   - Match it with `VITE_FIREBASE_PROJECT_ID` in your `.env`

3. **Check Browser Console**: Look for any other Firebase errors

4. **Try Incognito Mode**: Sometimes browser cache causes issues

## 📞 Need Help?

The error message in the app will now show:
> "Phone Authentication is not properly configured. Please enable Phone Authentication in Firebase Console (Authentication → Sign-in method → Phone)."

This confirms you need to complete Step 1 above.

