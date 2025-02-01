import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Project from "../components/Project";
import Greeting from "../components/Greeting";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

// Import images
import profileImage from "../assets/images/profile.jpeg";
import coffeeStyle1 from "../assets/images/coffeestyle1.png";
import coffeeStyle2 from "../assets/images/coffeestyle2.png";
import shopee1 from "../assets/images/shopee1.png";
import shopee2 from "../assets/images/shopee2.png";
import shopee3 from "../assets/images/shopee3.png";

const Home: React.FC = () => {
  const projectImages = {
    coffeeStyle: [coffeeStyle1, coffeeStyle2],
    shopee: [shopee1, shopee2, shopee3],
  };

  return (
    <div className="min-h-screen bg-claude-background-light text-claude-text-primary">
      <Header />
      <main className="pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Greeting />

          {/* Projects Section */}
          <section id="projects" className="py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-greeting font-bold text-center mb-8 sm:mb-12">
                Featured Projects
              </h2>
              <div className="space-y-12 sm:space-y-16">
                <Project
                  title="Clone CoffeeStyle Web"
                  description="A clone of the CoffeeStyle website. This project showcases a fully responsive design with a modern UI."
                  images={projectImages.coffeeStyle}
                  technologies={["React", "Tailwind CSS", "Firebase"]}
                  link="https://clone-coffee-style-web.vercel.app/"
                  sourceCode="https://github.com/tuanhqv123/Clone-CoffeeStyle-Web"
                />
                <Project
                  title="Shopee Clone"
                  description="A clone of the Shopee e-commerce platform with comprehensive product listing and search functionality."
                  images={projectImages.shopee}
                  technologies={[
                    "React",
                    "TypeScript",
                    "Redux",
                    "Node.js",
                    "MongoDB",
                  ]}
                  link="https://shopee-clone-one-delta.vercel.app/"
                  sourceCode="https://github.com/tuanhqv123/ShopeeClone"
                  reverse
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-greeting font-bold text-center mb-8 sm:mb-12">
                About Me
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
                <div className="md:w-1/2 space-y-4">
                  <p className="text-base sm:text-lg font-content text-claude-text-light-secondary text-center">
                    I love creating beautiful and functional web applications
                    that solve real-world problems. With expertise in modern web
                    technologies, I strive to deliver high-quality solutions
                    that exceed expectations.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    <a
                      href="https://github.com/tuanhqv123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#eeebe2] text-claude-text-light-primary hover:bg-[#e5e2d9]
                               rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FiGithub className="w-4 h-4" /> GitHub
                    </a>
                    <a
                      href="www.linkedin.com/in/trần-anh-tuấn-42a2312ab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#eeebe2] text-claude-text-light-primary hover:bg-[#e5e2d9]
                               rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FiLinkedin className="w-4 h-4" /> LinkedIn
                    </a>
                    <a
                      href="https://x.com/tuancon2111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#eeebe2] text-claude-text-light-primary hover:bg-[#e5e2d9]
                               rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <FiTwitter className="w-4 h-4" /> Twitter
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={profileImage}
                    alt="Tuan Tran"
                    className="rounded-2xl shadow-xl w-full max-w-sm mx-auto object-cover aspect-square"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-8 sm:py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-greeting font-bold mb-8 sm:mb-12">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg font-content text-claude-text-light-secondary mb-6 sm:mb-8">
                Interested in working together? Feel free to reach out!
              </p>
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto px-3 sm:px-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg bg-[#eeebe2] text-claude-text-light-primary 
                           placeholder:text-claude-text-light-secondary focus:outline-none 
                           hover:bg-[#e5e2d9] focus:bg-[#e5e2d9]
                           transition-colors text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 sm:py-3 bg-[#eeebe2] text-claude-text-light-primary hover:bg-[#e5e2d9]
                           rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
