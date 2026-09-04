import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';

type ParticleType = 'heart' | 'star' | 'sparkle' | 'circle';

interface Particle {
  id: number;
  type: ParticleType;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
}

const colors = ['#ffb6c1', '#ffd8c4', '#e6c4ff', '#fff3c4', '#d4f0d4', '#ff99a8'];

export const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client side to avoid hydration mismatches
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 25;
      
      for (let i = 0; i < count; i++) {
        const types: ParticleType[] = ['heart', 'star', 'sparkle', 'circle'];
        newParticles.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          x: Math.random() * 100, // percentage
          y: 110 + Math.random() * 20, // start slightly below screen
          size: 12 + Math.random() * 24, // 12px to 36px
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: 15 + Math.random() * 20, // 15 to 35 seconds to reach top
          delay: Math.random() * -20, // Negative delay so some start already on screen
          drift: (Math.random() - 0.5) * 40, // Horizontal drift amount
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            className="absolute"
            initial={{ 
              x: `${p.x}vw`, 
              y: `${p.y}vh`, 
              opacity: 0,
              rotate: 0 
            }}
            animate={{
              x: [`${p.x}vw`, `${p.x + p.drift / 2}vw`, `${p.x + p.drift}vw`],
              y: ['110vh', '-10vh'],
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, p.drift > 0 ? 180 : -180, p.drift > 0 ? 360 : -360]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {p.type === 'heart' && (
              <Heart 
                size={p.size} 
                fill={p.color} 
                color="#374151" 
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
              />
            )}
            {p.type === 'star' && (
              <Star 
                size={p.size} 
                fill={p.color} 
                color="#374151" 
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
              />
            )}
            {p.type === 'sparkle' && (
              <Sparkles 
                size={p.size} 
                fill={p.color} 
                color="#374151" 
                strokeWidth={1.5}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
              />
            )}
            {p.type === 'circle' && (
              <div 
                style={{ 
                  width: p.size * 0.6, 
                  height: p.size * 0.6, 
                  backgroundColor: p.color,
                  border: '2px solid #374151',
                  borderRadius: '50%',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                }} 
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
