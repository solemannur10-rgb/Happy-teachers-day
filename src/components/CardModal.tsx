import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { CardIllustration } from './CardIllustration';
import { TypewriterText } from './TypewriterText';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teachers = [
  { name: "Susmida Nzy", image: "Round Photo_Sep042026_213549.png", initials: "SN", borderColor: "border-pastel-pink", bgColor: "bg-pastel-pink/30", textColor: "text-pastel-pink" },
  { name: "Shahidul Islam", image: "Round Photo_Sep042026_213617.png", initials: "SI", borderColor: "border-pastel-peach", bgColor: "bg-pastel-peach/30", textColor: "text-pastel-peach" },
  { name: "Sangita Sharma", image: "Round Photo_Sep042026_213642.png", initials: "SS", borderColor: "border-pastel-lavender", bgColor: "bg-pastel-lavender/30", textColor: "text-pastel-lavender" },
  { name: "Asif", image: "asif.png", initials: "A", borderColor: "border-pastel-green", bgColor: "bg-pastel-green/30", textColor: "text-emerald-500" },
  { name: "Preeti", image: "preeti.png", initials: "P", borderColor: "border-pastel-yellow", bgColor: "bg-pastel-yellow/50", textColor: "text-yellow-600" },
];

export const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose }) => {
  const [sequenceStep, setSequenceStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTypewriterComplete = useCallback(() => {
    setSequenceStep(1); // Triggers the final lines
  }, []);

  // Modal Auto-scroll Logic
  const [modalScrollDirection, setModalScrollDirection] = useState<'down' | 'up' | 'none'>('down');

  // Reset sequence when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSequenceStep(0);
      setModalScrollDirection('down');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || modalScrollDirection === 'none' || !scrollContainerRef.current) return;
    
    let animationFrameId: number;
    const scroll = () => {
       if (scrollContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
          
          if (modalScrollDirection === 'down') {
              if (scrollTop + clientHeight >= scrollHeight - 1) {
                 setModalScrollDirection('up');
                 return;
              }
              scrollContainerRef.current.scrollTop += 0.5;
          } else if (modalScrollDirection === 'up') {
              if (scrollTop <= 0) {
                 setModalScrollDirection('none');
                 return;
              }
              scrollContainerRef.current.scrollTop -= 0.5;
          }
       }
       animationFrameId = requestAnimationFrame(scroll);
    };
    
    // Delay start: wait a bit longer before going back up
    const delay = modalScrollDirection === 'down' ? 1500 : 2000;
    
    const timeoutId = setTimeout(() => {
       animationFrameId = requestAnimationFrame(scroll);
    }, delay);

    return () => {
       clearTimeout(timeoutId);
       cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, modalScrollDirection, sequenceStep]);

  const fullMessage = `"You do much more than teach us lessons from books.\nYou inspire us, guide us, and help us believe in ourselves.\n\nEvery lesson you teach becomes a part of our journey,\nand every piece of advice helps us move forward.\n\nThank you for your patience, your kindness,\nand for always believing in us.\n\nYou are not just our teachers,\nyou are the people who help shape our future.\n\nHappy Teachers' Day to the wonderful teachers\nwho make learning beautiful and life more meaningful. ❤️"`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dark overlay backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={onClose} 
          />

          {/* Greeting Card Container */}
          <motion.div 
            className="relative w-full max-w-[950px] max-h-full bg-[#fdfbf7] rounded-xl sm:rounded-3xl card-shadow flex flex-col md:flex-row overflow-hidden md:overflow-visible z-10 origin-center"
            initial={{ scale: 0.8, y: 50, rotateX: 15 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 md:-top-4 md:-right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-charcoal text-charcoal hover:bg-pastel-pink hover:scale-110 transition-all z-30"
            >
              <X strokeWidth={3} size={20} />
            </button>

            {/* Left Page: Illustration (Top on mobile) */}
            <div className="w-full h-32 md:h-auto md:w-5/12 shrink-0 bg-pastel-pink p-4 md:p-8 flex items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-charcoal/10">
              {/* Subtle inner shadow for fold effect */}
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent hidden md:block" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/5 to-transparent md:hidden" />
              
              <CardIllustration />

              {/* Little floating sparkles on left page */}
              <motion.div 
                className="absolute top-8 left-8 text-white opacity-60"
                animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={24} />
              </motion.div>
              <motion.div 
                className="absolute bottom-12 right-8 text-white opacity-60"
                animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Sparkles size={20} />
              </motion.div>
            </div>

            {/* Right Page: Content (Bottom on mobile) */}
            <div 
              ref={scrollContainerRef}
              onWheel={() => setModalScrollDirection('none')}
              onTouchStart={() => setModalScrollDirection('none')}
              onMouseDown={() => setModalScrollDirection('none')}
              className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col overflow-y-auto hide-scrollbar max-h-[60vh] md:max-h-none bg-[linear-gradient(to_bottom,transparent_29px,#e5e7eb_30px)] bg-[size:100%_30px]"
            >
              
              {/* Teachers' Images */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-5 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {teachers.map((t, idx) => (
                  <div key={idx} className="flex flex-col items-center group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 ${t.borderColor} shadow-md overflow-hidden bg-white group-hover:scale-110 transition-transform flex items-center justify-center relative`}>
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        className="w-full h-full object-cover object-center scale-[1.02] absolute inset-0 z-10" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.querySelector('.fallback')?.classList.remove('hidden');
                        }}
                      />
                      <div className={`fallback hidden w-full h-full ${t.bgColor} flex items-center justify-center ${t.textColor} font-bold text-xl sm:text-2xl font-display`}>
                        {t.initials}
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-display font-bold mt-2 text-charcoal text-center max-w-[65px] sm:max-w-[80px] leading-tight">
                      {t.name}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Heading */}
              <motion.h2 
                className="font-script text-3xl md:text-5xl text-charcoal font-bold mb-4 flex items-center justify-center gap-3 pt-1 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                To Our Wonderful Teachers ❤️
              </motion.h2>

              {/* Dotted Separator */}
              <motion.div 
                className="w-full shrink-0 h-1 border-t-2 border-dashed border-charcoal/20 mb-6"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />

              {/* Typewriter Message */}
              <div className="flex-grow">
                <TypewriterText 
                  text={fullMessage} 
                  startDelay={1400} 
                  speed={20}
                  onComplete={handleTypewriterComplete} 
                />
              </div>

              {/* Final Emotional Lines */}
              <div className="mt-8 pt-4 flex flex-col gap-4">
                <AnimatePresence>
                  {sequenceStep >= 1 && (
                    <>
                      <motion.p
                        className="font-display font-medium text-lg md:text-xl text-charcoal/90 italic text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        "Thank you for being the guiding light in our journey. ✨"
                      </motion.p>
                      
                      <motion.p
                        className="font-script text-2xl md:text-3xl text-charcoal font-bold text-center mt-2 pb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        With Respect, Love and Gratitude ❤️
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
