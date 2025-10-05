import React, { useState, useRef } from 'react';
import type { Holiday } from '../types';

interface SpinningWheelProps {
  holidays: Holiday[];
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({ holidays }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Truncate text to max 6 characters for display on wheel
  const truncateText = (text: string, maxLength: number = 6): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '..';
  };

  const spinWheel = () => {
    if (holidays.length < 2 || isSpinning) return;

    setIsSpinning(true);
    setSelectedHoliday(null);

    // Calculate random rotation (multiple full rotations + random angle)
    const randomRotation = Math.random() * 360 + 1800; // 5+ full rotations
    
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    }

    // Calculate which holiday was selected
    // The pointer is at the top (0 degrees), so we need to find which segment is under it
    const anglePerHoliday = 360 / holidays.length;
    const normalizedAngle = randomRotation % 360;
    
    // Adjust for pointer at top (0 degrees) - the wheel rotates clockwise
    // We need to find which segment's range includes 0 degrees after rotation
    const pointerAngle = (360 - normalizedAngle) % 360;
    const selectedIndex = Math.floor(pointerAngle / anglePerHoliday) % holidays.length;

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedHoliday(holidays[selectedIndex]);
    }, 3000); // Match the CSS transition duration
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
    setSelectedHoliday(null);
  };

  if (holidays.length < 2) {
    return (
      <div className="wheel-container">
        <div className="wheel-placeholder">
          <h3>🎯 Add at least two destinations</h3>
          <p>Enter destination names above. The wheel needs 2+ to spin (2 = 50/50).</p>
        </div>
      </div>
    );
  }

  // Special 50/50 layout for exactly two holidays using a conic gradient
  if (holidays.length === 2) {
    return (
      <div className="wheel-container">
        <div className="wheel-wrapper">
          <div className="wheel-pointer"></div>
          <div
            ref={wheelRef}
            className={`wheel ${isSpinning ? 'spinning' : ''}`}
            style={{
              background: `conic-gradient(#3498db 0 50%, #e74c3c 50% 100%)`
            }}
          >
            {/* labels at 25% and 75% */}
            <span className="wheel-label" style={{ transform: 'rotate(90deg) translate(0, -100px)', transformOrigin: 'center center' }}>
              {truncateText(holidays[0].name)}
            </span>
            <span className="wheel-label" style={{ transform: 'rotate(270deg) translate(0, -100px)', transformOrigin: 'center center' }}>
              {truncateText(holidays[1].name)}
            </span>
          </div>
        </div>

        <div className="wheel-controls">
          <button 
            onClick={spinWheel} 
            disabled={isSpinning}
            className="spin-button"
          >
            {isSpinning ? '🌊 Spinning...' : '🎯 Spin the Wheel!'}
          </button>
          
          {selectedHoliday && (
            <button onClick={resetWheel} className="reset-button">
              🔄 Reset Wheel
            </button>
          )}
        </div>

        {selectedHoliday && (
          <div className="winner-announcement">
            <h2 className="winner-title">🎉 Congratulations! 🎉</h2>
            <div className="winner-holiday">
              <h3>Your winning destination is:</h3>
              <div className="selected-holiday">
                ✈️ {selectedHoliday.name} 🏖️
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Generate conic gradient for multiple segments
  const anglePerSegment = 360 / holidays.length;
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  
  const conicGradientStops = holidays.map((_, index) => {
    const startAngle = index * anglePerSegment;
    const endAngle = (index + 1) * anglePerSegment;
    const color = colors[index % colors.length];
    return `${color} ${startAngle}deg ${endAngle}deg`;
  }).join(', ');

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>
        <div 
          ref={wheelRef}
          className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{
            background: `conic-gradient(from 0deg, ${conicGradientStops})`
          }}
        >
          {holidays.map((holiday, index) => {
            // Calculate the middle angle of each segment for label positioning
            const middleAngle = (index * anglePerSegment) + (anglePerSegment / 2);
            const radius = 100; // Distance from center to place the label
            
            return (
              <span
                key={holiday.id}
                className="wheel-label-multi"
                style={{
                  transform: `rotate(${middleAngle}deg) translate(0, -${radius}px)`,
                  transformOrigin: 'center center'
                }}
              >
                {truncateText(holiday.name)}
              </span>
            );
          })}
        </div>
      </div>

      <div className="wheel-controls">
        <button 
          onClick={spinWheel} 
          disabled={isSpinning}
          className="spin-button"
        >
          {isSpinning ? '🌊 Spinning...' : '🎯 Spin the Wheel!'}
        </button>
        
        {selectedHoliday && (
          <button onClick={resetWheel} className="reset-button">
            🔄 Reset Wheel
          </button>
        )}
      </div>

      {selectedHoliday && (
        <div className="winner-announcement">
          <h2 className="winner-title">🎉 Congratulations! 🎉</h2>
          <div className="winner-holiday">
            <h3>Your winning destination is:</h3>
            <div className="selected-holiday">
              ✈️ {selectedHoliday.name} 🏖️
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;
