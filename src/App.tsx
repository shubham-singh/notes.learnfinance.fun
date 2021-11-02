import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Login from './auth/login';
import PrivateRoute from './auth/privateRoute';
import Signup from './auth/signup';
import DisplayNotes from './note/displayNotes';
import { useAuth } from './auth/auth.context';
import { useNote } from './note/note.context';
import { useSnackbar } from './snackbar/snackbar.context';
import { getNotes, pingServer } from './utils/server.requests';
import { setupAuthHeaderForServiceCalls } from './utils/function';
import Snackbar from './snackbar/snackbar';

function App() {

  const { user: {loggedIn} } = useAuth();
  const { notesDispatch } = useNote();
  const { snackbarDispatch } = useSnackbar();

  useEffect(() => {
    pingServer();
  }, [])

  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      getNotes({notesDispatch, snackbarDispatch})
    }
  }, [loggedIn, notesDispatch, snackbarDispatch])

  return (
    <div className="App">
      <Snackbar />
      <Routes>
        <PrivateRoute path="/" element={<DisplayNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
