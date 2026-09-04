import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface SpeechModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const speechBlocks = [
    { type: 'p', text: "শ্ৰদ্ধেয় অধ্যক্ষ মহোদয়/মহোদয়া, সন্মানীয় শিক্ষক-শিক্ষয়িত্ৰীসকল আৰু মোৰ মৰমৰ বন্ধু-বান্ধৱীসকল—সকলোকে মোৰ আন্তৰিক শুভেচ্ছা জনাইছোঁ।" },
    { type: 'p', text: "আজি আমি সকলোৱে এক বিশেষ আৰু অতি মৰ্যাদাপূৰ্ণ দিন উদযাপন কৰিবলৈ ইয়াত একত্ৰিত হৈছোঁ। আজি ৫ ছেপ্টেম্বৰ, অৰ্থাৎ শিক্ষক দিৱস। এই বিশেষ দিনটোত মই মোৰ সকলো শিক্ষক-শিক্ষয়িত্ৰীক আন্তৰিক শ্ৰদ্ধা আৰু কৃতজ্ঞতা জ্ঞাপন কৰিছোঁ।" },
    { type: 'p', text: "বন্ধুসকল, আমাৰ জীৱনত শিক্ষকসকলৰ স্থান অতি উচ্চ। শিক্ষক কেৱল আমাক কিতাপৰ পৰা পঢ়াবলৈ অহা এজন ব্যক্তি নহয়। শিক্ষক হৈছে আমাৰ পথপ্ৰদৰ্শক, বন্ধু, উপদেষ্টা আৰু জীৱন গঢ়াৰ কাৰিগৰ।" },
    { type: 'p', text: "আমি সৰু অৱস্থাত বহুত কথা নাজানো। কি ভাল, কি বেয়া, কেনেকৈ সঠিক পথত আগবাঢ়িব লাগে—এই সকলো কথা শিকোৱাত শিক্ষকসকলৰ এক অতি গুৰুত্বপূৰ্ণ ভূমিকা আছে। এজন শিক্ষকেই আমাৰ ভিতৰত লুকাই থকা প্ৰতিভা চিনাক্ত কৰে আৰু সেই প্ৰতিভাক আগবঢ়াই নিবলৈ উৎসাহ দিয়ে।" },
    { type: 'quote', text: "“এজন ভাল শিক্ষক এখন পুথিৰ দৰে নহয়, তেওঁ এখন পুথিৰ ভিতৰত থকা জ্ঞানক জীৱনৰ পথত ব্যৱহাৰ কৰিবলৈ শিকায়।”", color: "pastel-pink" },
    { type: 'p', text: "শিক্ষকসকলে আমাক কেৱল পৰীক্ষাত ভাল নম্বৰ পাবলৈ শিকোৱা নাই; তেওঁলোকে আমাক ভাল মানুহ হ’বলৈও শিকায়। সত্য কথা কোৱা, সময়ৰ মূল্য বুজা, শৃংখলা মানি চলা, ডাঙৰসকলক সন্মান কৰা আৰু সৰুসকলক মৰম কৰা—এই মূল্যবোধবোৰ আমি শিক্ষকসকলৰ পৰাই শিকোঁ।" },
    { type: 'p', text: "আজি শিক্ষক দিৱস উদযাপন কৰাৰ এটা বিশেষ কাৰণ আছে। ভাৰতৰ মহান দাৰ্শনিক, শিক্ষক আৰু দেশৰ দ্বিতীয় ৰাষ্ট্ৰপতি ড° সৰ্বপল্লী ৰাধাকৃষ্ণনৰ জন্মদিন উপলক্ষে প্ৰতি বছৰে ৫ ছেপ্টেম্বৰত শিক্ষক দিৱস পালন কৰা হয়। তেওঁ বিশ্বাস কৰিছিল যে শিক্ষকসকল সমাজ গঢ়াৰ অন্যতম শক্তিশালী ব্যক্তি।" },
    { type: 'p', text: "তেওঁৰ জীৱনৰ পৰা আমি এটা ডাঙৰ শিক্ষা পাওঁ—শিক্ষা কেৱল জ্ঞান লাভ কৰা নহয়, শিক্ষা হৈছে এজন ভাল আৰু দায়িত্বশীল মানুহ হিচাপে নিজকে গঢ়ি তোলা।" },
    { type: 'p', text: "মোৰ প্ৰিয় শিক্ষক-শিক্ষয়িত্ৰীসকল, আপোনালোকে আমাৰ বাবে প্ৰতিদিনে বহুত কষ্ট কৰে। কেতিয়াবা আমি দুষ্টামি কৰোঁ, কথা নুশুনো, ঘৰুৱা কাম নকৰোঁ, আনকি কেতিয়াবা আপোনালোকৰ কথা শুনিও নুশুনাৰ দৰে কৰোঁ। কিন্তু তাৰ পিছতো আপোনালোকে আমাক বুজাই দিয়ে, ভুল শুধৰাই দিয়ে আৰু ভাল পথত আগবঢ়াই নিয়ে।" },
    { type: 'p', text: "হয়তো আমি সকলো সময়ত আপোনালোকৰ কষ্টৰ মূল্য বুজি নাপাওঁ। কিন্তু আজি এই বিশেষ দিনটোত আমি আপোনালোকক ক’ব বিচাৰোঁ—" },
    { type: 'quote', text: "“আমাৰ জীৱন গঢ়িবলৈ আপোনালোকে কৰা প্ৰতিটো কষ্টৰ বাবে আমি আপোনালোকৰ ওচৰত চিৰকৃতজ্ঞ।”", color: "pastel-yellow" },
    { type: 'p', text: "শিক্ষকসকল হৈছে সেই মানুহ, যিসকলে নিজৰ জ্ঞান আনক বিলাই দিয়ে আৰু আনৰ সফলতাত আনন্দ অনুভৱ কৰে। এজন শিক্ষক হয়তো তেওঁৰ সকলো শিক্ষাৰ্থীক জীৱনত ডাঙৰ মানুহ হোৱা দেখা নাপায়, কিন্তু যেতিয়া তেওঁৰ কোনো শিক্ষাৰ্থী সফল হয়, তেতিয়া সেই সফলতাৰ পিছফালে শিক্ষকজনৰ অৱদান নিশ্চয় থাকে।" },
    { type: 'p', text: "বন্ধুসকল, আমি সকলোৱে জীৱনত সফল হ’ব বিচাৰোঁ। কোনোবাই ডাক্টৰ হ’ব বিচাৰে, কোনোবাই ইঞ্জিনিয়াৰ, কোনোবাই আৰক্ষী বিষয়া, কোনোবাই শিক্ষক, কোনোবাই ব্যৱসায়ী হ’ব বিচাৰে। কিন্তু আমি যি পথেই বাছি লওঁ, সেই পথত আগবাঢ়িবলৈ শিক্ষা আৰু শিক্ষকৰ প্ৰয়োজন।" },
    { type: 'p', text: "শিক্ষকসকলে আমাৰ হাতত কেৱল কলম আৰু কিতাপ নিদিয়ে; তেওঁলোকে আমাৰ হাতত এটা উজ্জ্বল ভৱিষ্যৎ গঢ়াৰ শক্তি দিয়ে।" },
    { type: 'p', text: "এজন শিক্ষকে এটা মমবাতিৰ দৰে নিজৰ জ্ঞানৰ পোহৰ আনৰ জীৱনত বিলাই দিয়ে। তেওঁলোকে শিক্ষাৰ্থীৰ ভিতৰত জ্ঞানৰ পোহৰ জ্বলাই দিয়ে। অন্ধকাৰৰ মাজত পথ হেৰাই গ’লে যেনেকৈ পোহৰে আমাক সঠিক পথ দেখুৱায়, ঠিক তেনেকৈ শিক্ষকসকলে আমাৰ জীৱনৰ সঠিক পথ দেখুৱায়।" },
    { type: 'p', text: "আজি আমি শিক্ষকসকলক সন্মান জনোৱাৰ দিন। কিন্তু মোৰ মতে, শিক্ষকক কেৱল বছৰত এদিন সন্মান জনালেই যথেষ্ট নহয়। আমি প্ৰতিদিনে শিক্ষকসকলক সন্মান কৰিব লাগে। তেওঁলোকৰ কথা মনোযোগেৰে শুনিব লাগে, সময়মতে পঢ়া-শুনা কৰিব লাগে আৰু এজন ভাল শিক্ষাৰ্থী হ’বলৈ চেষ্টা কৰিব লাগে।" },
    { type: 'p', text: "কাৰণ এজন শিক্ষকৰ বাবে তেওঁৰ শিক্ষাৰ্থীৰ সফলতাই হৈছে আটাইতকৈ ডাঙৰ উপহাৰ।" },
    { type: 'p', text: "মোৰ মৰমৰ বন্ধু-বান্ধৱীসকল, আহক আমি আজি এই বিশেষ দিনটোত এটা প্ৰতিজ্ঞা কৰোঁ—আমি মনোযোগেৰে পঢ়িম, শৃংখলাবদ্ধ হ’ম, আমাৰ শিক্ষকসকলক সদায় সন্মান কৰিম আৰু তেওঁলোকৰ শিক্ষা আমাৰ জীৱনত প্ৰয়োগ কৰিম।" },
    { type: 'p', text: "আমি ভুল কৰিম, কিন্তু ভুলৰ পৰা শিকিম। আমি কেতিয়াবা ব্যৰ্থ হ’ম, কিন্তু হাৰ নামানিম। কাৰণ আমাৰ শিক্ষকসকলে আমাক শিকাইছে যে সফলতা লাভ কৰিবলৈ চেষ্টা আৰু পৰিশ্ৰম কেতিয়াও বন্ধ কৰিব নালাগে।" },
    { type: 'p', text: "শেষত, মোৰ সকলো সন্মানীয় শিক্ষক-শিক্ষয়িত্ৰীক হৃদয়ৰ গভীৰতাৰ পৰা ধন্যবাদ জনাইছোঁ। আপোনালোকে আমাৰ জীৱনত যি পোহৰ দিছে, সেই পোহৰ আমি কেতিয়াও পাহৰিব নোৱাৰোঁ।" },
    { type: 'p', text: "আপোনালোক আমাৰ বাবে কেৱল শিক্ষক নহয়; আপোনালোক আমাৰ পথপ্ৰদৰ্শক, আমাৰ প্ৰেৰণা আৰু আমাৰ জীৱন গঢ়াৰ অন্যতম শক্তি।" },
    { type: 'p', text: "আপোনালোকৰ মৰম, যত্ন, ধৈৰ্য্য আৰু মূল্যৱান শিক্ষাৰ বাবে আমি সদায় কৃতজ্ঞ হৈ থাকিম।" },
    { type: 'p', text: "আহক, আমি সকলোৱে একেলগে আমাৰ প্ৰিয় শিক্ষক-শিক্ষয়িত্ৰীসকলক কওঁ—" },
    { type: 'quote', text: "“আপোনালোকক শিক্ষক দিৱসৰ আন্তৰিক শুভেচ্ছা আৰু ধন্যবাদ!”", color: "pastel-lavender" },
    { type: 'end', text: "ধন্যবাদ।\nজয় অসম" }
];

export const SpeechModal: React.FC<SpeechModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [modalScrollDirection, setModalScrollDirection] = useState<'down' | 'up' | 'none'>('down');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
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
    
    const delay = modalScrollDirection === 'down' ? 1500 : 2000;
    const timeoutId = setTimeout(() => {
       animationFrameId = requestAnimationFrame(scroll);
    }, delay);

    return () => {
       clearTimeout(timeoutId);
       cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, modalScrollDirection]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div 
            className="relative w-full max-w-3xl max-h-full bg-[#faf8f5] rounded-xl sm:rounded-3xl card-shadow flex flex-col overflow-hidden z-10 origin-bottom border-4 border-charcoal/10"
            initial={{ scale: 0.9, y: 100, rotateX: -10 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          >
            <div className="bg-pastel-peach/40 border-b-2 border-charcoal/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-pastel-peach">
                        <Mic size={20} className="text-charcoal" />
                    </div>
                    <span className="font-display font-bold text-lg text-charcoal">Teacher's Day Speech</span>
                </div>
                
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-charcoal text-charcoal hover:bg-pastel-pink hover:scale-110 transition-all"
                >
                  <X strokeWidth={3} size={20} />
                </button>
            </div>

            <div 
              ref={scrollContainerRef}
              onWheel={() => setModalScrollDirection('none')}
              onTouchStart={() => setModalScrollDirection('none')}
              onMouseDown={() => setModalScrollDirection('none')}
              className="w-full p-6 sm:p-8 md:p-12 overflow-y-auto hide-scrollbar flex-grow bg-[linear-gradient(to_bottom,transparent_29px,#e5e7eb_30px)] bg-[size:100%_30px] relative"
            >
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-charcoal drop-shadow-sm pt-2">শিক্ষক দিৱস উপলক্ষে ভাষণ</h3>
                
                <div className="font-body text-charcoal text-base md:text-lg leading-[30px] space-y-5 px-2 md:px-6">
                    {speechBlocks.map((block, index) => {
                       if (index > currentStep) return null;
                       
                       const isCurrent = index === currentStep;
                       
                       if (block.type === 'quote') {
                          return (
                            <div key={index} className={`my-8 py-6 px-4 md:px-8 bg-${block.color}/20 rounded-2xl border-l-4 border-${block.color}`}>
                                {isCurrent ? (
                                    <div className="font-display font-bold text-charcoal text-center text-lg md:text-xl italic leading-relaxed">
                                        <TypewriterText 
                                           text={block.text} 
                                           speed={20} 
                                           startDelay={200}
                                           onComplete={() => setCurrentStep(s => s + 1)} 
                                        />
                                    </div>
                                ) : (
                                    <p className="font-display font-bold text-charcoal text-center text-lg md:text-xl italic leading-relaxed">
                                        {block.text}
                                    </p>
                                )}
                            </div>
                          );
                       }
                       
                       if (block.type === 'end') {
                          return (
                            <div key={index} className="text-right mt-12 mb-4">
                                {isCurrent ? (
                                    <div className="font-bold font-display text-xl whitespace-pre-wrap">
                                        <TypewriterText 
                                           text={block.text} 
                                           speed={30} 
                                           startDelay={200}
                                           onComplete={() => setCurrentStep(s => s + 1)} 
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <p className="font-bold font-display text-xl">ধন্যবাদ।</p>
                                        <p className="font-bold font-display text-xl text-pastel-pink mt-1">জয় অসম</p>
                                    </>
                                )}
                            </div>
                          );
                       }

                       // Default paragraph
                       return (
                         <div key={index}>
                            {isCurrent ? (
                                <TypewriterText 
                                    text={block.text} 
                                    speed={10} 
                                    startDelay={100}
                                    onComplete={() => setCurrentStep(s => s + 1)} 
                                />
                            ) : (
                                <p>{block.text}</p>
                            )}
                         </div>
                       );
                    })}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
