import React, { useState, useRef, useEffect } from 'react';
import { Music, Music3 } from 'lucide-react';
import { motion } from 'motion/react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Upbeat, inspiring acoustic instrumental for Teachers Day
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=inspiring-acoustic-guitar-114460.mp3";

  useEffect(() => {
    // Attempt auto-play on mount (will likely be blocked by browser until interaction,
    // which is why we have the toggle button)
    if (audioRef.current) {
        audioRef.current.volume = 0.4; // Soft volume
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Auto-play was prevented.
                setIsPlaying(false);
            });
        }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <audio ref={audioRef} src={audioUrl} loop />
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-charcoal transition-colors ${
          isPlaying ? 'bg-pastel-pink text-charcoal' : 'bg-white text-gray-400'
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music size={20} className="text-charcoal" />
          </motion.div>
        ) : (
          <Music3 size={20} />
        )}
      </motion.button>
    </div>
  );
};
