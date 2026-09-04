import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Hero } from './components/Hero';
import { CardModal } from './components/CardModal';
import { SpeechModal } from './components/SpeechModal';
import { InstituteModal } from './components/InstituteModal';
import { FloatingParticles } from './components/FloatingParticles';
import { BuntingFlags } from './components/BuntingFlags';
import { ThemeSwitcher, ThemeName, themes } from './components/ThemeSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { InteractiveStars } from './components/InteractiveStars';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isSpeechOpen, setIsSpeechOpen] = useState(false);
  const [isInstituteOpen, setIsInstituteOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | 'none'>('down');
  const [theme, setTheme] = useState<ThemeName>('default');

  // Trigger confetti and sound when card opens
  useEffect(() => {
    if (isCardOpen) {
      // Play confetti pop sound
      const popSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=party-horn-68443.mp3');
      popSound.volume = 0.5;
      popSound.play().catch(() => {});

      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffb6c1', '#ffd8c4', '#e6c4ff', '#fff3c4', '#d4f0d4']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffb6c1', '#ffd8c4', '#e6c4ff', '#fff3c4', '#d4f0d4']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isCardOpen]);

  // Global click sound effect
  useEffect(() => {
    const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_1cd5b0eef1.mp3?filename=click-button-140881.mp3');
    clickSound.volume = 0.2; // Soft subtle click

    const handleGlobalClick = () => {
      // Clone node to allow rapid successive clicks
      const soundClone = clickSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.2;
      soundClone.play().catch(() => {}); // Catch needed for browsers blocking auto-audio without interaction
    };

    window.addEventListener('mousedown', handleGlobalClick);
    return () => {
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, []);

  // Home Screen Auto-scroll Logic
  useEffect(() => {
    if (scrollDirection === 'none' || isCardOpen || isSpeechOpen || isInstituteOpen) return;
    
    let animationFrameId: number;
    const scroll = () => {
       const scrollTop = window.scrollY;
       const scrollHeight = document.documentElement.scrollHeight;
       const clientHeight = document.documentElement.clientHeight;
       
       if (scrollDirection === 'down') {
         if (scrollTop + clientHeight >= scrollHeight - 1) {
            setScrollDirection('up');
            return;
         }
         window.scrollBy(0, 0.5); // Smooth scrolling speed down
       } else if (scrollDirection === 'up') {
         if (scrollTop <= 0) {
            setScrollDirection('none');
            return;
         }
         window.scrollBy(0, -0.5); // Smooth scrolling speed up
       }
       
       animationFrameId = requestAnimationFrame(scroll);
    };
    
    // Initial delay 2.5s for going down, 1s for going up
    const delay = scrollDirection === 'down' && window.scrollY <= 0 ? 2500 : 1000;
    
    const timeoutId = setTimeout(() => {
       animationFrameId = requestAnimationFrame(scroll);
    }, delay);

    const stopScroll = () => setScrollDirection('none');
    window.addEventListener('wheel', stopScroll);
    window.addEventListener('touchstart', stopScroll);
    window.addEventListener('mousedown', stopScroll);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchstart', stopScroll);
      window.removeEventListener('mousedown', stopScroll);
    };
  }, [scrollDirection, isCardOpen, isSpeechOpen, isInstituteOpen]);

  return (
    <div 
      className="relative min-h-screen selection:bg-pastel-pink selection:text-charcoal flex flex-col overflow-x-hidden overflow-y-hidden bg-[var(--color-pastel-bg)] transition-colors duration-1000"
      style={themes[theme] as React.CSSProperties}
    >
      <AudioPlayer />
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <InteractiveStars />

      {/* Animated Attractive Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pastel-pink mix-blend-multiply filter blur-[100px] opacity-60"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-pastel-yellow mix-blend-multiply filter blur-[80px] opacity-50"
          animate={{
            x: [0, -80, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-pastel-peach mix-blend-multiply filter blur-[120px] opacity-40"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-pastel-lavender mix-blend-multiply filter blur-[90px] opacity-40"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Subtle Grid overlay on top of blobs */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 mix-blend-overlay"></div>
      </div>

      {/* Universal Decorative Elements */}
      <BuntingFlags />
      <FloatingParticles />

      {/* Main Page Content */}
      <main className="flex-grow flex items-center justify-center w-full pb-12">
        <Hero 
           onOpenCard={() => setIsCardOpen(true)} 
           onOpenSpeech={() => setIsSpeechOpen(true)}
           onOpenInstitute={() => setIsInstituteOpen(true)}
        />
      </main>

      {/* Modal / Greeting Card */}
      <CardModal 
        isOpen={isCardOpen} 
        onClose={() => setIsCardOpen(false)} 
      />

      {/* Speech Modal */}
      <SpeechModal 
        isOpen={isSpeechOpen} 
        onClose={() => setIsSpeechOpen(false)} 
      />

      {/* Institute Modal */}
      <InstituteModal 
        isOpen={isInstituteOpen} 
        onClose={() => setIsInstituteOpen(false)} 
      />
    </div>
  );
}
