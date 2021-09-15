import { useState } from "react";
import { useSnackbar } from "../snackbar/snackbar.context";
import { deepEqual } from "../utils/function";
import { createNote, updateNote } from "../utils/server.requests";
import { NoteModal } from "./displayNotes";
import { Note, useNote } from "./note.context";
import { ReactComponent as PinIcon } from "../assets/icons/pin.svg";
import { ReactComponent as PinFilledIcon } from "../assets/icons/pin-filled.svg";
import { format, formatISO, parseISO } from "date-fns";

const EditNote = ({
  note,
  setNoteModal,
}: {
  note: Note | undefined;
  setNoteModal: React.Dispatch<React.SetStateAction<NoteModal>>;
}) => {
  const [noteform, setNote] = useState<Note>(
    note
      ? note
      : {
          title: "",
          body: "",
          label: "",
          color: "#FFFFFF",
          pinned: false,
          updatedAt: formatISO(new Date()),
        }
  );
  const { notesDispatch } = useNote();
  const { snackbarDispatch } = useSnackbar();

  const handleInput = (e: any) => {
    setNote({
      ...noteform,
      [e.target.name]: e.target.value,
    });
  };

  const pinUnpinHandle = () => {
    setNote({
      ...noteform,
      pinned: !noteform.pinned,
    });
  };

  const closeModal = () => {
    if (note !== undefined) {
      if (deepEqual(note, noteform)) {
      } else {
        updateNote({ note: noteform, notesDispatch, snackbarDispatch });
      }
    } else {
      createNote({ note: noteform, notesDispatch, snackbarDispatch });
    }
    setNoteModal({
      note: noteform,
      status: false,
    });
  };

  const selectColor = (color: string) => {
    setNote({
      ...noteform,
      color: color
    });
  }

  return (
    <div className="flex-row-center h-full-vp w-full-vp edit-note-container">
      <div
        className="flex-c relative edit-note"
        style={{ backgroundColor: `${noteform.color}`, borderRadius: "1rem" }}
      >
        <span onClick={pinUnpinHandle} className="note-pin">
          {noteform.pinned ? (
            <PinFilledIcon className="pointer" />
          ) : (
            <PinIcon className="pointer" />
          )}
        </span>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={noteform.title}
          onChange={handleInput}
          className="m-null p-m large note-title"
          autoFocus={note ? false : true}
          style={{backgroundColor: `${noteform.color}`}}
          />
        <textarea
          placeholder="Note"
          name="body"
          value={noteform.body}
          onChange={handleInput}
          className="m-null p-m medium note-body"
          autoFocus={note ? true : false}
          style={{backgroundColor: `${noteform.color}`}}
          />
        <div className="m-null p-m flex-c">
          <div>
            {[
              "#D1D5DB",
              "#FCA5A5",
              "#FCD34D",
              "#6EE7B7",
              "#93C5FD",
              "#C4B5FD",
            ].map((color) => {
              return (
                <div
                  key={color}
                  style={{ backgroundColor: `${color}` }}
                  className={`ml-s mr-s note-color inline pointer ${noteform.color === color ? "selected-color" : ""}`}
                  onClick={() => selectColor(color)}
                ></div>
              );
            })}
          </div>
          <div className="m-null p-m small note-options">
            <span>
              Last edited {format(parseISO(noteform.updatedAt), "PPpp")}
            </span>
            <button className="btn-save pointer" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="empty-modal" onClick={closeModal}></div>
    </div>
  );
};

export default EditNote;
