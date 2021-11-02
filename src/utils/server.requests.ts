import axios from "axios";
import React from "react";
import { AuthAction } from "../auth/auth.reducer";
import { LoginState } from "../auth/login";
import { SignupState } from "../auth/signup";
import { SnackbarAction } from "../snackbar/snackbar.reducer";
import { NoteAction } from "../note/note.reducer";
import { BASE, LOGIN, NOTE, SIGNUP } from "./api.routes";
import { deleteAuthToken } from "./function";
import { Note } from "../note/note.context";

export const pingServer = async() => {
  await axios.get(BASE);
}

export const login = async ({
  loginInfo,
  authDispatch,
  snackbarDispatch,
}: {
  loginInfo: LoginState;
  authDispatch: React.Dispatch<AuthAction>;
  snackbarDispatch: React.Dispatch<SnackbarAction>;
}) => {
  try {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: "Logging in",
    });
    const response = await axios.post(LOGIN, loginInfo);

    if (response.data.success) {
      authDispatch({
        type: "LOGIN",
        payload: {
          firstName: response.data.user.firstName,
          token: response.data.token,
        },
      });
    }
    if (response.status === 400) {
      throw new Error("Login Failed");
    }
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: "Successfully Logged In",
    });
  } catch (error: any) {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: error.response.data.error,
    });
  }
};

export const signup = async ({
  signupInfo,
  authDispatch,
  snackbarDispatch,
}: {
  signupInfo: SignupState;
  authDispatch: React.Dispatch<AuthAction>;
  snackbarDispatch: React.Dispatch<SnackbarAction>;
}) => {
  try {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: "Creating your account",
    });
    const response = await axios.post(SIGNUP, signupInfo);
    if (response.data.success) {
      authDispatch({
        type: "LOGIN",
        payload: {
          firstName: response.data.user.firstName,
          token: response.data.token,
        },
      });
    }
    if (response.status === 400) {
      throw new Error("Signup Failed");
    }
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: "Successfully Signed Up",
    });
  } catch (error: any) {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: error.response.data.error
    });
  }
};


export const getNotes = async ({notesDispatch, snackbarDispatch} : {notesDispatch: React.Dispatch<NoteAction>, snackbarDispatch: React.Dispatch<SnackbarAction>}) => {
    try {
        const response = await axios.get(NOTE);
        if (response.data.success) {
            notesDispatch({
                type: "SET_NOTE",
                payload: response.data.notes
            })
        } else {
            throw new Error("Problem in getting your notes :(");
        }
    } catch (error: any) {
        if (error.response.data.error === "jwt expired") {
            snackbarDispatch({
                type: "SHOW_SNACKBAR",
                payload: "Please Login again"
            })
            deleteAuthToken();
            return;
          }
          snackbarDispatch({
              type: "SHOW_SNACKBAR",
              payload: error.response.data.error
          })
        
    }
}

export const createNote = async ({note, notesDispatch, snackbarDispatch} : {note: Note, notesDispatch: React.Dispatch<NoteAction>, snackbarDispatch: React.Dispatch<SnackbarAction>}) => {
  try {
    const response = await axios.post(NOTE, note);
    if (response.data.success) {
      notesDispatch({
        type: "ADD_NOTE",
        payload: response.data.note
      })
      snackbarDispatch({
        type: "SHOW_SNACKBAR",
        payload: "Added note",
      });
    }
  } catch (error: any) {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: error.response.data.error
    })
  }
}

export const updateNote = async ({note, notesDispatch, snackbarDispatch} : {note: Note, notesDispatch: React.Dispatch<NoteAction>, snackbarDispatch: React.Dispatch<SnackbarAction>}) => {
  try {
    const response= await axios.put(`${NOTE}/${note._id}`, note);
    if (response.data.success) {
      notesDispatch({
        type: "UPDATE_NOTE",
        payload: response.data.note
      })
      snackbarDispatch({
        type: "SHOW_SNACKBAR",
        payload: "Note updated",
      });
    }
  } catch (error: any) {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: error.response.data.error
    })
  }
}

export const deleteNote = async ({noteID, notesDispatch, snackbarDispatch} : {noteID: string, notesDispatch: React.Dispatch<NoteAction>, snackbarDispatch: React.Dispatch<SnackbarAction>}) => {
  try {
    const response = await axios.delete(`${NOTE}/${noteID}`);
    if (response.data.success) {
      notesDispatch({
        type: "DELETE_NOTE",
        payload: noteID
      });
      snackbarDispatch({
        type: "SHOW_SNACKBAR",
        payload: "Deleted note",
      });
    }
  } catch (error: any) {
    snackbarDispatch({
      type: "SHOW_SNACKBAR",
      payload: "Couldn't delete note"
    })
  }
}