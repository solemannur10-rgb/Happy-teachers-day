import React from 'react';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ThemeName = 'default' | 'ocean' | 'sunset';

export const themes = {
  default: {
    '--color-pastel-bg': '#fff0f3',
    '--color-pastel-pink': '#ffb6c1',
    '--color-pastel-peach': '#ffd8c4',
    '--color-pastel-lavender': '#e6c4ff',
    '--color-pastel-yellow': '#fff3c4',
    '--color-pastel-green': '#d4f0d4',
  },
  ocean: {
    '--color-pastel-bg': '#f0f8ff',
    '--color-pastel-pink': '#a8e6cf',
    '--color-pastel-peach': '#dcedc1',
    '--color-pastel-lavender': '#cbe6f8',
    '--color-pastel-yellow': '#ffaaa5',
    '--color-pastel-green': '#ffd3b6',
  },
  sunset: {
    '--color-pastel-bg': '#fff5ec',
    '--color-pastel-pink': '#ffb3ba',
    '--color-pastel-peach': '#ffdfba',
    '--color-pastel-lavender': '#bae1ff',
    '--color-pastel-yellow': '#ffffba',
    '--color-pastel-green': '#baffc9',
  }
};

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-charcoal text-charcoal hover:bg-pastel-pink transition-colors"
      >
        <Palette size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex flex-col gap-2 bg-white p-3 rounded-2xl shadow-xl border-2 border-charcoal"
          >
            {(Object.keys(themes) as ThemeName[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  onThemeChange(t);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-display font-bold capitalize transition-all ${
                  currentTheme === t 
                    ? 'bg-charcoal text-white' 
                    : 'bg-gray-100 text-charcoal hover:bg-pastel-pink'
                }`}
              >
                {t}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
