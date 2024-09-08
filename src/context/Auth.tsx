import React, { createContext, useState, useEffect, useContext } from "react";
import { removeValue, storeData } from "../utils/storage";

interface AuthContextType {
  user: string | null;
  loading: boolean;
  onboardingCompleted: boolean;
  login: (user: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const storedUser = null;
        const onboardingStatus = null;

        if (storedUser) {
          setUser(storedUser);
        }

        if (onboardingStatus === "completed") {
          setOnboardingCompleted(true);
        }
      } catch (e) {
        console.error("Error loading auth state:", e);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (username: string) => {
    setUser(username);
    await storeData("user", username);
  };

  const logout = async () => {
    setUser(null);
    await removeValue("user");
  };

  const completeOnboarding = async () => {
    console.log("hello");
    setOnboardingCompleted(true);
    await storeData("onboarding", "completed");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        onboardingCompleted,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
