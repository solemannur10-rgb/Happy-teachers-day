import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, MessageSquareHeart, Send, Users, MousePointer2, X } from 'lucide-react';
import { TeacherIllustration } from './TeacherIllustration';

interface HeroProps {
  onOpenCard: () => void;
  onOpenSpeech: () => void;
  onOpenInstitute: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCard, onOpenSpeech, onOpenInstitute }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<{name: string, comment: string}[]>([]);
  const [hasChattedTwice, setHasChattedTwice] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    // Visitor Counter Logic
    let count = parseInt(localStorage.getItem('site_visitor_count') || '15', 10);
    const hasVisited = localStorage.getItem('has_visited_before');
    
    if (!hasVisited) {
        count += 1;
        localStorage.setItem('site_visitor_count', count.toString());
        localStorage.setItem('has_visited_before', 'true');
    }
    setVisitorCount(count);

    // Chat Logic
    const saved = localStorage.getItem('site_chats');
    if (saved) {
        try {
            setFeedbacks(JSON.parse(saved));
        } catch (e) {}
    }

    const chatCount = parseInt(localStorage.getItem('user_chat_count') || '0', 10);
    if (chatCount >= 2) {
        setHasChattedTwice(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !comment.trim() || hasChattedTwice) return;
      
      const newFeedback = { name, comment };
      const updatedFeedbacks = [newFeedback, ...feedbacks];
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem('site_chats', JSON.stringify(updatedFeedbacks));
      
      let chatCount = parseInt(localStorage.getItem('user_chat_count') || '0', 10);
      chatCount += 1;
      localStorage.setItem('user_chat_count', chatCount.toString());
      
      if (chatCount >= 2) {
          setHasChattedTwice(true);
      }
      
      setName('');
      setComment('');
  };

  const FloatingPointer = ({ delay = 0, className = "" }) => (
    <motion.div 
      className={`absolute z-30 pointer-events-none drop-shadow-md ${className}`}
      animate={{ 
        x: [0, -10, 0], 
        y: [0, -10, 0],
        scale: [1, 0.9, 1]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5, 
        delay: delay,
        ease: "easeInOut"
      }}
    >
      <MousePointer2 className="fill-white text-charcoal" size={28} strokeWidth={2} />
    </motion.div>
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between min-h-[85vh] z-10 gap-12 md:gap-8">
      
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0">
        
        {/* Main Heading Sequence */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative mb-6"
        >
          {/* "Happy" */}
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white text-stroke-charcoal drop-shadow-[4px_4px_0_rgba(55,65,81,0.2)] mb-2 md:mb-0">
            Happy
          </h1>
          {/* "Teachers' Day" */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-pastel-pink text-stroke-charcoal drop-shadow-[4px_4px_0_rgba(55,65,81,0.2)]">
            Teachers' Day
          </h1>
          
          <motion.div 
            className="absolute -top-6 -right-6 md:-top-4 md:-right-12 text-pastel-yellow"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={48} className="fill-current text-stroke-sm" strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Date Badge (Now a clickable button for Speech) */}
        <motion.div 
            className="relative mb-10"
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
            <motion.button
            onClick={onOpenSpeech}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-pastel-pink border-3 border-charcoal px-6 py-2 rounded-full shadow-[4px_4px_0px_rgba(55,65,81,1)] hover:bg-white transition-colors cursor-pointer group relative"
            >
            <Star size={16} className="fill-pastel-yellow text-charcoal group-hover:fill-pastel-pink transition-colors" strokeWidth={2.5} />
            <span className="font-display font-bold text-lg md:text-xl text-charcoal">
                5 September
            </span>
            <Star size={16} className="fill-pastel-yellow text-charcoal group-hover:fill-pastel-pink transition-colors" strokeWidth={2.5} />
            </motion.button>
            <FloatingPointer delay={0} className="-bottom-5 -right-5" />
        </motion.div>

        {/* CTA Button */}
        <motion.div 
            className="relative"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        >
            <motion.button
            onClick={onOpenCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ 
                scale: 1.05, 
                y: -6,
                boxShadow: "0 15px 30px -5px rgba(255, 182, 193, 0.8), 6px 10px 0px rgba(55,65,81,1)" 
            }}
            whileTap={{ 
                scale: 0.95,
                y: 4,
                boxShadow: "0px 0px 0px rgba(55,65,81,1)" 
            }}
            className="relative overflow-hidden bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-peach border-4 border-charcoal px-10 py-5 rounded-[2rem] shadow-[6px_8px_0px_rgba(55,65,81,1)] transition-all flex items-center justify-center gap-3 group"
            >
            {/* Animated subtle shine sweeping across */}
            <motion.div 
                className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                animate={{ x: ["-100%", "400%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }}
            />

            <span className="font-display font-black text-2xl md:text-3xl text-charcoal tracking-wide z-10 drop-shadow-sm uppercase">
                Click Here
            </span>
            <motion.span 
                className="inline-block origin-center z-10 text-2xl md:text-3xl"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                ✨
            </motion.span>
            </motion.button>
            <FloatingPointer delay={0.5} className="-bottom-4 -right-4" />
        </motion.div>
        
      </div>

      {/* Right Content Area (Illustration & Credits) */}
      <div className="flex-1 flex flex-col justify-center md:justify-end items-center pb-12 md:pb-0 relative pt-12 md:pt-0">
        <TeacherIllustration />
        
        {/* New Text Block: Institute and Name */}
        <motion.div 
            className="flex flex-col items-center mt-12 md:mt-16 text-center z-10 w-full relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
        >
            <motion.div 
                className="relative"
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
            >
                <button 
                    onClick={() => {
                    import('canvas-confetti').then((confetti) => {
                        confetti.default({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#ffb6c1', '#ffd8c4', '#e6c4ff', '#fff3c4', '#d4f0d4']
                        });
                    });
                    onOpenInstitute();
                    }}
                    className="font-display font-bold text-[0.95rem] sm:text-lg md:text-xl text-charcoal bg-white/70 px-5 py-3 rounded-2xl shadow-[3px_3px_0px_rgba(55,65,81,1)] border-2 border-charcoal uppercase tracking-wider backdrop-blur-sm hover:bg-pastel-pink hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none"
                >
                    Golmed Institute of Paramedical Science
                </button>
                <FloatingPointer delay={1} className="-bottom-6 -right-2" />
            </motion.div>

            {/* 1 inch gap is roughly 96px, using mt-24 for exact spacing */}
            <p className="font-body text-xs sm:text-sm text-charcoal mt-24 font-semibold italic opacity-75 flex items-center justify-center gap-1.5">
                made by nur Soleman <span className="text-base sm:text-lg not-italic">🇮🇳</span>
            </p>

            {/* Chat & Visitor Count Container */}
            <div className="mt-6 flex flex-col items-center gap-4">
                <button 
                    onClick={() => setIsFeedbackOpen(true)}
                    className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border-2 border-charcoal shadow-[3px_3px_0px_rgba(55,65,81,1)] hover:bg-pastel-pink transition-colors font-display font-bold text-sm"
                >
                    <MessageSquareHeart size={18} className="text-charcoal" />
                    Chat 💬
                </button>
                
                {/* Visitor Counter */}
                <div className="flex items-center gap-2 bg-pastel-yellow/50 px-4 py-1.5 rounded-full border border-charcoal/20">
                    <Users size={14} className="text-charcoal/70" />
                    <span className="font-display text-sm font-bold text-charcoal/80">{visitorCount} Students Visited</span>
                </div>
            </div>
        </motion.div>

        {/* Fullscreen Chat Modal */}
        <AnimatePresence>
            {isFeedbackOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm perspective-1000"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Dark overlay backdrop click */}
                    <div className="absolute inset-0" onClick={() => setIsFeedbackOpen(false)} />

                    <motion.div 
                        initial={{ scale: 0.9, y: 50, rotateX: -10 }}
                        animate={{ scale: 1, y: 0, rotateX: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        className="relative w-full max-w-lg bg-[#faf8f5] rounded-3xl border-4 border-charcoal/10 card-shadow flex flex-col max-h-[90vh] overflow-hidden z-10"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pastel-pink to-pastel-peach px-6 py-4 flex items-center justify-between border-b-2 border-charcoal/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-charcoal/10">
                                    <MessageSquareHeart size={20} className="text-charcoal" />
                                </div>
                                <h4 className="font-display font-bold text-xl text-charcoal">Student Chat</h4>
                            </div>
                            <button 
                                onClick={() => setIsFeedbackOpen(false)} 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-charcoal/10 text-charcoal hover:bg-pastel-yellow hover:scale-110 transition-all"
                            >
                                <X strokeWidth={3} size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex-grow bg-[linear-gradient(to_bottom,transparent_19px,#e5e7eb_20px)] bg-[size:100%_20px]">
                            {!hasChattedTwice ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-5 rounded-2xl border-2 border-charcoal/10 shadow-sm mb-6 relative z-10">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="font-body px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-charcoal outline-none transition-colors bg-gray-50 text-base"
                                    />
                                    <textarea 
                                        placeholder="Write a sweet message..." 
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="font-body px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-charcoal outline-none transition-colors bg-gray-50 resize-none h-24 text-base"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!name.trim() || !comment.trim()}
                                        className="bg-charcoal text-white font-display font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-pastel-pink hover:text-charcoal border-2 border-charcoal disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-1"
                                    >
                                        <Send size={18} /> Send Message
                                    </button>
                                    <p className="text-xs text-charcoal/50 text-center uppercase tracking-wider font-bold">Limited to 2 messages per student</p>
                                </form>
                            ) : (
                                <div className="bg-pastel-yellow p-6 rounded-2xl text-center border-2 border-charcoal shadow-sm mb-6 relative z-10">
                                    <p className="font-display text-lg font-bold text-charcoal mb-1">Thanks for chatting! 🎈</p>
                                    <p className="font-body text-sm text-charcoal/80">You have reached the limit of 2 messages. Your thoughts have been added below!</p>
                                </div>
                            )}

                            {/* Display existing chats */}
                            {feedbacks.length > 0 ? (
                                <div className="flex flex-col gap-4 relative z-10">
                                    <h5 className="font-display font-bold text-sm text-charcoal/60 uppercase tracking-wider mb-1">Recent Messages</h5>
                                    {feedbacks.map((fb, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-charcoal/10 shadow-sm relative group hover:border-pastel-pink transition-colors">
                                            <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-pastel-lavender flex items-center justify-center border-2 border-charcoal font-display font-bold text-xs">
                                                {fb.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-display font-bold text-base text-charcoal block mb-1 ml-5">{fb.name}</span>
                                            <p className="font-body text-charcoal/80 leading-relaxed ml-5">{fb.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 relative z-10">
                                    <MessageSquareHeart size={48} className="mx-auto text-charcoal/20 mb-3" />
                                    <p className="font-display font-bold text-charcoal/40">No messages yet. Be the first to say something!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

    </div>
  );
};
