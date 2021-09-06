import React, { createContext, useContext, useReducer } from "react";
import SnackbarReducer, { SnackbarAction } from "./snackbar.reducer";

export interface SnackbarState {
    visible: boolean;
    message: string;
}

interface SnackbarContextInterface {
    snackbar: SnackbarState;
    snackbarDispatch: React.Dispatch<SnackbarAction>
}

const SnackbarContext = createContext<SnackbarContextInterface | undefined>(undefined);

export const SnackbarContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [snackbar, dispatch] = useReducer(SnackbarReducer, {
    visible: false,
    message: ""
  });

  return (
    <SnackbarContext.Provider value={{ snackbar, snackbarDispatch: dispatch }}>
      {children}
    </SnackbarContext.Provider>
  );
};

// export const useSnackbar = () => useContext(SnackbarContext);
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarContextProvider");
  }
  return context;
}
  
