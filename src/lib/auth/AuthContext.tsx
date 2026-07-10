import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getPocketBase } from "../../api/client";
import type { User } from "../../api/types";

interface AuthCtx {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: "admin" | "staff" | "viewer") => boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pb = getPocketBase();
    if (pb.authStore.isValid) {
      const authUser = pb.authStore.record as unknown as User;
      setUser(authUser);
    }
    setIsLoading(false);

    const unsub = pb.authStore.onChange(() => {
      if (pb.authStore.isValid) {
        setUser(pb.authStore.record as unknown as User);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const pb = getPocketBase();
    const authData = await pb.collection("app_users").authWithPassword(email, password);
    setUser(authData.record as unknown as User);
  }, []);

  const logout = useCallback(() => {
    const pb = getPocketBase();
    pb.authStore.clear();
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: "admin" | "staff" | "viewer") => {
      if (!user) return false;
      if (user.role === "admin") return true;
      if (user.role === "staff" && role !== "admin") return true;
      if (user.role === "viewer" && role === "viewer") return true;
      return false;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
