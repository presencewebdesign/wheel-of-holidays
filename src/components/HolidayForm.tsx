import React, { useState } from 'react';
import type { Holiday } from '../types';

interface HolidayFormProps {
  onHolidaysChange: (holidays: Holiday[]) => void;
  holidays: Holiday[];
}

const HolidayForm: React.FC<HolidayFormProps> = ({ onHolidaysChange, holidays }) => {
  const [holidayName, setHolidayName] = useState('');

  const addHoliday = () => {
    if (holidayName.trim()) {
      const newHoliday: Holiday = {
        id: Date.now().toString(),
        name: holidayName.trim(),
        createdAt: new Date()
      };
      onHolidaysChange([...holidays, newHoliday]);
      setHolidayName('');
    }
  };

  const removeHoliday = (id: string) => {
    onHolidaysChange(holidays.filter(holiday => holiday.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addHoliday();
    }
  };

  return (
    <div className="holiday-form">
      <h2 className="form-title">🏝️ Add Your Destinations 🏝️</h2>
      
      <div className="input-group">
        <input
          type="text"
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter destination name..."
          className="holiday-input"
        />
        <button onClick={addHoliday} className="add-button">
          ✈️ Add Destination
        </button>
      </div>

      <div className="holidays-list">
        {holidays.map((holiday) => (
          <div key={holiday.id} className="holiday-item">
            <span className="holiday-name">🌴 {holiday.name}</span>
            <button 
              onClick={() => removeHoliday(holiday.id)}
              className="remove-button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {holidays.length > 0 && (
        <div className="holiday-count">
          🗺️ Total Destinations: {holidays.length}
        </div>
      )}
    </div>
  );
};

export default HolidayForm;
