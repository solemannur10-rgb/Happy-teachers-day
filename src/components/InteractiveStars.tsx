import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const InteractiveStars: React.FC = () => {
  // Generate random positions for a set of stars
  const stars = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    size: Math.random() * 15 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-pastel-yellow pointer-events-auto cursor-pointer mix-blend-hard-light"
          style={{ top: star.top, left: star.left }}
          initial={{ opacity: 0.4, scale: 0.8 }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
          whileHover={{ 
            scale: 1.5, 
            rotate: 180, 
            opacity: 1, 
            filter: "drop-shadow(0px 0px 8px rgba(255, 243, 196, 0.8))" 
          }}
          whileTap={{ scale: 0.9, rotate: -90 }}
        >
          <Sparkles size={star.size} fill="currentColor" className="opacity-80" />
        </motion.div>
      ))}
    </div>
  );
};
