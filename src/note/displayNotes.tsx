import { useState } from "react";
import { useAuth } from "../auth/auth.context";
import EditNote from "./editNote";
import NotePreview from "./note";
import { Note, useNote } from "./note.context";

export interface NoteModal {
  status: boolean;
  note: Note | undefined;
}

const DisplayNotes = () => {
  const { notes } = useNote();
  const { authDispatch } = useAuth();
  const [noteModal, setNoteModal] = useState<NoteModal>({} as NoteModal);

  const clickHandle = (note: Note) => {
    setNoteModal({
      status: true,
      note: note,
    });
  };

  const logoutHandle = () => {
    authDispatch({
      type: "LOGOUT"
    })
  }

  const pinnedNotes = () => {
    return (
      <>
        <h3 className="m-m">Pinned</h3>
        <div className="notes-container">
          {notes
            .filter((note) => note.pinned === true)
            .map((note) => {
              return (
                <div
                  key={note._id}
                  onClick={() => clickHandle(note)}
                  className="flex-c note-preview pointer p-m m-m"
                  style={{backgroundColor: `${note.color}`}}
                  >
                  <NotePreview note={note} />
                </div>
              );
            })}
        </div>
      </>
    );
  };
  
  const unPinnedNotes = () => {
    return (
      <>
        <h3 className="m-m">Others</h3>
        <div className="notes-container">
          {notes
            .filter((note) => note.pinned === false)
            .map((note) => {
              return (
                <div
                  key={note._id}
                  className="flex-c note-preview pointer p-m m-m"
                  onClick={() => clickHandle(note)}
                  style={{backgroundColor: `${note.color}`}}
                >
                  <NotePreview note={note} />
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex-row-center wrap-reverse justify-a">
        <div className="hide-t">

        </div>
        <h1 className="heading m-m">Learn Finance Notes</h1>
        <button className="btn-logout block pointer medium" onClick={logoutHandle}>Logout</button>
      </div>
      {noteModal.status && noteModal.note === undefined ? (
        <EditNote note={undefined} setNoteModal={setNoteModal} />
      ) : (
        <input
          className="m-m p-m add-note"
          onClick={() => setNoteModal({ note: undefined, status: true })}
          placeholder="Add new note"
        />
      )}
      {noteModal.status && noteModal.note !== undefined && (
        <EditNote note={noteModal.note} setNoteModal={setNoteModal} />
      )}

      {pinnedNotes()}
      {unPinnedNotes()}
    </div>
  );
};

export default DisplayNotes;
