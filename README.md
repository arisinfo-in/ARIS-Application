# ARIS - AI Data Analyst

A comprehensive React-based learning platform designed to teach data analysis skills through AI-powered tutoring, practice tests, and structured study plans.

## 🚀 Features

- **🔐 Authentication System** - Google OAuth integration with Firebase
- **🤖 AI Tutoring Modules** - 8 specialized modules with real Gemini API integration
- **📝 Practice Tests** - Complete test taking functionality with real-time scoring
- **📅 Study Plans** - Personalized learning schedules with progress tracking
- **📊 Dashboard** - Analytics and progress visualization
- **👨‍💼 Admin Panel** - User management and system administration
- **🎨 Neumorphic UI** - Modern, tactile design system

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom neumorphic components
- **Backend:** Firebase (Auth, Firestore, Functions, Storage, Analytics)
- **AI Integration:** Google Gemini API
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Handling:** date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aris-ai-data-analyst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to Netlify

3. **Set environment variables** in Netlify dashboard

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google provider)
3. Create a Firestore database
4. Enable Analytics (optional)
5. Get your configuration keys and add them to `.env`

### Gemini API Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to your `.env` file

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navbar.tsx
│   ├── NeumorphicButton.tsx
│   ├── NeumorphicCard.tsx
│   └── Sidebar.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── firebase/            # Firebase configuration
│   ├── auth.ts
│   ├── config.ts
│   └── firestore.ts
├── pages/               # Page components
│   ├── AdminPanel.tsx
│   ├── AITutor.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── StudyPlans.tsx
│   ├── TestAttempt.tsx
│   ├── TestResults.tsx
│   └── Tests.tsx
├── services/            # External service integrations
│   └── geminiService.ts
├── utils/               # Utility functions
│   └── validation.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔒 Security Features

- Environment variables for sensitive data
- Input validation and sanitization
- Security headers
- Error boundaries for graceful error handling
- Protected routes with authentication

## 📈 Performance Optimizations

- Code splitting with React.lazy()
- Manual chunk splitting for better caching
- Optimized bundle size
- Lazy loading of components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@aris-ai.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with full functionality
  - AI tutoring with Gemini API
  - Complete test taking system
  - Study plan management
  - Admin panel
  - Production-ready deployment
