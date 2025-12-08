# Firebase Phone Authentication Setup Guide

## Error: `auth/invalid-app-credential`

This error occurs when Firebase Phone Authentication is not properly configured in the Firebase Console. Follow these steps to fix it:

## Required Setup Steps

### 1. Enable Phone Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Phone** in the list of providers
5. Click on **Phone** and enable it
6. Click **Save**

### 2. Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domain(s):
   - For local development: `localhost` (should already be there)
   - For production: Your actual domain (e.g., `yourdomain.com`, `www.yourdomain.com`)
   - For Firebase Hosting: Your Firebase Hosting domain (e.g., `yourproject.web.app`)

### 3. Enable Phone Number Regions (CRITICAL - Required for SMS)

**⚠️ IMPORTANT:** After enabling Phone Authentication, you MUST enable the specific countries/regions where you want to send SMS messages.

1. In Firebase Console, go to **Authentication** → **Sign-in method** → **Phone**
2. Scroll down to **Phone numbers** section
3. Click on **Phone numbers** tab (or look for "Regions" or "Country codes")
4. You'll see a list of countries/regions
5. **Enable the regions** you need:
   - For India: Enable **India (+91)**
   - For USA: Enable **United States (+1)**
   - For other countries: Enable the respective country codes
6. Click **Save** after enabling regions

**Note:** If you don't enable a region, you'll get the error: `auth/operation-not-allowed` with message "SMS unable to be sent until this region enabled by the app developer."

**Common Regions to Enable:**
- **India (+91)** - For Indian phone numbers
- **United States (+1)** - For US/Canada phone numbers
- **United Kingdom (+44)** - For UK phone numbers
- Enable any other countries where your users are located

### 4. Set up reCAPTCHA (Required for Phone Auth)

Firebase Phone Authentication uses reCAPTCHA to prevent abuse. You have two options:

#### Option A: reCAPTCHA v3 (Recommended - Automatic)

Firebase automatically handles reCAPTCHA v3 for invisible verification. No additional setup needed if you've enabled Phone Authentication.

#### Option B: reCAPTCHA Enterprise (If using Enterprise)

If you're using Firebase with reCAPTCHA Enterprise:

1. Go to **Authentication** → **Settings** → **reCAPTCHA Enterprise**
2. Ensure reCAPTCHA Enterprise is enabled
3. Configure your reCAPTCHA Enterprise keys

### 5. Verify Firebase Configuration

Make sure your `.env` file has all required Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Test Phone Authentication

After completing the above steps:

1. Restart your development server
2. Try entering a phone number in the modal
3. The OTP should be sent successfully

## Common Issues and Solutions

### Issue: "Failed to initialize reCAPTCHA Enterprise config"

**Solution:** 
- Make sure Phone Authentication is enabled in Firebase Console
- Check that your domain is authorized
- For local development, ensure `localhost` is in authorized domains

### Issue: "auth/invalid-app-credential"

**Solution:**
- Verify Phone Authentication is enabled
- Check that your Firebase API key is correct
- Ensure your domain is authorized
- Make sure you're using the correct Firebase project

### Issue: "auth/operation-not-allowed" - "SMS unable to be sent until this region enabled"

**Solution:**
- **This is the most common issue!** You need to enable the phone number's country/region in Firebase Console
- Go to **Authentication** → **Sign-in method** → **Phone** → **Phone numbers** (or **Regions**)
- Enable the specific country code for the phone number (e.g., India +91, USA +1)
- Common regions to enable:
  - India (+91) - For numbers starting with +91
  - United States (+1) - For numbers starting with +1
  - United Kingdom (+44) - For numbers starting with +44
- After enabling, wait a few minutes and try again
- **Note:** Each country/region must be individually enabled

### Issue: OTP not received

**Solution:**
- Check that the phone number is in E.164 format (e.g., +1234567890)
- Verify Phone Authentication is enabled in Firebase Console
- **Verify the phone number's region is enabled** (see above)
- Check Firebase Console → Authentication → Users to see if the request was logged
- For testing, Firebase provides test phone numbers (check Firebase documentation)

## Testing with Test Phone Numbers

Firebase provides test phone numbers for development:

1. Go to **Authentication** → **Sign-in method** → **Phone**
2. Scroll down to **Phone numbers for testing**
3. Add test phone numbers with test OTP codes
4. Use these numbers during development to avoid SMS charges

Example test number:
- Phone: `+1 650-555-1234`
- Code: `123456`

## Production Considerations

1. **Quotas:** Firebase Phone Authentication has quotas. Check your usage in Firebase Console
2. **Billing:** SMS messages are charged. Monitor usage in Firebase Console
3. **Rate Limiting:** Implement rate limiting on your frontend to prevent abuse
4. **Error Handling:** The code already handles common errors gracefully

## Additional Resources

- [Firebase Phone Authentication Documentation](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase reCAPTCHA Setup](https://firebase.google.com/docs/auth/web/phone-auth#set-up-recaptcha-verifier)
- [Firebase Console](https://console.firebase.google.com/)

