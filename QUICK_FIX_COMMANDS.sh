#!/bin/bash
# Quick Fix Commands for Firebase Phone Authentication
# Project: aris-aidataanlayst

echo "🚀 Starting Firebase Phone Auth Setup..."
echo "Project ID: aris-aidataanlayst"
echo ""

# Step 1: Enable Required APIs
echo "📡 Step 1: Enabling Required APIs..."
/Users/syedrahman/gcloud/google-cloud-sdk/bin/gcloud services enable identitytoolkit.googleapis.com --project=aris-aidataanlayst
/Users/syedrahman/gcloud/google-cloud-sdk/bin/gcloud services enable recaptchaenterprise.googleapis.com --project=aris-aidataanlayst
/Users/syedrahman/gcloud/google-cloud-sdk/bin/gcloud services enable cloudresourcemanager.googleapis.com --project=aris-aidataanlayst

echo ""
echo "✅ APIs enabled!"
echo ""

# Step 2: Verify APIs
echo "🔍 Step 2: Verifying Enabled APIs..."
/Users/syedrahman/gcloud/google-cloud-sdk/bin/gcloud services list --enabled --project=aris-aidataanlayst | grep -E "identitytoolkit|recaptcha"

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Firebase Console: https://console.firebase.google.com/project/aris-aidataanlayst"
echo "2. Navigate to: Authentication → Sign-in method → Phone"
echo "3. Enable Phone Authentication"
echo "4. Enable phone number regions (India +91, etc.)"
echo "5. Check authorized domains in Authentication → Settings"
echo ""
echo "📖 See FIREBASE_PHONE_AUTH_COMPLETE_FIX.md for detailed instructions"

