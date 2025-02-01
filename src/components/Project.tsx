import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ImageModal from "./ImageModal";

interface ProjectProps {
  title: string;
  description: string;
  link: string;
  sourceCode: string;
  technologies: string[];
  images: string[];
  reverse?: boolean;
}

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  link,
  sourceCode,
  technologies,
  images,
  reverse = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-[#ffff] rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl p-8"
    >
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } gap-16`}
      >
        {/* Project Images */}
        <div className="md:w-3/5 relative group">
          <div
            className="relative aspect-video overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 20, scale: 0.98 }} // Nhẹ nhàng xuất hiện từ phải, hơi nhỏ hơn
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }} // Nhẹ nhàng biến mất về bên trái, thu nhỏ lại
              transition={{
                type: "tween",
                ease: [0.25, 1, 0.5, 1],
                duration: 1,
              }}
            />
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                  }}
                  className="p-2 bg-black/50 text-white rounded-full ml-2 hover:bg-black/70 transition-colors"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="p-2 bg-black/50 text-white rounded-full mr-2 hover:bg-black/70 transition-colors"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-greeting font-bold text-claude-text-light-primary dark:text-claude-text-dark-primary mb-4">
              {title}
            </h3>
            <p className="text-xl font-content text-claude-text-light-secondary dark:text-claude-text-dark-secondary mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#eeebe2] text-claude-text-light-primary
                         rounded-full text-sm font-medium transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <FiExternalLink /> Live Demo
            </a>
            <a
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <FiGithub /> Source Code
            </a>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        onNext={() =>
          setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }
        onPrev={() =>
          setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
          )
        }
      />
    </motion.div>
  );
};

export default Project;
