import React, { useEffect } from 'react';
import './App.css';
import { useAuth } from './auth/auth.context';
import { useNote } from './note/note.context';
import { useSnackbar } from './snackbar/snackbar.context';
import { setupAuthHeaderForServiceCalls } from './utils/function';
import { getNotes } from './utils/server.requests';

function App() {

  const { user: {loggedIn} } = useAuth();
  const { notesDispatch } = useNote();
  const { snackbarDispatch } = useSnackbar();

  useEffect(() => {
    setupAuthHeaderForServiceCalls();
    if (loggedIn) {
      getNotes({notesDispatch, snackbarDispatch})
    }
  }, [loggedIn])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
