#!/bin/bash

# ARIS - AI Data Analyst Netlify Deployment Script
echo "🚀 Starting ARIS Netlify deployment process..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file with your environment variables before deploying."
    echo "See DEPLOYMENT_GUIDE.md for details."
    echo ""
    echo "Continuing with build process..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting checks..."
npm run lint

# Run build
echo "🏗️ Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🚀 Ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Create a new site from Git"
    echo "3. Connect your repository"
    echo "4. Set environment variables in Netlify dashboard"
    echo "5. Deploy!"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
    echo ""
    echo "Environment variables needed:"
    echo "- VITE_FIREBASE_API_KEY"
    echo "- VITE_FIREBASE_AUTH_DOMAIN"
    echo "- VITE_FIREBASE_DATABASE_URL"
    echo "- VITE_FIREBASE_PROJECT_ID"
    echo "- VITE_FIREBASE_STORAGE_BUCKET"
    echo "- VITE_FIREBASE_MESSAGING_SENDER_ID"
    echo "- VITE_FIREBASE_APP_ID"
    echo "- VITE_FIREBASE_MEASUREMENT_ID"
    echo "- VITE_GROQ_API_KEY"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
