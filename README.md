# 🎪 Holiday Picker Wheel 🎪

A fun, interactive holiday picker app built with React, Vite, and Firebase! Create a list of destinations and spin the wheel to randomly select your next holiday destination.

## 🌐 Live Demo

**[Try it out live!](https://holiday-picker-12345.web.app)** 🎉

_Note: Replace the URL above with your actual Firebase Hosting URL after deployment_

## Features

- ✈️ Add and remove holiday destinations from your list
- 🎡 Beautiful animated spinning wheel with dynamic segments
- 🎯 Game show themed styling with beach vibes
- 📱 Fully responsive design optimized for mobile and desktop
- 🔥 Firebase Datastore integration for data persistence
- ⚡ Built with Vite for lightning-fast development
- 🎨 Dynamic text positioning with smart truncation
- 🌊 Smooth animations and visual effects

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

1. **Add Destinations**: Enter holiday destination names in the text input and click "Add Holiday"
2. **Remove Destinations**: Click the ✕ button next to any destination to remove it
3. **Spin the Wheel**: Once you have at least 2 destinations, click "🎯 Spin the Wheel!" to randomly select one
4. **Reset**: Click "🔄 Reset Wheel" to spin again
5. **Mobile Optimized**: Works perfectly on phones, tablets, and desktops with responsive text sizing

### How It Works

- The wheel dynamically adjusts based on the number of destinations you add
- Text labels are intelligently positioned and sized for optimal readability
- Each destination gets its own colorful segment on the wheel
- The spinning animation includes multiple rotations for excitement

## Technologies Used

- **React 18** with TypeScript for type safety
- **Vite** for ultra-fast build tooling and HMR
- **Firebase Datastore** for data persistence
- **CSS3** with advanced animations, gradients, and responsive design
- **React Suspense** for smooth loading states
- **Mathematical positioning** using polar coordinates for precise label placement
- **Dynamic styling** with responsive font sizes and mobile optimization

## Recent Updates

### Latest Improvements

- ✅ **Mobile Text Clarity**: Fixed text visibility and readability on all screen sizes
- ✅ **Dynamic Positioning**: Labels now automatically adjust based on number of destinations
- ✅ **Smart Text Truncation**: Text length adapts to segment size for optimal display
- ✅ **Responsive Design**: Enhanced mobile experience with proper font scaling
- ✅ **Mathematical Precision**: Uses polar coordinates for perfect label positioning
- ✅ **Visual Polish**: Improved contrast, shadows, and styling for better UX

### Technical Enhancements

- Polar coordinate system for accurate label positioning
- Dynamic distance calculation based on segment count
- Responsive font sizing across all breakpoints
- Optimized transform calculations for smooth animations
- Enhanced CSS with better mobile support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - feel free to use this project for your own holiday fun! 🎉

---

**Made with ❤️ for choosing your next adventure!** ✈️🏖️
