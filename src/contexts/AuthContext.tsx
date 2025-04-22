
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("bicaraUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    // Mock login for now - in a real app, you would integrate with Google OAuth
    try {
      setIsLoading(true);
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: "google-123456789",
        name: "Test User",
        email: "testuser@example.com",
        photoURL: "https://ui-avatars.com/api/?name=Test+User",
      };
      
      setUser(mockUser);
      localStorage.setItem("bicaraUser", JSON.stringify(mockUser));
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Simulate logout delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem("bicaraUser");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
