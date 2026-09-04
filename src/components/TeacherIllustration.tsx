import React from 'react';
import { motion } from 'motion/react';

export const TeacherIllustration: React.FC = () => {
  return (
    <motion.div 
      className="relative w-72 h-72 md:w-96 md:h-96"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Background Circle */}
      <div className="absolute inset-0 bg-pastel-yellow rounded-full border-4 border-charcoal shadow-[8px_8px_0px_rgba(55,65,81,0.1)] overflow-hidden">
        
        {/* SVG Illustration */}
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Blackboard */}
          <rect x="30" y="40" width="100" height="70" rx="4" fill="#699b79" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
          {/* Blackboard frame bottom */}
          <rect x="25" y="110" width="110" height="6" rx="2" fill="#d4a373" stroke="#374151" strokeWidth="3" />
          {/* Chalk & Eraser */}
          <rect x="35" y="104" width="15" height="6" fill="#fff" stroke="#374151" strokeWidth="2" />
          <rect x="55" y="102" width="20" height="8" rx="2" fill="#ffb6c1" stroke="#374151" strokeWidth="2" />
          
          {/* ABC on board */}
          <text x="45" y="70" fontFamily="'Fredoka', sans-serif" fontSize="18" fill="#fff" opacity="0.8">ABC</text>
          <text x="45" y="90" fontFamily="'Fredoka', sans-serif" fontSize="14" fill="#fff" opacity="0.8">1 2 3</text>

          {/* Teacher Desk */}
          <rect x="20" y="160" width="160" height="40" rx="4" fill="#ffd8c4" stroke="#374151" strokeWidth="4" />
          
          {/* Apple on Desk */}
          <circle cx="50" cy="150" r="10" fill="#ff6b6b" stroke="#374151" strokeWidth="3" />
          <path d="M 50 140 Q 55 135 60 140" fill="none" stroke="#699b79" strokeWidth="3" strokeLinecap="round" />
          
          {/* Books on desk */}
          <rect x="120" y="145" width="30" height="15" rx="2" fill="#e6c4ff" stroke="#374151" strokeWidth="3" />
          <rect x="125" y="130" width="25" height="15" rx="2" fill="#ffb6c1" stroke="#374151" strokeWidth="3" />

          {/* Teacher Character */}
          <g transform="translate(90, 75)">
            {/* Body */}
            <path d="M -15 85 Q -10 30 0 20 Q 10 30 15 85 Z" fill="#d4f0d4" stroke="#374151" strokeWidth="4" strokeLinejoin="round" />
            {/* Neck */}
            <rect x="-4" y="15" width="8" height="10" fill="#ffd8c4" stroke="#374151" strokeWidth="3" />
            {/* Head */}
            <circle cx="0" cy="0" r="18" fill="#ffd8c4" stroke="#374151" strokeWidth="4" />
            {/* Hair */}
            <path d="M -20 0 Q -25 -25 0 -22 Q 25 -25 20 0 Q 25 15 22 25 Q 15 25 18 10 Q 0 -15 -18 10 Q -15 25 -22 25 Q -25 15 -20 0 Z" fill="#374151" />
            {/* Glasses */}
            <circle cx="-6" cy="2" r="5" fill="none" stroke="#374151" strokeWidth="2" />
            <circle cx="6" cy="2" r="5" fill="none" stroke="#374151" strokeWidth="2" />
            <line x1="-1" y1="2" x2="1" y2="2" stroke="#374151" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="-6" cy="2" r="1.5" fill="#374151" />
            <circle cx="6" cy="2" r="1.5" fill="#374151" />
            {/* Smile */}
            <path d="M -4 10 Q 0 15 4 10" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            
            {/* Arm holding pointer */}
            <path d="M -10 25 Q -25 40 -30 25" fill="none" stroke="#d4f0d4" strokeWidth="8" strokeLinecap="round" />
            <path d="M -10 25 Q -25 40 -30 25" fill="none" stroke="#374151" strokeWidth="12" strokeLinecap="round" style={{ mixBlendMode: 'destination-over' }} />
            {/* Hand */}
            <circle cx="-30" cy="25" r="5" fill="#ffd8c4" stroke="#374151" strokeWidth="3" />
            {/* Pointer Stick */}
            <line x1="-30" y1="25" x2="-60" y2="-10" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />
            <line x1="-30" y1="25" x2="-60" y2="-10" stroke="#374151" strokeWidth="6" strokeLinecap="round" style={{ mixBlendMode: 'destination-over' }} />
          </g>

          {/* Floating decorative elements inside circle */}
          <path d="M 170 40 L 175 55 L 190 55 L 178 65 L 182 80 L 170 70 L 158 80 L 162 65 L 150 55 L 165 55 Z" fill="#fff3c4" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 20 20 L 23 30 L 33 30 L 25 36 L 28 46 L 20 40 L 12 46 L 15 36 L 7 30 L 17 30 Z" fill="#ffb6c1" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
        </svg>

      </div>

      {/* Badge below illustration */}
      <motion.div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-pastel-pink border-4 border-charcoal px-6 py-2 rounded-full shadow-[4px_4px_0px_rgba(55,65,81,1)] whitespace-nowrap z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
      >
        <span className="font-display font-bold text-charcoal text-sm md:text-base flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6b6b" stroke="#374151" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          For Our Amazing Teachers
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6b6b" stroke="#374151" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </span>
      </motion.div>
    </motion.div>
  );
};
