import React from 'react';
import { motion } from 'motion/react';

export const CardIllustration: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-6">
      <motion.svg 
        viewBox="0 0 200 200" 
        className="h-full w-auto max-h-[100px] md:max-h-none md:w-full max-w-[280px] drop-shadow-lg" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Decorative sparkles behind */}
        <motion.path 
          d="M 30 40 L 35 60 L 55 65 L 35 70 L 30 90 L 25 70 L 5 65 L 25 60 Z" 
          fill="#fff3c4" 
          stroke="#374151" 
          strokeWidth="3" 
          strokeLinejoin="round" 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path 
          d="M 160 20 L 163 35 L 178 38 L 163 41 L 160 56 L 157 41 L 142 38 L 157 35 Z" 
          fill="#ffb6c1" 
          stroke="#374151" 
          strokeWidth="3" 
          strokeLinejoin="round"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        {/* Stack of Books */}
        <g transform="translate(40, 100)">
          {/* Bottom Book */}
          <rect x="0" y="50" width="120" height="25" rx="4" fill="#e6c4ff" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          <line x1="0" y1="62" x2="120" y2="62" stroke="#374151" strokeWidth="3" opacity="0.3" />
          {/* Middle Book */}
          <rect x="10" y="25" width="105" height="25" rx="4" fill="#d4f0d4" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          <line x1="10" y1="37" x2="115" y2="37" stroke="#374151" strokeWidth="3" opacity="0.3" />
          {/* Top Book */}
          <rect x="20" y="0" width="85" height="25" rx="4" fill="#ffd8c4" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          <line x1="20" y1="12" x2="105" y2="12" stroke="#374151" strokeWidth="3" opacity="0.3" />
        </g>

        {/* Apple on Top */}
        <g transform="translate(100, 85)">
          {/* Leaf */}
          <path d="M 0 -15 Q 15 -25 15 -10 Q 0 0 0 -15 Z" fill="#699b79" stroke="#374151" strokeWidth="3" strokeLinejoin="round" />
          {/* Apple Body */}
          <circle cx="0" cy="0" r="18" fill="#ff6b6b" stroke="#374151" strokeWidth="4" />
          <path d="M -8 -8 Q -5 -12 0 -12 Q 5 -12 8 -8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Leaning Pencil */}
        <g transform="translate(30, 80) rotate(20)">
          {/* Pencil Body */}
          <rect x="0" y="0" width="15" height="80" fill="#fff3c4" stroke="#374151" strokeWidth="4" />
          {/* Lines */}
          <line x1="5" y1="0" x2="5" y2="80" stroke="#374151" strokeWidth="2" />
          <line x1="10" y1="0" x2="10" y2="80" stroke="#374151" strokeWidth="2" />
          {/* Metal Band */}
          <rect x="0" y="0" width="15" height="10" fill="#ccc" stroke="#374151" strokeWidth="4" />
          {/* Eraser */}
          <path d="M 0 0 L 0 -8 Q 0 -12 7.5 -12 Q 15 -12 15 -8 L 15 0 Z" fill="#ffb6c1" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          {/* Wood Tip */}
          <path d="M 0 80 L 7.5 100 L 15 80 Z" fill="#d4a373" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          {/* Lead */}
          <path d="M 4 90 L 7.5 100 L 11 90 Z" fill="#374151" />
        </g>
      </motion.svg>
    </div>
  );
};
