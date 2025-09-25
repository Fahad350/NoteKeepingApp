import { Children, createContext, useEffect, useState } from "react";
import BackendUrl from "../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const response = await BackendUrl.get("/all-notes");
      setNotes(response.data);
    } catch (error) {
      console.error("fetching error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const createNote = async (note) => {
    const res = await BackendUrl.post("/note-create", note);
    setNotes([res.data, ...notes]);
  };

  const updateNote = async (id, updateNote) => {
    const update = await BackendUrl.put(`/update-notes/${id}`, updateNote);
    setNotes(notes.map((note) => (note._id === id ? update.data : note)));
  };
  const deleteNote = async (id) => {
    await BackendUrl.delete(`/delete-notes/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  };
  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
