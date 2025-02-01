// src/components/Footer.tsx
import React from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/tuanhqv123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-claude-text-light-primary hover:text-claude-text-light-secondary 
                       transition-all duration-200 hover:-translate-y-0.5 transform"
            >
              <FiGithub size={22} />
            </a>
            <a
              href="www.linkedin.com/in/trần-anh-tuấn-42a2312ab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-claude-text-light-primary hover:text-claude-text-light-secondary 
                       transition-all duration-200 hover:-translate-y-0.5 transform"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href="https://x.com/tuancon2111"
              target="_blank"
              rel="noopener noreferrer"
              className="text-claude-text-light-primary hover:text-claude-text-light-secondary 
                       transition-all duration-200 hover:-translate-y-0.5 transform"
            >
              <FiTwitter size={22} />
            </a>
          </div>
          <p className="text-center text-claude-text-light-secondary font-content">
            © 2024 Tuan Tran. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
