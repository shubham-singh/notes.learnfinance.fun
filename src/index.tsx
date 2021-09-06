import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarContextProvider } from "./snackbar/snackbar.context";
import { AuthContextProvider } from "./auth/auth.context";
import { NoteContextProvider } from "./note/note.context";
import ScrollToTop from "./utils/scrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SnackbarContextProvider>
        <NoteContextProvider>
          <Router>
            <ScrollToTop />
            <App />
          </Router>
        </NoteContextProvider>
      </SnackbarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
