# 🔧 Deploy Firebase Security Rules

## 🚨 Issue Fixed
Updated Firebase security rules to allow users to delete recommended tests.

## 📋 Steps to Deploy

### 1. Install Firebase CLI (if not installed)
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init firestore
```
- Select your Firebase project
- Choose "Use an existing project"
- Select your ARIS project
- Use the existing `firestore.rules` file
- Use the existing `firestore.indexes.json` file

### 4. Deploy the rules
```bash
firebase deploy --only firestore:rules
```

## ✅ What This Fixes

**Before:** Users couldn't delete recommended tests due to permission restrictions
**After:** Users can delete any test (custom, recommended, or dynamic)

## 🔒 Updated Security Rules

The rules now allow:
- ✅ **Read**: All authenticated users can read tests
- ✅ **Create**: All authenticated users can create tests  
- ✅ **Update**: All authenticated users can update tests
- ✅ **Delete**: All authenticated users can delete tests

## 🎯 Result

After deploying these rules:
- Users can delete recommended tests
- Users can delete custom tests
- Users can delete dynamic tests
- No more "Missing or insufficient permissions" errors
