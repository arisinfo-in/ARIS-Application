# 🔧 Manual Firebase Security Rules Fix

## 🚨 Issue
The Firebase security rules need to be deployed to the correct project: `aris-aidataanlayst`

## 📋 Manual Steps to Fix

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project: `aris-aidataanlayst`

### Step 2: Navigate to Firestore
1. In the left sidebar, click on **"Firestore Database"**
2. Click on the **"Rules"** tab

### Step 3: Replace the Rules
Replace the existing rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tests - users can read and delete all tests
    match /tests/{testId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
    
    // Test attempts - users can only access their own attempts
    match /testAttempts/{attemptId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // AI sessions - users can only access their own sessions
    match /aiSessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Study plans - users can only access their own study plans
    match /studyPlans/{planId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Step 4: Publish the Rules
1. Click **"Publish"** button
2. Confirm the changes

## ✅ What This Fixes

After publishing these rules:
- ✅ Users can delete any test (including recommended tests)
- ✅ No more "Missing or insufficient permissions" errors
- ✅ Test deletion will work properly
- ✅ All test types can be deleted

## 🎯 Result

Once you publish these rules in the Firebase Console, the test deletion will work immediately without any code changes!
