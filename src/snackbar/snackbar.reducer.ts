import { SnackbarState } from "./snackbar.context";

export type SnackbarAction = { type: "SHOW_SNACKBAR", payload: string } | { type: "DELETE_SNACKBAR" } 

const SnackbarReducer = (state: SnackbarState, action: SnackbarAction) => {
    switch (action.type) {
      case "SHOW_SNACKBAR":
        return {
          visible: true,
          message: action.payload
        };
      case "DELETE_SNACKBAR":
        return {
          visible: false,
          message: ""
        };
      default:
        return state;
    }
  };
  
  export default SnackbarReducer;
  