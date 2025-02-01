import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { fetchApi, AUTH_ENDPOINTS } from "../config/api";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await fetchApi(AUTH_ENDPOINTS.SIGNOUT, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      window.location.href = "/signin";
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navigationItems = [
    { name: "Projects", path: "/#projects", sectionId: "projects" },
    { name: "Info", path: "/#about", sectionId: "about" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <header className="fixed w-full bg-white/80 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-greeting font-bold text-claude-text-light-primary"
              >
                Portfolio
              </Link>
            </div>

            {/* Navigation and Auth */}
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-6">
                {navigationItems.map((item) =>
                  item.sectionId ? (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className="text-claude-text-light-primary hover:text-claude-text-light-secondary px-3 py-2 
                               text-base font-content transition-colors cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-claude-text-light-primary hover:text-claude-text-light-secondary px-3 py-2 
                               text-base font-content transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                )}
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-claude-text-light-primary font-content">
                      {user.username}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="text-claude-text-light-primary hover:text-claude-text-light-secondary"
                    >
                      <FiLogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="flex items-center gap-2 text-claude-text-light-primary hover:text-claude-text-light-secondary px-3 py-2 
                             text-base font-content transition-colors"
                  >
                    <FiUser size={20} />
                    Sign in
                  </Link>
                )}
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiMenu size={24} className="text-claude-text-light-primary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        onNavClick={handleNavClick}
      />
    </>
  );
};

export default Header;
