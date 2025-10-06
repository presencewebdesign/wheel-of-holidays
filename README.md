# 🎪 Holiday Picker Wheel 🎪

A fun, interactive holiday picker app built with React, Vite, and Firebase! Create a list of holidays and spin the wheel to randomly select one.

## 🌐 Live Demo

**[Try it out live!](https://holiday-picker-12345.web.app)** 🎉

_Note: Replace the URL above with your actual Firebase Hosting URL after deployment_

## Features

- 🎄 Add and remove holidays from your list
- 🎡 Beautiful animated spinning wheel
- 🎯 Game show and holiday themed styling
- 📱 Responsive design for mobile and desktop
- 🔥 Firebase integration for data persistence
- ⚡ Built with Vite for fast development

## Getting Started

### Prerequisites

- Node.js (v20.9.0 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd holiday-picker
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Get your Firebase config
   - Update `src/firebase.ts` with your config

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Get your Firebase configuration from Project Settings
4. Replace the placeholder values in `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};
```

## Deployment

### Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init hosting
```

4. Build and deploy:

```bash
npm run build
firebase deploy
```

## Usage

1. **Add Holidays**: Enter holiday names in the text input and click "Add Holiday"
2. **Remove Holidays**: Click the ✕ button next to any holiday to remove it
3. **Spin the Wheel**: Once you have holidays added, click "Spin the Wheel!" to randomly select one
4. **Reset**: Click "Reset Wheel" to spin again

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Firebase** for hosting and database
- **CSS3** with animations and gradients
- **React Suspense** for loading states

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own holiday fun!

# wheel-of-holidays
