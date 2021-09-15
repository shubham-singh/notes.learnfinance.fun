import { AuthState } from "./auth.context";

export type AuthAction =
  | { type: "LOGIN"; payload: { firstName: string; token: string } }
  | { type: "LOGOUT" }
  | { type: "USER_INFO"; payload: { firstName: string } };

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        firstName: action.payload.firstName,
        token: localStorage.setItem(
          "auth_learnfinance",
          JSON.stringify(action.payload.token)
        ),
      };

    case "LOGOUT":
      return {
        ...state,
        firstName: "",
        loggedIn: false,
        token: localStorage.removeItem("auth_learnfinance"),
      };

    case "USER_INFO":
      return {
        ...state,
        firstName: action.payload.firstName,
      };

    default:
      return state;
  }
};

export default AuthReducer;
