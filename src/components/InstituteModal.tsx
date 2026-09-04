import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon } from 'lucide-react';

interface InstituteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstituteModal: React.FC<InstituteModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark overlay backdrop click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, y: 50, rotateX: -10 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="relative w-full max-w-4xl bg-[#faf8f5] rounded-3xl border-4 border-charcoal/10 card-shadow flex flex-col max-h-[90vh] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pastel-yellow via-pastel-peach to-pastel-pink px-4 md:px-6 py-4 flex items-center justify-between border-b-2 border-charcoal/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-charcoal/10 shrink-0">
                  <ImageIcon size={20} className="text-charcoal" />
                </div>
                <h4 className="font-display font-bold text-base md:text-lg text-charcoal line-clamp-1">
                  Glomed Institute of Paramedical Science
                </h4>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-charcoal/10 text-charcoal hover:bg-pastel-yellow hover:scale-110 transition-all shrink-0 ml-2"
              >
                <X strokeWidth={3} size={20} />
              </button>
            </div>

            {/* Image Container */}
            <div className="p-4 md:p-8 flex items-center justify-center bg-gray-100 overflow-y-auto">
                <img 
                  src="/institute.jpg" 
                  alt="Glomed Institute of Paramedical Science" 
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl border-4 border-white shadow-xl"
                />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
