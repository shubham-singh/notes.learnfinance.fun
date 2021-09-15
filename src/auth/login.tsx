import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth.context";
import { useSnackbar } from "../snackbar/snackbar.context";
import { login } from "../utils/server.requests";

export interface LoginState {
  email: string;
  password: string;
}

interface State {
  from: string
}

const Login = () => {
  const { user: { loggedIn }, authDispatch } = useAuth();
  const { state } = useLocation() as { state: State };
  const navigate = useNavigate();
  const { snackbarDispatch } = useSnackbar();
  const [loginInfo, setLoginInfo] = useState<LoginState>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: any) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    login({loginInfo ,authDispatch,snackbarDispatch});
  };
  
  const handleGuestLogin = () => {
    const loginInfo: LoginState = {
      email: "shubham@gmail.com",
      password: "Bitcoin"
    }
    login({loginInfo ,authDispatch,snackbarDispatch});
    setLoginInfo({
      email: "shubham@gmail.com",
      password: "Bitcoin"
    })
  };

  useEffect(() => {
    if (loggedIn) {
      if (state !== null) {
        navigate(state.from);
      } else {
        navigate("/");
      }
    }
  });

  return (
    <div className="flex-column-center form-container">
      <form className="flex-c form-credentials shadow" onSubmit={handleLogin}>
        <h1
          className="heading m-null p-s pointer"
          onClick={() => navigate("/")}
        >
          Learn Finance
        </h1>
        <input
          className="m-xs p-s"
          type="email"
          placeholder="Email"
          name="email"
          value={loginInfo.email}
          onChange={onChangeHandler}
          required
        />
        <input
          className="m-xs p-s"
          type="password"
          placeholder="Password"
          name="password"
          value={loginInfo.password}
          onChange={onChangeHandler}
          required
        />
        <button className="btn btn-classic shadow mt-l" type="submit">
          Login
        </button>
        <button
          className="btn btn-classic glow mt-l"
          onClick={handleGuestLogin}
        >
          Login with Guest account
        </button>
      </form>
      <p className="mt-xl pointer" onClick={() => navigate("/signup")}>
        Don't have an account? Signup now!
      </p>
    </div>
  );
};

export default Login;
