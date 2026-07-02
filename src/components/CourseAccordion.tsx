"use client";

import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CourseAccordionProps {
  syllabus: string[];
}

export default function CourseAccordion({ syllabus }: CourseAccordionProps) {
  const [openWeek, setOpenWeek] = useState<number | null>(0);

  const toggleWeek = (idx: number) => {
    setOpenWeek(openWeek === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {syllabus.map((item, idx) => {
        // We expect the string format: "Week X: Title|Point 1|Point 2..."
        const parts = item.split("|");
        const title = parts[0] || `Week ${idx + 1}: General Topic`;
        const topics = parts.length > 1 ? parts.slice(1) : [item];

        const isOpen = openWeek === idx;

        return (
          <div 
            key={idx} 
            className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-black/40 shadow-sm backdrop-blur-sm transition-all duration-300"
          >
            <button
              onClick={() => toggleWeek(idx)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xl font-medium text-gray-900 dark:text-white">
                {title}
              </span>
              <ChevronDown 
                className={`text-gray-500 dark:text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                size={24} 
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-gray-100 dark:border-white/5"
                >
                  <div className="p-6 space-y-4 bg-gray-50/50 dark:bg-black/20">
                    {topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-4">
                        <Lock className="text-gray-400 dark:text-white/30 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-600 dark:text-white/70 leading-relaxed font-light">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
