import React, { createContext, useContext, useReducer } from "react";
import AuthReducer, { AuthAction } from "./auth.reducer";

export interface AuthState {
  token: string | void;
  firstName: string;
  loggedIn: boolean;
}

interface AuthContextInterface {
  user: AuthState;
  authDispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, dispatch] = useReducer(AuthReducer, {
    token: JSON.parse(localStorage.getItem("auth_learnfinance") as string),
    firstName: "",
    loggedIn: (function () {
      return localStorage.getItem("auth_learnfinance") ? true : false;
    })(),
  });

  return (
    <AuthContext.Provider value={{ user, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthContextProvider")
  }
  return context;
}
