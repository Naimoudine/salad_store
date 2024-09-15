import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface Auth {
  id: number;
  username: string;
}

type CurrentUserType = Auth | null;

interface AuthContextType {
  auth: CurrentUserType;
  setAuth: Dispatch<SetStateAction<CurrentUserType>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<CurrentUserType>(null); // initialize auth as null

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
