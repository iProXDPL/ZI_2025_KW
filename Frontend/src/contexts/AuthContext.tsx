import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log("Auth Provider");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";
  // Funkcja do zapisywania tokena
  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
  };

  // Funkcja do usuwania tokena
  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Rejestracja użytkownika
  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Błąd rejestracji");
      }

      const authData: AuthResponse = await response.json();
      saveToken(authData.token);
      setUser(authData.user);
      return true;
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logowanie użytkownika
  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Błąd logowania");
      }

      const authData: AuthResponse = await response.json();
      saveToken(authData.token);
      setUser(authData.user);
      return true;
    } catch (error) {
      console.error("Błąd logowania:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Wylogowanie użytkownika
  const logout = () => {
    removeToken();
  };

  // Sprawdzanie autentykacji użytkownika
  const checkAuth = async (): Promise<void> => {
    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Token jest nieprawidłowy - wyloguj użytkownika
        removeToken();
      }
    } catch (error) {
      console.error("Błąd weryfikacji autentykacji:", error);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  // Efekt do sprawdzenia autentykacji przy załadowaniu komponentu
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook do używania kontekstu
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
