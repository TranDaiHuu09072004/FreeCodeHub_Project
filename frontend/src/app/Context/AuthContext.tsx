"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  registeredCourses?: string[];
  date_or_birth?: string;
  id?: string;
  _id?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (justLoggedOut) {
      setLoading(false);
      return;
    }
    const localUser = localStorage.getItem("user");
    if (localUser && !justLoggedOut) {
      setUser(JSON.parse(localUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [justLoggedOut]);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setJustLoggedOut(false);
  };

  const logout = () => {
    // Xóa localStorage, context...
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Lưu lại role trước khi setUser(null)
    const role = user?.role;
    setUser(null);
    setJustLoggedOut(true);

    // Redirect dựa vào role
    if (role === "admin" || role === "author") {
      router.push("/admin/login");
    } else {
      router.push("/login"); // hoặc "/" nếu muốn về trang chủ
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
