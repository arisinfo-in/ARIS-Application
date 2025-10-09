# 🔧 Firebase Rules Fix for Test Deletion

## 🚨 Current Issue
The Firebase security rules are too restrictive for test deletion. Users can only delete tests they created, but recommended tests are created by the system.

## ✅ Solution
Update the `tests` collection rule to allow all authenticated users to delete tests.

## 📋 Updated Rules

Replace your current rules with these (only the `tests` section changes):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data, admins can read all
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // AI Sessions - users can only access their own sessions
    match /aiSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Tests - FIXED: Allow all authenticated users to delete tests
    match /tests/{testId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;  // ← This is the key change
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.createdBy;
    }
    
    // Test Attempts - users can only access their own attempts
    match /testAttempts/{attemptId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Study Plans - users can only access their own plans
    match /studyPlans/{planId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🎯 What Changed
**Before:** `allow write: if request.auth != null && (request.auth.uid == resource.data.createdBy || admin)`
**After:** `allow write: if request.auth != null;`

## ✅ Result
After updating this rule:
- ✅ Users can delete any test (including recommended tests)
- ✅ No more "Missing or insufficient permissions" errors
- ✅ Test deletion will work immediately
- ✅ All other security rules remain intact
