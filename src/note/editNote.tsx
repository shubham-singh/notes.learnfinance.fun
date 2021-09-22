import { useState } from "react";
import { useSnackbar } from "../snackbar/snackbar.context";
import { deepEqual } from "../utils/function";
import { createNote, deleteNote, updateNote } from "../utils/server.requests";
import { NoteModal } from "./displayNotes";
import { Note, useNote } from "./note.context";
import { ReactComponent as PinIcon } from "../assets/icons/pin.svg";
import { ReactComponent as PinFilledIcon } from "../assets/icons/pin-filled.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
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

  const deleteNoteHandle = () => {
    if (note?._id) {
      deleteNote({ noteID: note._id, notesDispatch, snackbarDispatch });
    }
    setNoteModal({
      note: noteform,
      status: false,
    });
  };

  const closeModal = () => {
    if (note !== undefined) {
      if (deepEqual(note, noteform)) {
      } else {
        updateNote({ note: noteform, notesDispatch, snackbarDispatch });
      }
    } else {
      if (noteform.title !== "")
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
      color: color,
    });
  };

  return (
    <div className="flex-row-center edit-note-container">
      <div
        className="flex-c relative edit-note"
        style={{ backgroundColor: `${noteform.color}` }}
      >
        <div className="flex-row-center justify-b p-m">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={noteform.title}
            onChange={handleInput}
            className="m-null  large note-title"
            autoFocus={note ? false : true}
            style={{ backgroundColor: `${noteform.color}` }}
          />
          <div>
            <span onClick={pinUnpinHandle} className="mr-m">
              {noteform.pinned ? (
                <PinFilledIcon className="pointer" />
              ) : (
                <PinIcon className="pointer" />
              )}
            </span>
            <span>{note && <DeleteIcon className="pointer" onClick={deleteNoteHandle} />}</span>
          </div>
        </div>
        <textarea
          placeholder="Note"
          name="body"
          value={noteform.body}
          onChange={handleInput}
          className="m-null p-m medium note-body"
          autoFocus={note ? true : false}
          style={{ backgroundColor: `${noteform.color}` }}
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
                  className={`ml-s mr-s note-color inline pointer ${
                    noteform.color === color ? "selected-color" : ""
                  }`}
                  onClick={() => selectColor(color)}
                ></div>
              );
            })}
          </div>
          <div className="m-null p-m small note-options">
            <span>
              Last edited {format(parseISO(noteform.updatedAt), "PPpp")}
            </span>
            <button className="btn-save p-xs pointer" onClick={closeModal}>
              Save and Close
            </button>
          </div>
        </div>
      </div>
      <div className="empty-modal" onClick={closeModal}></div>
    </div>
  );
};

export default EditNote;
