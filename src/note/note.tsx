import { Note } from "./note.context";

const NotePreview = ({ note }: { note: Note }) => {
  return (
    <>
      <h3>{note.title}</h3>
      <p
        style={{
          whiteSpace: "pre-line",
        }}
      >
        {note.body}
      </p>
    </>
  );
};

export default NotePreview;
