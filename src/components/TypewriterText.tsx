import React, { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  onComplete: () => void;
  speed?: number;
  startDelay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  onComplete, 
  speed = 30,
  startDelay = 500
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    let currentIndex = 0;
    
    // Quick typing interval
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;

      // Keep scroll at bottom if it's long text on small screens
      if (containerRef.current) {
         // containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }

      if (currentIndex >= text.length) {
        clearInterval(intervalId);
        // Add a tiny delay before calling onComplete so the last word registers
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete, isStarted]);

  return (
    <div ref={containerRef} className="font-body text-charcoal text-base md:text-lg leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {/* Blinking cursor effect */}
      <span className="inline-block w-1.5 h-5 ml-1 bg-charcoal animate-pulse align-middle opacity-60" />
    </div>
  );
};
