import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

interface NavigationItem {
  name: string;
  path: string;
  sectionId?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  onNavClick,
}) => {
  const { user, setUser } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu && !menu.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        id="mobile-menu"
        className={`absolute right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-greeting font-bold text-claude-text-light-primary">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={24} className="text-claude-text-light-primary" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigationItems.map((item) =>
              item.sectionId ? (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    onNavClick(e, item.sectionId!);
                    onClose();
                  }}
                  className="block px-6 py-3 text-claude-text-light-primary hover:bg-[#f5efe6] transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className="block px-6 py-3 text-claude-text-light-primary hover:bg-[#f5efe6] transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Auth Section */}
          <div className="border-t p-4">
            {user ? (
              <div className="space-y-3">
                <p className="text-claude-text-light-secondary px-2">
                  Signed in as {user.username}
                </p>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                onClick={onClose}
                className="block w-full px-4 py-2 text-center bg-[#f5efe6] text-claude-text-light-primary rounded-lg hover:bg-[#ebe5dc] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
