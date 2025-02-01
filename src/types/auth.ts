export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null, remember?: boolean) => void;
  isAuthenticated: boolean;
}
