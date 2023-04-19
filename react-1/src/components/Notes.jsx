import notes from "../notes"
import Note from "./Note"

function Notes() {
    return (
    <>
        {notes.map(note => (
            <Note
            key = {note.id}
            title = {note.title}
            content = {note.content}
            />
        ))}
    </>
    )
}
export default Notes