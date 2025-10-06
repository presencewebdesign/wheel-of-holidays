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

    // Calculate random rotation (variable full rotations + random angle)
    // Always calculate from 0deg to ensure full spin, then add 180deg for upside-down wheel
    const baseRotations = Math.floor(Math.random() * 8) + 5; // 5-12 full rotations
    const randomAngle = Math.random() * 360; // 0-360 degrees
    const randomRotation = (baseRotations * 360) + randomAngle + 180; // Variable spins + random angle + 180deg offset
    
    if (wheelRef.current) {
      // First reset to 0deg without transition, then apply full rotation with transition
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
      
      // Force a reflow to ensure the reset is applied
      void wheelRef.current.offsetHeight;
      
      // Now apply the full rotation with transition
      wheelRef.current.style.transition = 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)';
      wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    }

    // Calculate which holiday was selected
    // The wheel is upside down (starts from 180deg), so the pointer is at 180deg from wheel's perspective
    const anglePerHoliday = 360 / holidays.length;
    const normalizedAngle = randomRotation % 360;
    
    // Adjust for pointer at 180 degrees (bottom of upside-down wheel)
    // We need to find which segment's range includes 180 degrees after rotation
    const pointerAngle = (180 - normalizedAngle + 360) % 360;
    const selectedIndex = Math.floor(pointerAngle / anglePerHoliday) % holidays.length;

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedHoliday(holidays[selectedIndex]);
    }, 3000); // Match the CSS transition duration
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(180deg)';
    }
    setSelectedHoliday(null);
  };

  if (holidays.length < 2) {
    return (
      <div className="wheel-container">
        <div className="wheel-placeholder">
          <div className="placeholder-icon">⚠️</div>
          <h3>Add at least 2 destinations to spin the wheel!</h3>
          <p className="placeholder-instruction">
            👆 Enter destination names in the form above
          </p>
          <p className="placeholder-hint">
            (2 destinations = 50/50 choice)
          </p>
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
              background: `conic-gradient(from 180deg, ${holidays[0].color} 0 50%, ${holidays[1].color} 50% 100%)`
            }}
          >
            {/* labels positioned at the outer edge of their sections */}
            <span className="wheel-label" style={{ transform: 'rotate(270deg) translate(0, min(-42%, -130px))', transformOrigin: 'center center', color: holidays[0].color }}>
              {truncateText(holidays[0].name)}
            </span>
            <span className="wheel-label" style={{ transform: 'rotate(90deg) translate(0, min(-42%, -130px))', transformOrigin: 'center center', color: holidays[1].color }}>
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
  
  const conicGradientStops = holidays.map((holiday, index) => {
    const startAngle = index * anglePerSegment;
    const endAngle = (index + 1) * anglePerSegment;
    return `${holiday.color} ${startAngle}deg ${endAngle}deg`;
  }).join(', ');

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>
        <div 
          ref={wheelRef}
          className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{
            background: `conic-gradient(from 180deg, ${conicGradientStops})`
          }}
        >
          {holidays.map((holiday, index) => {
            // Calculate the middle angle of each segment for label positioning
            // Since wheel starts from 180deg, adjust the angle calculation
            const middleAngle = 180 + (index * anglePerSegment) + (anglePerSegment / 2);
            
            return (
              <span
                key={holiday.id}
                className="wheel-label-multi"
                style={{
                  transform: `rotate(${middleAngle}deg) translate(0, min(-42%, -130px))`,
                  transformOrigin: 'center center',
                  color: holiday.color
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
