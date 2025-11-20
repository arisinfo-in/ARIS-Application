# Google Classroom Integration Setup Guide

## ✅ Implementation Complete!

The Google Classroom integration has been successfully implemented in your ARIS application. This guide will help you complete the setup.

## 📋 What's Been Implemented

1. ✅ **Google Classroom Service** (`src/services/googleClassroomService.ts`)
   - OAuth 2.0 authentication flow
   - Token management and storage
   - API calls to Google Classroom
   - Course listing, coursework, and submissions

2. ✅ **Classroom Page Component** (`src/pages/Classroom.tsx`)
   - Beautiful UI matching your app's design
   - Course listing sidebar
   - Assignment viewer
   - Join class functionality
   - Submission status tracking

3. ✅ **Navigation & Routing**
   - Added "Classroom" link to Sidebar
   - Added route in App.tsx
   - Protected route with authentication

4. ✅ **Firestore Security Rules**
   - Added rules for Classroom token storage
   - User-specific access control

5. ✅ **Dependencies**
   - Installed `gapi-script` library

## 🔧 Setup Steps

### Step 1: Configure Google Cloud Console

1. **Add Redirect URIs**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to: APIs & Services → Credentials
   - Click on your OAuth 2.0 Client ID
   - Add these **Authorized JavaScript origins**:
     - `http://localhost:5173` (development)
     - `https://aris-aidataanlayst.web.app` (production)
   - Add these **Authorized redirect URIs**:
     - `http://localhost:5173/auth/google/callback`
     - `https://aris-aidataanlayst.web.app/auth/google/callback`

2. **Verify OAuth Consent Screen Scopes**
   - Go to: APIs & Services → OAuth consent screen
   - Ensure these scopes are added:
     - `https://www.googleapis.com/auth/classroom.courses.readonly`
     - `https://www.googleapis.com/auth/classroom.coursework.me.readonly`
     - `https://www.googleapis.com/auth/classroom.coursework.students.readonly`
     - `https://www.googleapis.com/auth/classroom.rosters.readonly`
     - `https://www.googleapis.com/auth/classroom.profile.emails`
     - `https://www.googleapis.com/auth/classroom.profile.photos`

### Step 2: Environment Variables

Create a `.env` file in your project root (if it doesn't exist) and add:

```env
# Google Classroom API
VITE_GOOGLE_CLASSROOM_CLIENT_ID=1038441051375-kops6hbscdh2jm6foua8ru70jdc6nedp.apps.googleusercontent.com
VITE_GOOGLE_CLASSROOM_CLIENT_SECRET=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
```

**⚠️ Important Security Notes:**
- The `.env` file should be in your `.gitignore` (never commit secrets)
- For production on Firebase Hosting, add these as environment variables in Firebase Console
- Client Secret should ideally be stored server-side (Firebase Functions) for better security

### Step 3: Firebase Hosting Environment Variables

For production deployment on Firebase Hosting:

1. Go to Firebase Console → Your Project → Functions
2. Add environment variables:
   - `VITE_GOOGLE_CLASSROOM_CLIENT_ID`
   - `VITE_GOOGLE_CLASSROOM_CLIENT_SECRET`

Or use Firebase Functions secrets (recommended):
```bash
firebase functions:secrets:set GOOGLE_CLASSROOM_CLIENT_SECRET
```

### Step 4: Deploy Firestore Rules

Deploy the updated Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### Step 5: Test the Integration

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Navigate to `/classroom` in your app
   - Click "Connect to Google Classroom"
   - Complete OAuth flow
   - Verify courses are loaded

3. **Test Features**
   - View course list
   - Select a course to view assignments
   - Check submission status
   - Try joining a class with enrollment code

## 🎯 Features Available

### For Students:
- ✅ View all enrolled courses
- ✅ See assignments and due dates
- ✅ Check submission status
- ✅ View course materials (links, files, videos)
- ✅ Join new classes with enrollment code
- ✅ Open assignments directly in Google Classroom

### UI Features:
- ✅ Neumorphic design matching your app
- ✅ Real-time course updates
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Clean, intuitive interface

## 🔒 Security Considerations

1. **Token Storage**: Tokens are stored in Firestore under `users/{userId}/classroomTokens/token`
2. **Access Control**: Only the user can access their own tokens (Firestore rules)
3. **Token Refresh**: Automatic token refresh when expired
4. **Secure Storage**: Consider moving Client Secret to Firebase Functions for production

## 🐛 Troubleshooting

### Issue: "Not authenticated" error
- **Solution**: Click "Connect to Google Classroom" and complete OAuth flow

### Issue: "Failed to load courses"
- **Check**: Verify redirect URIs are correctly configured in Google Cloud Console
- **Check**: Ensure Classroom API is enabled in your Google Cloud project

### Issue: "Invalid client" error
- **Solution**: Verify Client ID and Client Secret in `.env` file
- **Solution**: Ensure redirect URIs match exactly in Google Cloud Console

### Issue: Token refresh fails
- **Solution**: User may need to re-authenticate. Click "Disconnect" then "Connect" again

## 📚 API Usage

The service provides these functions:

```typescript
// Authentication
authenticateWithGoogle(userId: string): Promise<GoogleClassroomToken>
isAuthenticated(userId: string): Promise<boolean>
signOutFromGoogle(userId: string): Promise<void>

// Courses
listCourses(userId: string): Promise<ClassroomCourse[]>
getCourse(userId: string, courseId: string): Promise<ClassroomCourse>
joinCourse(userId: string, enrollmentCode: string): Promise<ClassroomCourse>

// Coursework
listCoursework(userId: string, courseId: string): Promise<ClassroomCoursework[]>
getStudentSubmissions(userId: string, courseId: string, courseWorkId: string): Promise<StudentSubmission[]>
```

## 🚀 Production Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

3. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

4. **Set Environment Variables** in Firebase Console (if using environment variables)

## 📝 Next Steps (Optional Enhancements)

- [ ] Add notifications for new assignments
- [ ] Implement assignment submission from the app
- [ ] Add grade tracking and analytics
- [ ] Sync with study plans
- [ ] Add calendar integration for due dates
- [ ] Implement course material download

## ✅ Checklist

- [x] Google Classroom API enabled
- [x] OAuth Client ID and Secret obtained
- [x] Redirect URIs configured
- [x] Scopes added to OAuth consent screen
- [ ] Environment variables set in `.env`
- [ ] Firestore rules deployed
- [ ] Tested in development
- [ ] Deployed to production

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all configuration steps are completed
3. Ensure Google Classroom API is enabled
4. Check Firestore rules are deployed correctly

---

**Implementation Date**: $(date)
**Version**: 1.0.0
**Status**: ✅ Ready for Testing

