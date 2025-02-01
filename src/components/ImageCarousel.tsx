import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

interface ImageCarouselProps {
  items: MediaItem[];
  onMediaClick: (index: number, e: React.MouseEvent) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items,
  onMediaClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  if (!items.length) return null;

  return (
    <div className="relative w-full group">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {items[currentIndex].type === "video" ? (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={(e) => onMediaClick(currentIndex, e)}
          >
            <img
              src={items[currentIndex].thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-12 h-12 sm:w-16 sm:h-16 bg-black/50 rounded-full flex items-center justify-center
                       hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onMediaClick(currentIndex, e);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                className="sm:w-6 sm:h-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ) : (
          <img
            src={items[currentIndex].url}
            alt="Media content"
            className="w-full h-full object-cover cursor-pointer"
            onClick={(e) => onMediaClick(currentIndex, e)}
          />
        )}
      </div>

      {items.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 
                     bg-black/50 p-1 sm:p-2 rounded-full hover:bg-black/70 transition-all z-10
                     opacity-0 group-hover:opacity-100 sm:opacity-100"
            onClick={handlePrevious}
          >
            <FiChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     bg-black/50 p-1 sm:p-2 rounded-full hover:bg-black/70 transition-all z-10
                     opacity-0 group-hover:opacity-100 sm:opacity-100"
            onClick={handleNext}
          >
            <FiChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
