#!/bin/bash

# Deploy Firebase Security Rules
echo "Deploying Firebase Security Rules..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI is not installed. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
echo "Checking Firebase authentication..."
firebase login --no-localhost

# Deploy Firestore rules
echo "Deploying Firestore security rules..."
firebase deploy --only firestore:rules

echo "Firebase security rules deployed successfully!"
echo "Your test deletion should now work properly."
