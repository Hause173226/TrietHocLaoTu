import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface ConceptPopupProps {
  concept: string;
  explanation: string;
  children: React.ReactNode;
}

const ConceptPopup: React.FC<ConceptPopupProps> = ({ concept, explanation, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
      >
        {children}
        <Info className="w-4 h-4 ml-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {concept}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {explanation}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConceptPopup;