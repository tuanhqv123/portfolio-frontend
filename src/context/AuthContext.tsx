import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null, remember?: boolean) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (newUser: User | null, remember: boolean = false) => {
    setUserState(newUser);
    if (newUser && remember) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else if (newUser) {
      sessionStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  // Kiểm tra user từ localStorage/sessionStorage khi component mount
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
