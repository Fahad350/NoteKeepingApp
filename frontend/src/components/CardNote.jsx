import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function CardNote({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);

  const [isEdited, setIsEdited] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  // Format date (you can customize this)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle input changes for editing
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Save the updated note
  const handleUpdate = () => {
    updateNote(note._id, editData); // context function
    setIsEdited(false);
  };

  return (
    <div className="bg-black shadow-md rounded-2xl p-5 border border-gray-700">
      {isEdited ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="content"
            value={editData.content}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEdited(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">{note.title}</h2>
          <p className="text-white mb-4">{note.content}</p>

          {/* Show created/updated time */}
          <div className="text-gray-400 text-sm mb-4">
            <p>Created: {formatDate(note.createdAt)}</p>
            <p>Updated: {formatDate(note.updatedAt)}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEdited(true)}
              className="px-11 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note._id)}
              className="px-10 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNote;
