import { NoteState, Note } from "./note.context";

export type NoteAction =
  | { type: "SET_NOTE"; payload: Note[] }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string };

const NoteReducer = (state: NoteState, action: NoteAction) => {
  switch (action.type) {
    case "SET_NOTE":
      return { notes: action.payload };
    case "ADD_NOTE":
      return { notes: state.notes.concat(action.payload) };
    case "UPDATE_NOTE":
      return {
        notes: state.notes.map((note) => {
          if (note._id === action.payload._id) {
            return action.payload;
          }
          return note;
        }),
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

export default NoteReducer;
