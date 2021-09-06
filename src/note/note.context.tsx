import React, { createContext, useContext, useReducer } from "react";
import NoteReducer, { NoteAction } from "./note.reducer";

export interface Note {
  _id: string;
  title: string;
  body: string;
  label: string;
  color: string;
  pinned: boolean;
  updatedAt: string;
}

export interface NoteState {
  notes: Note[]
}

interface NoteContextInterface {
  notes: NoteState;
  notesDispatch: React.Dispatch<NoteAction>;
}

const NoteContext = createContext<NoteContextInterface | undefined>(undefined);

export const NoteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notes, dispatch] = useReducer(NoteReducer, {
    notes: []
  });

  return (
    <NoteContext.Provider value={{ notes, notesDispatch: dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNote must be used within NoteContextProvider");
  }
  return context;
};
