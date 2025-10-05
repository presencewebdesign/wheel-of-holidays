import { useState, Suspense } from 'react';
import type { Holiday } from './types';
import HolidayForm from './components/HolidayForm';
import SpinningWheel from './components/SpinningWheel';
import './App.css';

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          Wheel Of Holidays
        </h1>
        <p className="app-subtitle">
          ✈️ Create your dream destinations and spin to win! 🏖️
        </p>
      </header>

      <main className="app-main">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <div className="app-content">
            <HolidayForm 
              holidays={holidays} 
              onHolidaysChange={setHolidays} 
            />
            
            <SpinningWheel holidays={holidays} />
          </div>
        </Suspense>
      </main>

      <footer className="app-footer">
        <p>🌴 Made with ❤️ for your dream vacation! 🌊</p>
      </footer>
    </div>
  );
}

export default App;
