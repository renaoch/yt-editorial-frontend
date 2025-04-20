import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

const NoteSection = ({ notes, newNote, setNewNote, handleAddNote, isAddNoteOpen, setIsAddNoteOpen }) => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold">Notes:</h4>
      <div className="space-y-2">
        {notes?.map((note, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium">{note.role}</span>
              <span className="text-xs text-gray-400">
                {new Date(note.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{note.text}</p>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => setIsAddNoteOpen(!isAddNoteOpen)}
        className="mt-4"
      >
        {isAddNoteOpen ? "Hide Add Note" : "Add Note"}
      </Button>

      {isAddNoteOpen && (
        <div>
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
            className="mt-4"
            placeholder="Add a note..."
          />
          <Button onClick={handleAddNote} className="mt-2">
            Add Note
          </Button>
        </div>
      )}
    </div>
  );
};

export default NoteSection;
