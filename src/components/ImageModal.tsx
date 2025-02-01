import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <button
          className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors backdrop-blur-sm bg-black/20 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <FiChevronLeft size={32} />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
          className="relative max-w-[90vw] max-h-[90vh]"
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/path/to/placeholder-image.jpg";
            }}
            style={{ fontFamily: "__styreneB_5d855b" }}
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors backdrop-blur-sm bg-black/20 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <FiChevronRight size={32} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                // You can add functionality to jump to a specific image here
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
