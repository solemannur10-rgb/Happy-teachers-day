import React from 'react';

export const BuntingFlags: React.FC = () => {
  return (
    <>
      {/* Top Left Flag */}
      <div className="absolute top-0 left-0 w-32 md:w-48 pointer-events-none z-10 opacity-90">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          {/* String */}
          <path d="M 0 0 Q 100 20 200 0" fill="none" stroke="#374151" strokeWidth="2" />
          {/* Flags */}
          <path d="M 10 2 Q 25 35 40 5 L 25 50 Z" fill="#ffb6c1" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 50 5 Q 65 38 80 8 L 65 55 Z" fill="#ffd8c4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 90 9 Q 105 42 120 11 L 105 60 Z" fill="#e6c4ff" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 130 11 Q 145 42 160 10 L 145 58 Z" fill="#fff3c4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Top Right Flag */}
      <div className="absolute top-0 right-0 w-32 md:w-48 pointer-events-none z-10 opacity-90" style={{ transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          {/* String */}
          <path d="M 0 0 Q 100 20 200 0" fill="none" stroke="#374151" strokeWidth="2" />
          {/* Flags */}
          <path d="M 10 2 Q 25 35 40 5 L 25 50 Z" fill="#fff3c4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 50 5 Q 65 38 80 8 L 65 55 Z" fill="#ffb6c1" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 90 9 Q 105 42 120 11 L 105 60 Z" fill="#d4f0d4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 130 11 Q 145 42 160 10 L 145 58 Z" fill="#ffd8c4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
};
