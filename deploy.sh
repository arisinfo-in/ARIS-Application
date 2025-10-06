#!/bin/bash

# ARIS - AI Data Analyst Deployment Script
echo "🚀 Starting ARIS deployment process..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your Firebase and Gemini API keys."
    echo "See README.md for details."
    exit 1
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
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Deployment options:"
    echo "1. Vercel: vercel --prod"
    echo "2. Netlify: Deploy the 'dist' folder"
    echo "3. Firebase: firebase deploy"
    echo "4. Any static hosting: Upload 'dist' folder contents"
    echo ""
    echo "Don't forget to set your environment variables in your hosting platform!"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
